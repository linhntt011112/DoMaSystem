
from datetime import datetime
from .. import common_queries, db_models
from ..schemas import cong_van as cong_van_schemas

import typing 
from exceptions import db_exceptions



def select_list_loai_cong_van(db, **kwargs):
    list_of_objs = common_queries.select_with_options(db, db_models.LoaiCongVan, **kwargs)
    return list_of_objs



def get_loai_cong_van_by_id(db, loai_cong_van_id):
    loai_cong_van = common_queries.query_filter(db, db_models.LoaiCongVan, condition=(db_models.LoaiCongVan.id == loai_cong_van_id))
    if len(loai_cong_van) >= 1:
        return loai_cong_van[0]
    else:
        return None
    
    

def validate_loai_cong_van(loai_cong_van_data_dict):
    if 'trang_thai' in loai_cong_van_data_dict and not db_models.TrangThaiLoaiCongVan.verify(loai_cong_van_data_dict['trang_thai']):
        raise db_exceptions.ResourceNotFoundException()

    return True


def create_loai_cong_van(db, loai_cong_van_pydantic: cong_van_schemas.LoaiCongVanCreate):
    now = datetime.now()
    
    data_dict = loai_cong_van_pydantic.__dict__
    data_dict = {k: data_dict[k] for k in data_dict if data_dict[k] is not None}
    validate_loai_cong_van(loai_cong_van_data_dict=data_dict)
    
    new_loai_cong_van = db_models.LoaiCongVan(**data_dict)
    new_loai_cong_van.thoi_gian_cap_nhat = now
    
    return common_queries.add_and_commit(db, new_loai_cong_van)



def update_loai_cong_van(db, loai_cong_van: db_models.LoaiCongVan, loai_cong_van_pydantic: cong_van_schemas.LoaiCongVanUpdate):
    now = datetime.now()
    
    data_dict = loai_cong_van_pydantic.__dict__
    data_dict = {k: data_dict[k] for k in data_dict if data_dict[k] is not None}
    
    
    [setattr(loai_cong_van, k, data_dict[k]) for k in data_dict]
    loai_cong_van.thoi_gian_cap_nhat = now
    
    return common_queries.add_and_commit(db, loai_cong_van)



def delete_loai_cong_van_by_id(db, loai_cong_van_id: int):
    loai_cong_van = get_loai_cong_van_by_id(db, loai_cong_van_id)
    if loai_cong_van is None:
        return False
    
    return common_queries.delete(db, loai_cong_van)


def delete_loai_cong_van(db, loai_cong_van):
    return common_queries.delete(db, loai_cong_van)


###########################################################


def select_list_cong_van_di(db, limit: int=None, offset: int=None, order_by: str=None,
                        id_loai_cong_van: int = None, 
                        id_tinh_trang_xu_ly: int = None,
                        id_muc_do_uu_tien: int = None):
    
    condition = None
    class_ = db_models.CongVanDi
    if id_loai_cong_van is not None:
        if condition is None:
            condition = (class_.id_loai_cong_van == id_loai_cong_van)
        else:
            condition = condition & (class_.id_loai_cong_van == id_loai_cong_van)
    if id_tinh_trang_xu_ly is not None:
        if condition is None:
            condition = (class_.id_tinh_trang_xu_ly == id_tinh_trang_xu_ly)
        else:
            condition = condition & (class_.id_tinh_trang_xu_ly == id_tinh_trang_xu_ly)
    if id_muc_do_uu_tien is not None:
        if condition is None:
            condition += (class_.id_muc_do_uu_tien == id_muc_do_uu_tien)
        else:
            condition = condition & (class_.id_muc_do_uu_tien == id_muc_do_uu_tien)
    # print(condition)
    
    list_of_objs = common_queries.select_with_options(db, db_models.CongVanDi, 
                                                      limit=limit,
                                                      offset=offset,
                                                      order_by=order_by,
                                                      condition=condition)
    return list_of_objs


