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
from .import exceptions
from .config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
from .core import user as user_core

get_current_active_user = user_core.get_current_active_user



router = APIRouter()

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
    

def _get_static_table_by_id(db, static_table_id, class_) :
    static_table: db_models.StaticTable = crud_static_tables.get_static_table_by_id(db, static_table_id, class_)
    if static_table is None:
        raise exceptions.NOT_FOUND_EXCEPTION(f"Can not find {class_.__name__} with id={static_table_id}")
    
    return static_table



@router.get("/{static_table_name}/list")
async def get_list(
    static_table_name: str,
    current_user:db_models.NguoiDung = Depends(get_current_active_user), 
    db=Depends(get_db)):    
    
    if static_table_name not in name_to_db_model:
        raise exceptions.NOT_FOUND_EXCEPTION(f'Can not find static_table with name "{static_table_name}"')
    else:
        data = crud_static_tables.get_list(db, name_to_db_model[static_table_name])
        schema = name_to_schema[static_table_name]
        return [schema.from_orm(item) for item in data]
        