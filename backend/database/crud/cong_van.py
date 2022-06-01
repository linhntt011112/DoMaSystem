
from datetime import datetime
from .. import common_queries, db_models
from ..schemas import cong_van as cong_van_schemas

import typing 
from . import exceptions



def select_list_loai_cong_van(db, **kwargs):
    list_of_objs = common_queries.select_with_options(db, db_models.LoaiCongVan, **kwargs)
    return list_of_objs




def get_loai_cong_van_by_id(db, loai_cong_van_id):
    loai_cong_van = common_queries.query_filter(db, db_models.LoaiCongVan, condition=(db_models.LoaiCongVan.id == loai_cong_van_id))
    if len(loai_cong_van) >= 1:
        return loai_cong_van[0]
    else:
        return None


def create_loai_cong_van(db, loai_cong_van: cong_van_schemas.LoaiCongVanCreate):
    now = datetime.now()
    
    new_loai_cong_van = db_models.LoaiCongVan(
        ma_loai=loai_cong_van.ma_loai,
        name=loai_cong_van.name,
        trang_thai=loai_cong_van.trang_thai,
        id_nguoi_cap_nhat=loai_cong_van.id_nguoi_cap_nhat,
        thoi_gian_cap_nhat=now,
        mo_ta=loai_cong_van.mo_ta,
    )
    
    return common_queries.add_and_commit(db, new_loai_cong_van)


def delete_loai_cong_van_by_id(db, loai_cong_van_id: int):
    loai_cong_van = get_loai_cong_van_by_id(db, loai_cong_van_id)
    if loai_cong_van is None:
        return False
    
    return common_queries.delete(db, loai_cong_van)


def delete_loai_cong_van(db, loai_cong_van):
    return common_queries.delete(db, loai_cong_van)