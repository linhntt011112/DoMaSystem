from datetime import datetime
import traceback
from fastapi import Depends, FastAPI, APIRouter, File, UploadFile, Form
from fastapi.responses import FileResponse
from pydantic import BaseModel
from jose import JWTError, jwt
from loguru import logger
import os

from database import db_models
from database.db import get_db
from database.schemas import notification as notification_schemas
from . import crud


from ..core.user import get_current_active_user
from exceptions import api_exceptions, db_exceptions


router = APIRouter(prefix='/notifications')


@router.get('/unread')
async def get_list_unread_notifications(current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)):    
    try:
        unread_notifications = crud.select_list_unread_notification(db, current_user.id)
        return [notification_schemas.NotificationFull.from_orm(notification).get_msg() for notification in unread_notifications]
    except Exception as e:
        return api_exceptions.handle_simple_exception(e, logger)
    
    
@router.get('/read')
async def get_list_read_notifications(current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)):    
    try:
        unread_notifications = crud.crud_notification.select_list_read_notification(db, current_user.id)
        return [notification_schemas.NotificationFull.from_orm(notification).get_msg() for notification in unread_notifications]
    except Exception as e:
        return api_exceptions.handle_simple_exception(e, logger)
    

@router.get('/{notification_id}/read')
async def get_list_read_notifications(notification_id: int, current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)):    
    try:
        # logger.info(notification_id)
        return crud.crud_notification.mark_as_read(db, current_user.id, notification_id)
        
    except Exception as e:
        return api_exceptions.handle_simple_exception(e, logger)
    
    
@router.get('/read-all')
async def get_list_read_notifications(current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)):    
    try:
        return crud.crud_notification.mark_all_as_read(db, current_user.id)
    except Exception as e:
        return api_exceptions.handle_simple_exception(e, logger)
    
    
