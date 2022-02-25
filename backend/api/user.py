from fastapi import Depends, FastAPI, APIRouter, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from jose import JWTError, jwt

from database.models import *
from database.common_queries import query_all, query_filter
from database.utils import Hasher

from .models import Token, TokenData
from .config import SECRET_KEY, ALGORITHM


router = APIRouter(prefix="/api")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_user_by_username(username):
    user = query_filter(NguoiDung, NguoiDung.ten_tai_khoan == username)
    if len(user) == 1:
        return user[0]
    else:
        return None


def verify_password(plain_password, hashed_password):
    return Hasher.verify_password(plain_password, hashed_password)


def get_password_hash(password):
    return Hasher.get_password_hash(password)


def get_user(username: str):
    return get_user_by_username(username)


def authenticate_user(username: str, password: str):
    user: NguoiDung = get_user(username)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user
    

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


@router.get("/users/me")
async def read_users_me(current_user = Depends(get_current_user)):
    return current_user.as_dict()


@router.get("/users/me/items")
async def read_own_items(current_user = Depends(get_current_user)):
    return [{"item_id": "Foo", "owner": current_user.as_dict()}]