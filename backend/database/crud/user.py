
from datetime import datetime
from .. import common_queries, db_models
from ..schemas import nguoi_dung as user_schemas

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


def create_user(db, user: db_models.NguoiDung):

    new_user = common_queries.add_and_commit(db, user)
    return new_user


def update_user(db, user: db_models.NguoiDung):
    user.ngay_cap_nhat = datetime.now()
    user = common_queries.add_and_commit(db, user)
    return user


def delete_user_by_id(db, user_id: int):
    user = get_user_by_id(db, user_id)
    if user is None:
        return False
    
    return common_queries.delete(db, user)


def delete_user(db, user):
    return common_queries.delete(db, user)
