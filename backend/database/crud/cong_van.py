
from datetime import datetime
from .. import common_queries, db_models
from ..schemas import cong_van as cong_van_schemas

import typing 
from .exceptions import DBException



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



def create_cong_van_di(db, cong_van_di: cong_van_schemas.CongVanDiCreate):
    cong_van_di_dict = {k: v for k, v in cong_van_di.__dict__.item() if v is not None}
    
    def select_fields(fields_name, class_):
        all_ids = [cong_van_di_dict[k] for k in fields_name if cong_van_di_dict[k] is not None]
        all_objs = common_queries.select_with_options(db, class_, (class_.id.in_(all_ids)))
        all_objs_id = set([str(obj.id) for obj in all_objs])
        
        objs_map = {}
        
        for i, id in enumerate(all_ids):
            if str(id) not in all_objs_id:
                raise DBException(f"Can not find {fields_name[i]}={id} !")
            
            for obj in all_objs:
                if str(obj.id) == str(id):
                    objs_map[fields_name[i]] = obj
        
        return all_objs
    
    all_phong_ban_fields = ['id_phong_ban_nhan', 'id_phong_ban_phat_hanh']
    all_phong_ban = select_fields(all_phong_ban_fields, db_models.PhongBan)
    
    all_user_fields = [item for item in ['id_nguoi_ky', 'id_nguoi_theo_doi', 'id_nguoi_tao', 'id_nguoi_duyet', 'id_nguoi_xu_ly'] if item in cong_van_di_dict]
    all_users = select_fields(all_user_fields, db_models.NguoiDung)
    
    if all_users['id_nguoi_ky'].phong_ban.id != all_phong_ban['id_phong_ban_phat_hanh']:
        raise DBException("nguoi_ky khong thuoc phong_ban_phat_hanh") 

    if all_users['id_nguoi_xu_ly'].phong_ban.id != all_phong_ban['id_phong_ban_nhan']:
        raise DBException("nguoi_xu_ly khong thuoc phong_ban_nhan") 
    
    
    new_cong_van_di = db_models.CongVanDi(**cong_van_di_dict)
    new_cong_van_di.ngay_tao = datetime.now().date()
    
    return common_queries.add_and_commit(db, new_cong_van_di)
