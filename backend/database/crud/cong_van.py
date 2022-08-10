
from datetime import datetime

from database.db_models import cong_van

from .. import common_queries, db_models
from ..schemas import cong_van as cong_van_schemas

from loguru import logger
from exceptions import db_exceptions
from api.core.file_utils import remove_file



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
        raise db_exceptions.ResourceNotFoundException("Not a valid trang_thai !")

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
    
    validate_loai_cong_van(data_dict)
    
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


def get_cong_van_version_by_id(db, cong_van_version_id):
    cong_van = common_queries.query_filter(db, db_models.CongVanVersion, condition=(db_models.CongVanVersion.id == cong_van_version_id))
    if len(cong_van) >= 1:
        return cong_van[0]
    else:
        return None
    
    

def validate_cong_van_version(db, cong_van_version_data_dict):
    cong_van_dict = cong_van_version_data_dict
    
    def select_fields(fields_name, class_):
        all_ids = [cong_van_dict[k] for k in fields_name if cong_van_dict[k] is not None]
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
    
    all_user_fields = [item for item in ['id_nguoi_ky', 'id_nguoi_theo_doi', 'id_nguoi_tao', 'id_nguoi_xu_ly'] if item in cong_van_dict]
    all_users = select_fields(all_user_fields, db_models.NguoiDung)
    
    if all_users['id_nguoi_ky'].phong_ban.id != all_phong_ban['id_phong_ban_phat_hanh'].id:
        raise db_exceptions.DBException("nguoi_ky khong thuoc phong_ban_phat_hanh") 

    if all_users['id_nguoi_xu_ly'].phong_ban.id != all_phong_ban['id_phong_ban_nhan'].id:
        raise db_exceptions.DBException("nguoi_xu_ly khong thuoc phong_ban_nhan") 



def create_cong_van_version_from_data_dict(db, data_dict):
    # validate_cong_van_version(db, cong_van_version_data_dict=data_dict)
    
    data_dict["ngay_tao"] = datetime.now()
    data_dict["thoi_gian_cap_nhat"] = data_dict["ngay_tao"]
    new_cong_van_version = db_models.CongVanVersion(**data_dict)
    
    return common_queries.add_and_commit(db, new_cong_van_version)



def create_cong_van_version(db, cong_van_version_pydantic: cong_van_schemas.CongVanVersionCreate):
    data_dict = cong_van_version_pydantic.__dict__
    data_dict = {k: data_dict[k] for k in data_dict if data_dict[k] is not None}
    
    return create_cong_van_version_from_data_dict(db, data_dict)



def create_cong_van_version_from_current_and_data_dict(
    db, current_cong_van_version: db_models.CongVanVersion,
    data_dict: dict
    ):
    data_dict = {k: data_dict[k] for k in data_dict if data_dict[k] is not None}
    if len(data_dict) == 0:
        raise db_exceptions.DBException("Can not create new version with empty data!")
    current_data_dict = current_cong_van_version.__dict__
    current_data_dict = {k: current_data_dict[k] for k in current_data_dict if k not in {'_sa_instance_state', 'id'}}
    current_data_dict.update(data_dict)
    # logger.info(f"{current_data_dict}")
    cong_van_version = create_cong_van_version_from_data_dict(db, current_data_dict)

    return common_queries.add_and_commit(db, cong_van_version)


def delete_cong_van_version(db, cong_van_version: db_models.CongVanVersion):
    if cong_van_version.tep_dinh_kem is not None:
        # cong_van_version.id_tep_dinh_kem = None
        # logger.info(f"{cong_van_version.__dict__}")
        delete_save_file(db, cong_van_version.tep_dinh_kem)
    return common_queries.delete(db, cong_van_version)




#################################################################
def select_list_cong_van(db, limit: int=None, offset: int=None, order_by: str=None,
                        id_loai_cong_van: int = None, 
                        id_tinh_trang_xu_ly: int = None,
                        id_muc_do_uu_tien: int = None,
                        condition=None, count=False):
    
    class_ = db_models.CongVanVersion
    if id_loai_cong_van is not None:
        if condition is None:
            condition = (class_.id_loai_cong_van == id_loai_cong_van)
        else:
            condition = condition & (class_.id_loai_cong_van == id_loai_cong_van)
    if id_tinh_trang_xu_ly is not None:
        if id_tinh_trang_xu_ly > 0:
            if condition is None:
                condition = (class_.id_tinh_trang_xu_ly == id_tinh_trang_xu_ly)
            else:
                condition = condition & (class_.id_tinh_trang_xu_ly == id_tinh_trang_xu_ly)
        else:
            if condition is None:
                condition = (class_.id_tinh_trang_xu_ly != -id_tinh_trang_xu_ly)
            else:
                condition = condition & (class_.id_tinh_trang_xu_ly != -id_tinh_trang_xu_ly)
    if id_muc_do_uu_tien is not None:
        if condition is None:
            condition += (class_.id_muc_do_uu_tien == id_muc_do_uu_tien)
        else:
            condition = condition & (class_.id_muc_do_uu_tien == id_muc_do_uu_tien)
    # print(condition)
    
    list_of_objs = common_queries.select_with_options(db, db_models.CongVan, 
                                                      limit=limit,
                                                      offset=offset,
                                                      order_by=order_by,
                                                      condition=condition,
                                                      join_field=db_models.CongVan.cong_van_current_version,
                                                      count=count)
    return list_of_objs


