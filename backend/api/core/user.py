from loguru import logger
from fastapi import Depends, FastAPI, APIRouter, HTTPException, status, Query
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from jose import JWTError, jwt
import datetime
import random
import hashlib
import typing as t

from typing import Optional, Union
from pydantic import BaseModel

from database import db_models, common_queries
from database.db import get_db
from database.crud import user as crud_user 
from database.schemas import nguoi_dung as user_schemas

from ..utils import Hasher
from ..config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES


oauth2_scheme = OAuth2PasswordBearer(
  tokenUrl="api/v1/token"  # for debug
  )

# def get_all_user_roles(db):
#     all_user_roles = common_queries.query_all(db, db_models.UserRole)
#     all_user_roles = {user_role.role_name: user_role for user_role in all_user_roles}



class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Optional[str] = None
    username: Optional[str] = None



def verify_password(plain_password, salt, hashed_password):
    return Hasher.verify_password(Hasher.salt_password(plain_password, salt), hashed_password)



def authenticate_user(db, username: str=None, password: str=None):
    user: db_models.User = crud_user.get_user(db, username)
    if not user:
        return None
    if not verify_password(password, user.password_salt, user.password):
        return None
    return user



def authorize_user_by_role_name(db, user: db_models.NguoiDung, role_name: str):
    # logger.debug(role.id)
    # logger.debug(user.as_dict())
    if user.phan_quyen == role_name:
        return True
    else:
        return False


async def get_current_user(token: str = Depends(oauth2_scheme), db=Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        # logger.debug(token)
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = crud_user.get_user(db, ten_tai_khoan=token_data.username)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(current_user = Depends(get_current_user)):
    return current_user



# async def create_user(db, user: user_schemas.UserRegister, user_role: user_schemas.UserRole=None):
#     password_salt = hashlib.md5((user.email + str(datetime.datetime.now())).encode()).hexdigest()
#     password = Hasher.get_password_hash(Hasher.salt_password(user.password, password_salt))

#     if user_role is None:
#         user_role = user_schemas.UserRole(role_name='user')
    
#     now = datetime.datetime.now()
#     new_user = user_schemas.UserCreate(
#         email=user.email,
#         username=user.username,
#         password_salt=password_salt,
#         password=password,
#         full_name=user.full_name,
#         create_at=now,
#         update_at=now,
#         is_active=False,
#         role=user_role,
#     )
    
#     return crud_user.create_user(db, new_user)