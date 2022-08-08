from struct import pack
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

from database import db_models, common_queries
from database.db import get_db
from database.crud import user as crud_user 
from database.schemas import nguoi_dung as user_schemas

from .utils import Hasher
from exceptions import api_exceptions
from .config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
from .core import user as user_core
from .core.user import (
    get_current_user, get_current_active_user, create_user as create_user_core, request_download_token
)


router = APIRouter(prefix='/user')



@router.get("/me")
async def read_users_me(current_user = Depends(get_current_active_user)):
    # logger.debug(current_user.role.role_name)
    # return current_user.as_dict()
    return user_schemas.UserBase.from_orm(current_user)


@router.get("/list-full")
async def get_list_users(current_user = Depends(get_current_active_user), db=Depends(get_db),
                        limit: int=None, offset: int=None,
                        order_by=None):    
    if current_user.phan_quyen == db_models.PhanQuyen.admin:
        users = crud_user.select_list_user(db, limit=limit, offset=offset)
        return [user_schemas.UserBase.from_orm(user) for user in users]
    else:
        raise api_exceptions.PERMISSION_EXCEPTION()
    

@router.get("/list")
async def get_list_users(current_user = Depends(get_current_active_user), db=Depends(get_db),
                        limit: int=None, offset: int=None,
                        order_by=None):    
    try:
        users = crud_user.select_list_user(db, limit=limit, offset=offset)
        return [user_schemas.UserShort.from_orm(user) for user in users]
    except Exception as e:
        raise api_exceptions.INTERNAL_SERVER_ERROR(str(e))
    


@router.get("/id/{user_id}")
async def get_user_by_id(user_id: int, current_user = Depends(get_current_active_user), db=Depends(get_db)):
    if current_user.phan_quyen == db_models.PhanQuyen.admin:
        user = crud_user.get_user_by_id(db, user_id)
        if user is not None:
            return user_schemas.UserBase.from_orm(user)
        else:
            raise api_exceptions.NOT_FOUND_EXCEPTION()
    else:
        raise api_exceptions.PERMISSION_EXCEPTION()


@router.post("/create")
async def create_user(user_register: user_schemas.UserCreate, 
                      current_user=Depends(get_current_active_user),
                      db=Depends(get_db)):
    logger.info(user_register)
    if current_user.phan_quyen != db_models.PhanQuyen.admin:
        raise api_exceptions.PERMISSION_EXCEPTION()
    
    try:
        user, plain_password = create_user_core(db, user_register, create_password=True)
        user_schema = user_schemas.UserBaseFirstTime.from_orm(user)
        user_schema.plain_password = plain_password
        return user_schema
        
    except Exception as e:
        # db.rollback()
        error_message = str(e)
        # logger.info(type(e))
        if api_exceptions.filter_duplicate_entry_error(e):
            error_message = 'Duplicate ten_tai_khoan!'
            
        if not isinstance(e, HTTPException):
            logger.error(f'{error_message}: {traceback.format_exc()}')
            raise api_exceptions.INTERNAL_SERVER_ERROR(error_message)
        else:
            raise e
        
        
@router.post("/test")
async def create_user(user_register: user_schemas.UserCreate, 
                    #   current_user=Depends(get_current_active_user), db=Depends(get_db)
                      ):
    logger.info(user_register)
    return user_register
    # db=Depends(get_db)
    # db = get_db()
    # if current_user.phan_quyen != db_models.PhanQuyen.admin:
    #     raise exceptions.PERMISSION_EXCEPTION()
    
    # try:
    #     user, plain_password = create_user_core(db, user_register, create_password=True)
    #     user_schema = user_schemas.UserBaseFirstTime.from_orm(user)
    #     user_schema.plain_password = plain_password
    #     return user_schema
        
    # except Exception as e:
    #     # db.rollback()
    #     error_message = str(e)
    #     # logger.info(type(e))
    #     if exceptions.filter_duplicate_entry_error(e):
    #         error_message = 'Duplicate ten_tai_khoan!'
            
    #     if not isinstance(e, HTTPException):
    #         logger.error(f'{error_message}: {traceback.format_exc()}')
    #         raise exceptions.INTERNAL_SERVER_ERROR(error_message)
    #     else:
    #         raise e
    


