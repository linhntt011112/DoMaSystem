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
from database.db_models.static_table import PhanQuyen

from database import db_models, common_queries
from database.db import get_db
from database.crud import user as crud_user 
from database.schemas import nguoi_dung as user_schemas

from .utils import Hasher
from .import exceptions
from .config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
from .core.user import (
    get_current_user, get_current_active_user,
)


router = APIRouter(prefix='/user')



@router.get("/me")
async def read_users_me(current_user = Depends(get_current_active_user)):
    # logger.debug(current_user.role.role_name)
    # return current_user.as_dict()
    return user_schemas.UserBase.from_orm(current_user)


@router.get("/list")
async def get_list_users(current_user:db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db),
                        limit: int=10, offset: int=0,
                        order_by=None):    
    if current_user.phan_quyen == PhanQuyen.admin:
        users = crud_user.select_list_user(db, limit=limit, offset=offset)
        return [user_schemas.UserBase.from_orm(user) for user in users]
    else:
        raise exceptions.PERMISSION_EXCEPTION()


@router.get("/id/{user_id}")
async def get_user_by_id(user_id: int, current_user = Depends(get_current_active_user), db=Depends(get_db)):
    if current_user.phan_quyen == PhanQuyen.admin:
        user = crud_user.get_user_by_id(db, user_id)
        if user is not None:
            return user_schemas.UserBase.from_orm(user)
        else:
            raise exceptions.NOT_FOUND_EXCEPTION()
    else:
        raise exceptions.PERMISSION_EXCEPTION()


# @router.post("/register")
# async def create_user(user_register: user_schemas.UserRegister, db=Depends(get_db)):
#     try:
#         user = await create_user_core(db, user_register)
#         if user is None:
#             raise Exception()
#         return user_schemas.UserBase.from_orm(user)
#     except Exception as e:
#         logger.error(str(e))
#         # traceback.print_stack()
#         full_error =  ''
#         # logger.error(full_error)

#         return {'error': full_error}
    

# @router.put("/update_info")
# async def update_info_user(user_edit: user_schemas.UserEdit, current_user = Depends(get_current_active_user), db=Depends(get_db)):
#     pass
#     # role_name = "admin"
#     # is_authorized = authorize_user_by_role_name(db, current_user, role_name)
#     # if is_authorized:
#     #     user = crud_user.get_user_by_id(db, user_id)
#     #     if user is not None:
#     #         return user_schemas.UserBase.from_orm(user)
#     #     else:
#     #         raise HTTPException(
#     #             status_code=status.HTTP_404_NOT_FOUND,
#     #             detail=f"Can not find user with id = {user_id}",
#     #             headers={"WWW-Authenticate": "Bearer"},
#     #         ) 
#     # else:
#     #     raise PERMISSION_EXCEPTION



# @router.delete("/delete_user/{user_id}")
# async def delete_user_by_id(current_user = Depends(get_current_active_user), db=Depends(get_db)):
#     pass
