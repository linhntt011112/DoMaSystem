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


router = APIRouter(prefix='/common')


@router.get("/get_download_token")
async def get_download_token(
                        download_token=Depends(user_core.request_download_token)):
    return download_token