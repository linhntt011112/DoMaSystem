from os import name
import traceback
from loguru import logger
from fastapi import Depends, FastAPI, APIRouter, HTTPException, status, Query
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from jose import JWTError, jwt
import datetime
import typing as t

from typing import Optional, Union
from pydantic import BaseModel
from database.db_models.static_tables import PhanQuyen

from database import db_models, common_queries
from database.db import get_db
from database.crud import static_tables as crud_static_tables
from database.schemas import static_tables as schema_static_tables

from .utils import Hasher
from exceptions import api_exceptions
from .config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
from .core import (
    user as user_core,
    caching
)

get_current_active_user = user_core.get_current_active_user



router = APIRouter(prefix="/static_table")

name_to_db_model = {
    'phong_ban': db_models.PhongBan,
    'chuc_vu': db_models.ChucVu,
    'hoc_van': db_models.HocVan,
    'dan_toc': db_models.DanToc,
    'quoc_tich': db_models.QuocTich,
    'ton_giao': db_models.TonGiao,
    'tinh_trang_xu_ly': db_models.TinhTrangXuLy,
    # 'muc_do_bao_mat': db_models.MucDoBaoMat,
    'muc_do_uu_tien': db_models.MucDoUuTien
}

id_name_to_db_model = {'id_' + k: name_to_db_model[k] for k in name_to_db_model}

name_to_schema = {
    'phong_ban': schema_static_tables.PhongBanFull,
    'chuc_vu': schema_static_tables.ChucVuFull,
    'hoc_van': schema_static_tables.HocVanFull,
    'dan_toc': schema_static_tables.DanTocFull,
    'quoc_tich': schema_static_tables.QuocTichFull,
    'ton_giao': schema_static_tables.TonGiaoFull,
    'tinh_trang_xu_ly': schema_static_tables.TinhTrangXuLyFull,
    # 'muc_do_bao_mat': schema_static_tables.MucDoBaoMatFull,
    'muc_do_uu_tien': schema_static_tables.MucDoUuTienFull
}


# def authorize_user_for_static_table(user: db_models.NguoiDung, static_table: db_models.StaticTable):
#     if user.id == static_table.id:
#         return True
#     else:
#         return False


def check_static_table_name(static_table_name):
    if static_table_name not in name_to_db_model:
        raise api_exceptions.NOT_FOUND_EXCEPTION(f'Can not find static_table with name "{static_table_name}"')


def _get_static_table_by_id(db, static_table_id, class_) :
    static_table: db_models.StaticTable = crud_static_tables.get_static_table_by_id(db, static_table_id, class_)
    if static_table is None:
        raise api_exceptions.NOT_FOUND_EXCEPTION(f"Can not find {class_.__name__} with id={static_table_id}")
    
    return static_table



@router.get("/{static_table_name}/")
@caching.cache(namespace='static_table', key_builder=caching.static_tables_key_builder)
async def get_list(
    static_table_name: str,
    current_user: db_models.NguoiDung = Depends(get_current_active_user), 
    db=Depends(get_db)):  

    
    try:
        check_static_table_name(static_table_name)
        data = crud_static_tables.get_list(db, name_to_db_model[static_table_name])
        schema = name_to_schema[static_table_name]
        return [schema.from_orm(item) for item in data]
    except Exception as e:
        return api_exceptions.handle_simple_exception(e, logger)
    
    

@router.get("/{static_table_name}/reset_cache")
async def reset_cache(
    static_table_name: str,
    current_user: db_models.NguoiDung = Depends(get_current_active_user)
    ):  
    
    check_static_table_name(static_table_name)
    res = await caching.reset_cache(f'static_table:{static_table_name}:*')
    return res


@router.post("/{static_table_name}/")
async def create(
    static_table_name: str,
    static_table_create_pydantic: schema_static_tables.StaticTableCreate,
    current_user: db_models.NguoiDung = Depends(get_current_active_user), 
    db=Depends(get_db)):  

    
    try:
        check_static_table_name(static_table_name)
        obj = name_to_db_model[static_table_name](name=static_table_create_pydantic.name)
        obj = crud_static_tables.insert(db, obj)
        return name_to_schema[static_table_name].from_orm(obj)
    except Exception as e:
        return api_exceptions.handle_simple_exception(e, logger)
        


@router.put("/{static_table_name}/")
async def update(
    static_table_name: str,
    static_table_update_pydantic: schema_static_tables.StaticTableUpdate,
    current_user: db_models.NguoiDung = Depends(get_current_active_user), 
    db=Depends(get_db)):  

    
    try:
        check_static_table_name(static_table_name)
        obj = _get_static_table_by_id(db, static_table_update_pydantic.id, name_to_db_model[static_table_name])
        obj = crud_static_tables.update(db, obj, static_table_update_pydantic)
        return name_to_schema[static_table_name].from_orm(obj)
    except Exception as e:
        return api_exceptions.handle_simple_exception(e, logger)
    
    
    
@router.delete("/{static_table_name}/{obj_id}")
async def delete(
    static_table_name: str,
    obj_id: int,
    # static_table_delete_pydantic: schema_static_tables.StaticTableDelete,
    current_user: db_models.NguoiDung = Depends(get_current_active_user), 
    db=Depends(get_db)):  

    
    
    try:
        check_static_table_name(static_table_name)
        obj = _get_static_table_by_id(db, obj_id, name_to_db_model[static_table_name])
        return crud_static_tables.delete(db, obj)
    except Exception as e:
        return api_exceptions.handle_simple_exception(e, logger)



        