@router.put("/update_password")
async def update_info_user(user_update_password: user_schemas.UserUpdatePassword,
    current_user=Depends(get_current_active_user), db=Depends(get_db)):
    # if current_user.id != user_update_password.id:
    #     raise exceptions.PERMISSION_EXCEPTION()
    try:
        current_user = user_core.update_password(db, current_user, user_update_password)
        return current_user
    
    except Exception as e:
        # db.rollback()
        return api_exceptions.handle_simple_exception(e, logger)
    


@router.put("/{user_id}/reset_password")
async def update_info_user(user_id: int,
    current_user=Depends(get_current_active_user), db=Depends(get_db)):

    try:
        if current_user.phan_quyen != db_models.PhanQuyen.admin:
            raise api_exceptions.PERMISSION_EXCEPTION()
        user_to_update = crud_user.get_user_by_id(db, user_id)
        if user_to_update is  None:
            raise api_exceptions.NOT_FOUND_EXCEPTION()
        
        return user_core.reset_password(db, user_to_update)
    except Exception as e:
        # db.rollback()
        return api_exceptions.handle_simple_exception(e, logger)



@router.put("/update")
async def update_info_user_self(user_schema_model: user_schemas.UserSelfUpdateInfo,
    current_user=Depends(get_current_active_user), db=Depends(get_db)):
    # if current_user.id != user_update_password.id:
    #     raise exceptions.PERMISSION_EXCEPTION()
    try:
        current_user = user_core.update_user_self(db, current_user, user_schema_model)
        return user_schemas.UserBase.from_orm(current_user)
    
    except Exception as e:
        return api_exceptions.handle_simple_exception(e, logger)
    


@router.put("/{user_id}/admin-update")
async def update_info_user_self(user_id: int, user_schema_model: user_schemas.UserAdminUpdateInfo,
    current_user=Depends(get_current_active_user), db=Depends(get_db)):
    if current_user.phan_quyen != db_models.PhanQuyen.admin:
        raise api_exceptions.PERMISSION_EXCEPTION()
    try:
        user = crud_user.get_user_by_id(db, user_id)
        if user is None:
            raise api_exceptions.NOT_FOUND_EXCEPTION()
        user = user_core.update_user_admin(db, user, user_schema_model)
        return user_schemas.UserBase.from_orm(user)
    
    except Exception as e:
        return api_exceptions.handle_simple_exception(e, logger)
    



@router.delete("/delete/{user_id}")
async def delete_user_by_id(user_id: int, current_user = Depends(get_current_active_user), db=Depends(get_db)):
    if current_user.phan_quyen == db_models.PhanQuyen.admin:
        try:
            user_to_delete = crud_user.get_user_by_id(db, user_id)
            if user_to_delete is None:
                raise api_exceptions.NOT_FOUND_EXCEPTION(f"Can not find user with id {user_id}")
            if user_to_delete.phan_quyen == db_models.PhanQuyen.admin:
                raise api_exceptions.PERMISSION_EXCEPTION("Can not delete admin user!")
            
            is_success = crud_user.delete_user(db, user_to_delete)
            if not is_success:
                raise api_exceptions.INTERNAL_SERVER_ERROR(f"Can not delete user with id={user_id}")
            return True
        except Exception as e:
            return api_exceptions.handle_simple_exception(e, logger)
    else:
        raise api_exceptions.PERMISSION_EXCEPTION()
    
    

@router.get("/get_download_token")
async def get_download_tokenn(download_token=Depends(request_download_token)):
    return download_token
