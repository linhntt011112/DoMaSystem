from .models import *
from .common_queries import query_all, query_filter


def get_user_by_username(username):
    user = query_filter(NguoiDung, NguoiDung.ten_tai_khoan == username)
    if len(user) == 1:
        return user[0]
    else:
        return None
    