def get_cong_van_di_by_id(db, cong_van_di_id):
    cong_van = common_queries.query_filter(db, db_models.CongVanDi, condition=(db_models.CongVanDi.id == cong_van_di_id))
    if len(cong_van) >= 1:
        return cong_van[0]
    else:
        return None
    
    

def validate_cong_van_di(db, cong_van_di_data_dict):
    cong_van_di_dict = cong_van_di_data_dict
    
    def select_fields(fields_name, class_):
        all_ids = [cong_van_di_dict[k] for k in fields_name if cong_van_di_dict[k] is not None]
        all_objs = common_queries.select_with_options(db, class_, (class_.id.in_(all_ids)))
        all_objs_id = set([str(obj.id) for obj in all_objs])
        
        objs_map = {}
        
        for i, id in enumerate(all_ids):
            if str(id) not in all_objs_id:
                raise db_exceptions.ResourceNotFoundException(f"Can not find {fields_name[i]}={id} !")
            
            for obj in all_objs:
                if str(obj.id) == str(id):
                    objs_map[fields_name[i]] = obj
        
        return objs_map
    
    all_phong_ban_fields = ['id_phong_ban_nhan', 'id_phong_ban_phat_hanh']
    all_phong_ban = select_fields(all_phong_ban_fields, db_models.PhongBan)
    
    all_user_fields = [item for item in ['id_nguoi_ky', 'id_nguoi_theo_doi', 'id_nguoi_tao', 'id_nguoi_duyet', 'id_nguoi_xu_ly'] if item in cong_van_di_dict]
    all_users = select_fields(all_user_fields, db_models.NguoiDung)
    
    if all_users['id_nguoi_ky'].phong_ban.id != all_phong_ban['id_phong_ban_phat_hanh'].id:
        raise db_exceptions.DBException("nguoi_ky khong thuoc phong_ban_phat_hanh") 

    if all_users['id_nguoi_xu_ly'].phong_ban.id != all_phong_ban['id_phong_ban_nhan'].id:
        raise db_exceptions.DBException("nguoi_xu_ly khong thuoc phong_ban_nhan") 



def create_cong_van_di(db, cong_van_di_pydantic: cong_van_schemas.CongVanDiCreate):
    data_dict = cong_van_di_pydantic.__dict__
    data_dict = {k: data_dict[k] for k in data_dict if data_dict[k] is not None}
    
    validate_cong_van_di(db, cong_van_di_data_dict=data_dict)
    
    new_cong_van_di = db_models.CongVanDi(**data_dict)
    new_cong_van_di.ngay_tao = datetime.now().date()
    
    return common_queries.add_and_commit(db, new_cong_van_di)




def update_cong_van_di(db, cong_van_di: db_models.LoaiCongVan, cong_van_di_pydantic: cong_van_schemas.CongVanDiUpdate=None):
    now = datetime.now()
    
    if cong_van_di_pydantic is not None:
        data_dict = cong_van_di_pydantic.__dict__
        data_dict = {k: data_dict[k] for k in data_dict if data_dict[k] is not None}
        
        validate_cong_van_di(db, cong_van_di_data_dict=data_dict)
        
        [setattr(cong_van_di, k, data_dict[k]) for k in data_dict]
        
    cong_van_di.thoi_gian_cap_nhat = now
    
    return common_queries.add_and_commit(db, cong_van_di)


def delete_cong_van_di(db, cong_van_di):
    return common_queries.delete(db, cong_van_di)



#################################################################

def create_save_file(db, save_file_pydantic: cong_van_schemas.SaveFileCreate):
    data_dict = save_file_pydantic.__dict__
    data_dict = {k: data_dict[k] for k in data_dict if data_dict[k] is not None}
    
    save_file = db_models.SaveFile(**data_dict)
    save_file.upload_at = datetime.now()
    
    return common_queries.add_and_commit(db, save_file)

