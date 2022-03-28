# https://stackoverflow.com/questions/4113934/how-is-oauth-2-different-from-oauth-1
from datetime import datetime, timedelta
from tokenize import Token
from typing import Optional
from loguru import logger

from fastapi import Depends, FastAPI, APIRouter, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt

from database.db import get_db

from .config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
# from .user import authenticate_user, Token, TokenData
from .core.user import (
    authenticate_user, Token, TokenData
)


router = APIRouter(
    # prefix="/api"
    )


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=60)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db=Depends(get_db)):
    user = authenticate_user(db, email=form_data.username, password=form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username, "permissions": user.role.role_name}, 
        expires_delta=access_token_expires
    )
    logger.info(f'email: {user.username} ; token: {access_token}')
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/delete_token")
async def logout():
    # access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    # access_token = create_access_token(
    #     data={"sub": user.username}, expires_delta=access_token_expires
    # )
    access_token = ""
    return {"access_token": access_token, "token_type": "bearer"}
