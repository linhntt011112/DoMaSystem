
from datetime import datetime
from .. import common_queries, db_models
from ..schemas import nguoi_dung as user_schemas

from sqlalchemy import select, insert
from sqlalchemy.orm import Session
import typing 
from . import exceptions



def get_user_by_ten_tai_khoan(db, ten_tai_khoan):
    user = common_queries.query_filter(db, db_models.NguoiDung, (db_models.NguoiDung.ten_tai_khoan==ten_tai_khoan))
    if len(user) >= 1:
        return user[0]
    else:
        return None


def get_user(db, ten_tai_khoan: str=None):
    return get_user_by_ten_tai_khoan(db, ten_tai_khoan)


def get_user_by_id(db, user_id):
    user = common_queries.query_filter(db, db_models.NguoiDung, condition=(db_models.NguoiDung.id == user_id))
    if len(user) >= 1:
        return user[0]
    else:
        return None


def get_all_user(db):
    return common_queries.query_all(db, db_models.NguoiDung)



def select_list_user(db, **kwargs):
    users = common_queries.select_with_options(db, db_models.NguoiDung, **kwargs)
    return users


# def create_user(db, user: user_schemas.UserCreate):
#     if get_user_by_email(db, user.email):
#         raise exceptions.EmailTakenException(f"Email {user.email} has been taken!")
#     user_role = get_user_role_by_name(db, user.role.role_name)
#     if user_role is None:
#         raise ValueError(f'Can not find role with name: {user.role.role_name}')

#     now = datetime.now()
#     new_user = db_models.User(
#         email = user.email,
#         username = user.username if user.username is not None else user.email,
#         password_salt = user.password_salt,
#         password = user.password,

#         full_name = user.full_name,
#         create_at = user.create_at if user.create_at is not None else now,
#         update_at = user.update_at if user.update_at is not None else now,
#         is_active = user.is_active,
        
#         role_id = user_role.id,
#     )

#     new_user = common_queries.add_and_commit(db, new_user)
#     return new_user


def delete_user_by_id(db, user_id: int):
    user = common_queries.query_filter(db, db_models.NguoiDung, condition=(db_models.NguoiDung.id==user_id))
    if len(user) == 0:
        return False
    
    return common_queries.delete(db, user)