def get_cong_van_by_id(db, cong_van_id):
    cong_van = common_queries.query_filter(db, db_models.CongVan, condition=(db_models.CongVan.id == cong_van_id))
    if len(cong_van) >= 1:
        return cong_van[0]
    else:
        return None
    
    
    
# def get_cong_van_by_id_and_user(db, cong_van_id, user: db_models.NguoiDung):
#     class_ = db_models.CongVanVersion
#     condition = (class_.id == cong_van_id) & \
#                 (
#                     (user.id == class_.id_nguoi_tao) | \
#                     (user.id == class_.id_nguoi_ky) | \
#                     (user.id == class_.id_nguoi_xu_ly) | \
#                     (user.id == class_.id_nguoi_theo_doi)
#                 )
#     cong_van = common_queries.query_filter(db, db_models.CongVan, condition=(db_models.CongVan.id == cong_van_id))
#     if len(cong_van) >= 1:
#         return cong_van[0]
#     else:
#         return None



# def validate_cong_van(db, cong_van_version_data_dict):
#     return True 


def create_cong_van(db, cong_van_version_pydantic: cong_van_schemas.CongVanVersionCreate):
    cong_van = None
    cong_van_version = None
    try:
        now = datetime.now()
        cong_van = db_models.CongVan(create_at=now, update_at=now)
        cong_van: db_models.CongVan = common_queries.add_and_commit(db, cong_van)
        
        cong_van_version_pydantic.cong_van_id = cong_van.id
        cong_van_version = create_cong_van_version(db, cong_van_version_pydantic)
        cong_van.cong_van_current_version_id = cong_van_version.id
        # logger.info(f"{cong_van.__dict__}")
        
        return common_queries.add_and_commit(db, cong_van)
    except Exception as e:
        if cong_van_version is not None:
            common_queries.delete(db, cong_van_version)
        if cong_van is not None:
            common_queries.delete(db, cong_van)

        raise db_exceptions.DBException(db_exceptions.get_error_description(e))
    


# # TODO
# def validate_cong_van_version_from_current_version(
#     db, 
#     cong_van_current_version_pydantic: cong_van_schemas.CongVanVersionFull,
#     cong_van_version_pydantic: cong_van_schemas.CongVanVersionCreate):
#     return True



def update_cong_van(db, cong_van: db_models.CongVan,
                       cong_van_version_pydantic: cong_van_schemas.CongVanVersionUpdate = None):
    prev_version_id = cong_van.cong_van_current_version_id
    cong_van_version = None
    
    if cong_van_version_pydantic is not None:
        try:
            data_dict = cong_van_version_pydantic.__dict__
            data_dict["thoi_gian_cap_nhat"] = datetime.now()
            new_cong_van_version = create_cong_van_version_from_current_and_data_dict(
                db, cong_van.cong_van_current_version, data_dict
            )
            
            # logger.debug(f"{new_cong_van_version.__dict__}")
            cong_van.cong_van_current_version_id = new_cong_van_version.id
            cong_van.update_at = datetime.now()
            
            return common_queries.add_and_commit(db, cong_van)
        except Exception as e:
            cong_van.cong_van_current_version_id = prev_version_id
            common_queries.add_and_commit(db, cong_van)
            
            if cong_van_version is not None:
                common_queries.delete(db, cong_van_version)

            raise db_exceptions.DBException(db_exceptions.get_error_description(e))
    else:
        return common_queries.add_and_commit(db, cong_van)



def delete_cong_van(db, cong_van: db_models.CongVan):
    cong_van.cong_van_current_version_id = None
    for cong_van_version in cong_van.cong_van_versions:
        delete_cong_van_version(db, cong_van_version)
    for trao_doi in cong_van.tat_ca_trao_doi:
        delete_trao_doi(db,  trao_doi)
    return common_queries.delete(db, cong_van)



#################################################################

def create_save_file(db, save_file_pydantic: cong_van_schemas.SaveFileCreate):
    data_dict = save_file_pydantic.__dict__
    data_dict = {k: data_dict[k] for k in data_dict if data_dict[k] is not None}
    
    save_file = db_models.SaveFile(**data_dict)
    save_file.upload_at = datetime.now()
    
    return common_queries.add_and_commit(db, save_file)


