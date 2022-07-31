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
from database.crud import cong_van as crud_cong_van
from database.schemas import cong_van as cong_van_schemas


from config import server_config
from .user import get_current_active_user
from .core import file_utils, user as user_core
from .cong_van import authorize_user_for_cong_van
from exceptions import api_exceptions


router = APIRouter(prefix='/cong_van')



@router.get('/{cong_van_id}/version/list')
async def get_cong_van_version_by_id(cong_van_id: int,
    current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)):

    try:
        cong_van = crud_cong_van.get_cong_van_by_id(db, cong_van_id=cong_van_id)
        if cong_van is None:
            raise api_exceptions.NOT_FOUND_EXCEPTION()
        authorize_user_for_cong_van(current_user, cong_van)
        
        return cong_van_schemas.CongVanListVersion.from_orm(cong_van)
    except Exception as e:
        return api_exceptions.handle_simple_exception(e, logger)
    
    
    
@router.get('/{cong_van_id}/version/{version_id}')
async def get_cong_van_version_by_id(cong_van_id: int, version_id: int,
    current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)):

    try:
        cong_van = crud_cong_van.get_cong_van_by_id(db, cong_van_id=cong_van_id)
        if cong_van is None:
            raise api_exceptions.NOT_FOUND_EXCEPTION()
        authorize_user_for_cong_van(current_user, cong_van)
        
        cong_van_version = crud_cong_van.get_cong_van_version_by_id(db, version_id)
        if cong_van_version is None:
            raise api_exceptions.NOT_FOUND_EXCEPTION()
        
        return cong_van_schemas.CongVanVersionFull.from_orm(cong_van_version)
    except Exception as e:
        return api_exceptions.handle_simple_exception(e, logger)
    
    

@router.get("/version/{cong_van_version_id}/download/tep_dinh_kem")
async def download_tep_dinh_kem(
                        cong_van_version_id: int,
                        user=Depends(user_core.get_user_of_download_token),
                        db=Depends(get_db)):
    cong_van_version: db_models.CongVanVersion = crud_cong_van.get_cong_van_version_by_id(db, cong_van_version_id)
    
    # is_authorized = authorize_user_for_ai_model_version(user, ai_model_version)
    is_authorized = True
    if is_authorized:
        try:
            file_path = os.path.join(cong_van_version.tep_dinh_kem.save_location)
            if os.path.isfile(file_path):
                return FileResponse(file_path, filename=cong_van_version.tep_dinh_kem.name)
            else:
                return None

        except Exception as e:
            logger.error(f'{str(e)}: {traceback.format_exc()}')
            raise api_exceptions.INTERNAL_SERVER_ERROR(str(e))
    else:
        raise api_exceptions.PERMISSION_EXCEPTION()

