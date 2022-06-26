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
from exceptions import api_exceptions


router = APIRouter(prefix='/cong_van/version')


@router.get("/download/tep_dinh_kem")
async def download_training_log(
                        cong_van_di_version_id: int,
                        user=Depends(user_core.get_user_of_download_token),
                        db=Depends(get_db)):
    cong_van_di_version: db_models.CongVanDiVersion = crud_cong_van.get_cong_van_di_version_by_id(db, cong_van_di_version_id)
    
    # is_authorized = authorize_user_for_ai_model_version(user, ai_model_version)
    is_authorized = True
    if is_authorized:
        try:
            file_path = os.path.join(cong_van_di_version.tep_dinh_kem.save_location)
            if os.path.isfile(file_path):
                return FileResponse(file_path, filename=cong_van_di_version.tep_dinh_kem.name)
            else:
                return None

        except Exception as e:
            logger.error(f'{str(e)}: {traceback.format_exc()}')
            raise api_exceptions.INTERNAL_SERVER_ERROR(str(e))
    else:
        raise api_exceptions.PERMISSION_EXCEPTION()