def delete_save_file(db, save_file: db_models.SaveFile):
    remove_file(save_file.save_location)
    
    return common_queries.delete(db, save_file)



#########################################################################

def check_permission_trao_doi(db, cong_van: db_models.CongVan, user_id):
    people = ['id_nguoi_ky', 'id_nguoi_tao', 'id_nguoi_xu_ly', 'id_nguoi_theo_doi']
    is_valid_permission = False
    for k in people:
        if cong_van.cong_van_current_version.__dict__[k] == user_id:
            is_valid_permission = True
            break
    if not is_valid_permission:
        raise db_exceptions.PermissionException()


def select_list_trao_doi_by_cong_van_id(db, cong_van_id, **kwargs):
    list_of_objs = common_queries.select_with_options(db, db_models.TraoDoiCongVan, condition=(db_models.TraoDoiCongVan.id_cong_van==cong_van_id), **kwargs)
    return list_of_objs


def create_trao_doi(db, cong_van: db_models.CongVan, trao_doi: cong_van_schemas.TraoDoiCongVanCreate):
    
    check_permission_trao_doi(db, cong_van, trao_doi.id_nguoi_tao)
    
    data_dict = trao_doi.__dict__
    data_dict["create_at"] = datetime.now()

    trao_doi = db_models.TraoDoiCongVan(**data_dict)
    return common_queries.add_and_commit(db, trao_doi)


def delete_trao_doi(db, trao_doi):
    return common_queries.delete(db, trao_doi)


#########################################################################


def select_list_cong_van_luu_tru(db, **kwargs):
    list_of_objs = common_queries.select_with_options(db, db_models.CongVanLuuTru, **kwargs)
    return list_of_objs


def get_cong_van_luu_tru_by_id(db, cong_van_id):
    cong_van = common_queries.query_filter(db, db_models.CongVanLuuTru, condition=(db_models.CongVanLuuTru.id == cong_van_id))
    if len(cong_van) >= 1:
        return cong_van[0]
    else:
        return None


def create_cong_van_luu_tru(db, cong_van_luu_tru_pydantic: cong_van_schemas.CongVanLuuTruCreate):

    now = datetime.now()
    data_dict = cong_van_luu_tru_pydantic.__dict__
    data_dict["create_at"] = now
    data_dict["update_at"] = now
    cong_van = db_models.CongVanLuuTru(**data_dict)
    return  common_queries.add_and_commit(db, cong_van)


def create_cvlt_from_cong_van(db, cong_van: db_models.CongVan):
    cong_van_last_version: db_models.CongVanVersion = cong_van.cong_van_current_version
    
    cvlt = db_models.CongVanLuuTru(
        ten_cong_van=cong_van_last_version.ten_cong_van,
        phong_ban_nhan=cong_van_last_version.phong_ban_nhan.name,
        nguoi_ky=cong_van_last_version.nguoi_ky.ho_ten,
        ngay_ky=cong_van_last_version.ngay_ky,
        phong_ban_phat_hanh=cong_van_last_version.phong_ban_phat_hanh.name,
        loai_cong_van=cong_van_last_version.loai_cong_van.name,
        noi_dung=cong_van_last_version.noi_dung,
        nguoi_xu_ly=cong_van_last_version.nguoi_xu_ly.ho_ten,
        
        ngay_hoan_tat=cong_van_last_version.ngay_hoan_tat,
        tinh_trang_xu_ly=cong_van_last_version.tinh_trang_xu_ly.name,
    
        ly_do=cong_van_last_version.ly_do,
        so_luong_van_ban=cong_van_last_version.so_luong_van_ban,
        muc_do_uu_tien = cong_van_last_version.muc_do_uu_tien.name,
    
        id_tep_dinh_kem=cong_van_last_version.id_tep_dinh_kem,
    
        nguoi_tao=cong_van_last_version.nguoi_tao.ho_ten,
        ngay_tao=cong_van_last_version.ngay_tao,
        
        create_at=cong_van.create_at,
        update_at=cong_van.update_at
    )
    
    return common_queries.add_and_commit(db, cvlt)
    
    

def update_cong_van_luu_tru(db, cong_van_luu_tru: db_models.CongVanLuuTru, cong_van_luu_tru_pydantic: cong_van_schemas.CongVanLuuTruUpdate = None):

    if cong_van_luu_tru_pydantic is not None:
        data_dict = cong_van_luu_tru_pydantic.__dict__
        data_dict = {k:  data_dict[k] for k in data_dict if data_dict[k] is not None}
        now = datetime.now()
        data_dict["update_at"] = now
        for k in data_dict:
            setattr(cong_van_luu_tru, k, data_dict[k])
    return  common_queries.add_and_commit(db, cong_van_luu_tru)



def delete_cong_van_luu_tru(db, cong_van_luu_tru):
    return common_queries.delete(db, cong_van_luu_tru)
