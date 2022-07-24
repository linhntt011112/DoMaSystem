from loguru import logger
from fastapi import Depends, FastAPI, APIRouter, HTTPException, status, Query
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from jose import JWTError, jwt
import datetime
import random
import hashlib
import typing as t
import random

from typing import Optional, Union
from pydantic import BaseModel

from database import db_models, common_queries
from database.db import get_db
from database.crud import user as crud_user, static_tables as crud_static_tables
from database.schemas import nguoi_dung as user_schemas
from database import db_models

from ..utils import Hasher
from ..config import SECRET_KEY, ALGORITHM, DOWNLOAD_TOKEN_EXPIRE_MINUTES, SECRET_DOWNLOAD_KEY
from . import caching
from exceptions import api_exceptions


name_to_db_model = {
    'phong_ban': db_models.PhongBan,
    'chuc_vu': db_models.ChucVu,
    'hoc_van': db_models.HocVan,
    'dan_toc': db_models.DanToc,
    'quoc_tich': db_models.QuocTich,
    'ton_giao': db_models.TonGiao
}

id_name_to_db_model = {'id_' + k: name_to_db_model[k] for k in name_to_db_model}


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



# def authorize_user_by_phan_quyen(db, user: db_models.NguoiDung, role_name: str):
#     # logger.debug(role.id)
#     # logger.debug(user.as_dict())
#     if user.phan_quyen == role_name:
#         return True
#     else:
#         return False


@caching.cache(namespace='user', key_builder=caching.user_token_key_builder, expire=600)
async def decode_token(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        # logger.debug(token)
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        exp: int = int(payload.get("exp"))
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
        return token_data.username
    except JWTError:
        raise credentials_exception


async def get_current_user(username=Depends(decode_token), db=Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    user = crud_user.get_user(db, ten_tai_khoan=username)
    if user is None:
        raise credentials_exception
    # logger.debug(user)
    return user


async def get_current_active_user(current_user = Depends(get_current_user)) -> db_models.NguoiDung:
    return current_user


async def logout(token: str = Depends(oauth2_scheme)):
    res = await caching.reset_cache(f'user:{token}:*')
    return res



def verify_static_attr(class_, attr_):
    if not class_.verify(attr_):
        raise api_exceptions.NOT_FOUND_EXCEPTION(f"{attr_} is not a valid {class_.__name__}")
    
    return True



def create_user(db, user_schema_model: user_schemas.UserCreate, create_password=True):
    random_number = random.randint(0, 10000)
    password_salt = hashlib.md5((user_schema_model.ten_tai_khoan + str(datetime.datetime.now()) + str(random_number)).encode()).hexdigest()
    
    if create_password:
        plain_password = password_salt[:8]
    else:
        plain_password = user_schema_model.password
    
    password = Hasher.get_password_hash(Hasher.salt_password(plain_password, password_salt))

    
    now = datetime.datetime.now()
    
    for id_name in id_name_to_db_model:
        id = getattr(user_schema_model, id_name)
        if id is not None and not crud_static_tables.get_static_table_by_id(db, id, id_name_to_db_model[id_name]):
            raise api_exceptions.NOT_FOUND_EXCEPTION(f"Can not find object with {id_name} = {id} !")
    
    verify_static_attr(db_models.PhanQuyen, user_schema_model.phan_quyen)
    if user_schema_model.gioi_tinh is not None:
        verify_static_attr(db_models.GioiTinh, user_schema_model.gioi_tinh)
    
        
    new_user = db_models.NguoiDung(
        ho_ten=user_schema_model.ho_ten,
        ten_tai_khoan=user_schema_model.ten_tai_khoan,
        password=password,
        password_salt=password_salt,
        ngay_sinh=user_schema_model.ngay_sinh,
        dia_chi=user_schema_model.dia_chi,
        ngay_cap_nhat=now,
        ngay_vao_lam=user_schema_model.ngay_vao_lam,
        dien_thoai=user_schema_model.dien_thoai,
        email=user_schema_model.email,

        phan_quyen=user_schema_model.phan_quyen,
        gioi_tinh=user_schema_model.gioi_tinh,

        cccd=user_schema_model.cccd,
        ngay_cap=user_schema_model.ngay_cap,
        noi_cap=user_schema_model.noi_cap,
        que_quan=user_schema_model.que_quan,

        tk_ngan_hang=user_schema_model.tk_ngan_hang,
        ngan_hang=user_schema_model.ngan_hang,

        id_phong_ban=user_schema_model.id_phong_ban,
        id_chuc_vu=user_schema_model.id_chuc_vu,
        id_hoc_van=user_schema_model.id_hoc_van,
        id_dan_toc=user_schema_model.id_dan_toc,
        id_quoc_tich=user_schema_model.id_quoc_tich,
        id_ton_giao=user_schema_model.id_ton_giao,
    )
    
    new_user = crud_user.create_user(db, new_user)
    if create_password:
        return new_user, plain_password
    else:
        return new_user
    
    
def update_password(db, user: db_models.NguoiDung, user_update_password: user_schemas.UserUpdatePassword):
    
    password_salt = user.password_salt
    current_plain_password = user_update_password.current_plain_password
    new_plain_password = user_update_password.new_plain_password
    
    if not verify_password(current_plain_password, password_salt, user.password):
        raise api_exceptions.PERMISSION_EXCEPTION("Wrong password!")
    
    new_password = Hasher.get_password_hash(Hasher.salt_password(new_plain_password, password_salt))
    
    # if new_password == user.password:
    #     raise exceptions.UNPROCESSABLE_ENTITY("")
    user.password = new_password
    
    return crud_user.update_user(db, user)



def update_user_self(db, user: db_models.NguoiDung, user_schema_model: user_schemas.UserSelfUpdateInfo):
    now = datetime.datetime.now()
    
    for id_name in id_name_to_db_model:
        if id_name in user_schema_model.__dict__:
            id = getattr(user_schema_model, id_name)
            if id is not None and not crud_static_tables.get_static_table_by_id(db, id, id_name_to_db_model[id_name]):
                raise api_exceptions.NOT_FOUND_EXCEPTION(f"Can not find object with {id_name} = {id} !")
    
    data_dict = user_schema_model.__dict__
    data_dict["ngay_cap_nhat"] = now
    data_dict = {k: data_dict[k] for k in data_dict if data_dict[k] is not None}
    # logger.info(f"{data_dict}")
    for attr in data_dict:
        setattr(user, attr, data_dict[attr])
    
    return crud_user.update_user(db, user)



async def request_download_token(current_user=Depends(get_current_active_user)):
    to_encode = {"sub": current_user.ten_tai_khoan}
    expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=DOWNLOAD_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_DOWNLOAD_KEY, algorithm=ALGORITHM)
    return encoded_jwt



async def get_user_of_download_token(download_token: str, db=Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials!",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        # logger.debug(token)
        payload = jwt.decode(download_token, SECRET_DOWNLOAD_KEY, algorithms=[ALGORITHM])
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

    