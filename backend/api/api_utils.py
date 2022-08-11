from fastapi import Depends, FastAPI, APIRouter, File, UploadFile, Form
from fastapi.responses import FileResponse
from pydantic import BaseModel
from jose import JWTError, jwt
import os
from loguru import logger
import traceback

from database import db_models
from database.common_queries import query_all, query_filter
from database.db import get_db
from database.crud import utils as crud_utils
from database.schemas import utils as utils_schemas


from config import server_config
from .user import get_current_active_user
from .core import file_utils, user as user_core
from exceptions import api_exceptions


router = APIRouter(prefix='/utils/lich')


@router.get('/')
async def get_list_lich_by_user_id(user_id: int,
    current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)):

    if user_id != current_user.id:
        raise api_exceptions.PERMISSION_EXCEPTION()
    try:
        all_lich = crud_utils.select_list_lich_by_user_id(db, user_id)
        return [utils_schemas.LichFull.from_orm(lich) for lich in all_lich]
    except Exception as e:
        return api_exceptions.handle_simple_exception(e, logger)



@router.post('/')
async def create_lich(
    lich_model: utils_schemas.LichCreate,
    current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)
):
    try:
        lich_model.id_nguoi_tao = current_user.id
        new_lich = crud_utils.create_lich(db, lich_model)
        # logger.info(f"{new_cong_van.__dict__}")
        return utils_schemas.LichFull.from_orm(new_lich)
    except Exception as e:
        return api_exceptions.handle_simple_exception(e, logger)
    
    

@router.delete('/{lich_id}/delete')
async def delete_lich(
    lich_id: int,
    current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)
):
    try:
        lich: db_models.Lich = crud_utils.get_lich_by_id(db, lich_id)
        if lich is None:
            raise api_exceptions.NOT_FOUND_EXCEPTION()
        elif lich.id_nguoi_tao != current_user.id:
            raise api_exceptions.PERMISSION_EXCEPTION()
        return crud_utils.delete_lich(db, lich)
    except Exception as e:
        return api_exceptions.handle_simple_exception(e, logger)
