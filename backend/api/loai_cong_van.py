from fastapi import Depends, FastAPI, APIRouter, File, UploadFile, Form
from pydantic import BaseModel
from jose import JWTError, jwt
from loguru import logger

from database import db_models
from database.common_queries import query_all, query_filter
from database.db import get_db
from database.crud import cong_van as crud_cong_van
from database.schemas import cong_van as cong_van_schemas


from exceptions import api_exceptions
from config import server_config
from .user import get_current_active_user
from .core import file_utils


router = APIRouter(prefix='/cong-van')
@router.get("/loai-cong-van")
async def get_list_loai_cong_van(limit: int=None, offset: int=None,
                        order_by=None,
    current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)):

    try:
        cac_loai_cong_van = crud_cong_van.select_list_loai_cong_van(db, limit=limit, offset=offset)
        return [cong_van_schemas.LoaiCongVanFull.from_orm(loai_cong_van) for loai_cong_van in cac_loai_cong_van]
    except Exception as e:

        return api_exceptions.handle_simple_exception(e, logger)


@router.post("/loai-cong-van")
async def create_loai_cong_van(loai_cong_van: cong_van_schemas.LoaiCongVanCreate,
    current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)):
    if current_user.phan_quyen != db_models.PhanQuyen.admin:
        raise api_exceptions.PERMISSION_EXCEPTION()
    
    try:
        loai_cong_van.id_nguoi_cap_nhat = current_user.id
        new_loai_cong_van = crud_cong_van.create_loai_cong_van(db, loai_cong_van)
        return cong_van_schemas.LoaiCongVanFull.from_orm(new_loai_cong_van)
    except Exception as e:

        return api_exceptions.handle_simple_exception(e, logger)
    
    

@router.put("/loai-cong-van/{id}")
async def get_list_users(id: int, loai_cong_van_pydantic: cong_van_schemas.LoaiCongVanUpdate,
    current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)):
    if current_user.phan_quyen != db_models.PhanQuyen.admin:
        raise api_exceptions.PERMISSION_EXCEPTION()

    
    try:
        loai_cong_van = crud_cong_van.get_loai_cong_van_by_id(db, id)
        if loai_cong_van is None:
            raise api_exceptions.NOT_FOUND_EXCEPTION()
        
        loai_cong_van.id_nguoi_cap_nhat = current_user.id
        loai_cong_van = crud_cong_van.update_loai_cong_van(db, loai_cong_van, loai_cong_van_pydantic)
        
        return cong_van_schemas.LoaiCongVanFull.from_orm(loai_cong_van)
    except Exception as e:

        return api_exceptions.handle_simple_exception(e, logger)



@router.delete("/loai-cong-van/{id}")
async def delete_loai_cong_van(id: int,
    current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)):
    if current_user.phan_quyen != db_models.PhanQuyen.admin:
        raise api_exceptions.PERMISSION_EXCEPTION()
    
    try:
        is_success =  crud_cong_van.delete_loai_cong_van_by_id(db, id)
        if is_success:
            return True
        else:
            raise api_exceptions.INTERNAL_SERVER_ERROR(f"Can not delete loai_cong_van with id={id}")
        
    except Exception as e:

        return api_exceptions.handle_simple_exception(e, logger)