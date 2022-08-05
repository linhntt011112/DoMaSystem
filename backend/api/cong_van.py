from datetime import datetime
import traceback
from fastapi import Depends, FastAPI, APIRouter, File, UploadFile, Form
from fastapi.responses import FileResponse
from pydantic import BaseModel
from jose import JWTError, jwt
from loguru import logger
import os

from database import db_models
from database.common_queries import query_all, query_filter
from database.db import get_db
from database.crud import cong_van as crud_cong_van
from database.schemas import cong_van as cong_van_schemas
from .notification import cong_van_noti_push 


from config import server_config
from .user import get_current_active_user
from .core import file_utils, user as user_core
from exceptions import api_exceptions, db_exceptions


router = APIRouter(prefix='/cong_van')


def authorize_user_for_cong_van(user: db_models.NguoiDung, cong_van: db_models.CongVan):
    all_posible_user_ids = [
        cong_van.cong_van_current_version.id_nguoi_tao,
        cong_van.cong_van_current_version.id_nguoi_ky,
        cong_van.cong_van_current_version.id_nguoi_xu_ly,
        cong_van.cong_van_current_version.id_nguoi_theo_doi,
    ]
    if user.id not in all_posible_user_ids:
        raise api_exceptions.PERMISSION_EXCEPTION()

    return True
    

# def _get_ai_model_by_id(db, ai_model_id) :
#     ai_model: db_models.AIModel = crud_ai_model.get_ai_model_by_id(db, ai_model_id)
#     if ai_model is None:
#         raise exceptions.NOT_FOUND_EXCEPTION(f"Can not find ai_model_version with id={ai_model_id}")
    
#     return ai_model


async def create_location_and_save_tep_dinh_kem(data_file, db=Depends(get_db)):
    save_location = await file_utils.create_save_location(data_file.filename, base_save_dir=server_config.tep_dinh_kem_save_dir)  
    tep_dinh_kem = crud_cong_van.create_save_file(
        db, cong_van_schemas.SaveFileCreate(name=data_file.filename, save_location=save_location))
    
    await data_file.seek(0)
    await file_utils.save_file(data_file.file, save_location)
    
    return tep_dinh_kem, save_location


############################################################################################



# @router.get('/list')
# async def get_list_cong_van(limit: int=None, offset: int=None, order_by: str=None,
#                         id_loai_cong_van: int = None, 
#                         id_tinh_trang_xu_ly: int = None,
#                         id_muc_do_uu_tien: int = None,
#     current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)):
    
#     try:
#         cong_van_s = crud_cong_van.select_list_cong_van(db, limit, offset, order_by, id_loai_cong_van, id_tinh_trang_xu_ly, id_muc_do_uu_tien)
#         return [cong_van_schemas.CongVanFull.from_orm(cong_van) for cong_van in cong_van_s]
#     except Exception as e:

#         return api_exceptions.handle_simple_exception(e, logger)



@router.get('/cvdi/list/da_hoan_tat')
async def get_list_cong_van_di_da_hoan_tat(limit: int=None, offset: int=None, order_by: str=None,
                        id_loai_cong_van: int = None, 
                        id_muc_do_uu_tien: int = None,
    current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)):
    """ List ra các công văn đi đã được xử lý xong (id_tinh_trang_xu_ly = 3)"""
    
    try:
        id_tinh_trang_xu_ly = 3
        condition = (db_models.CongVanVersion.id_nguoi_tao == current_user.id) | (db_models.CongVanVersion.id_nguoi_ky == current_user.id)        
        cong_van_s = crud_cong_van.select_list_cong_van(db, limit, offset, order_by, id_loai_cong_van, id_tinh_trang_xu_ly, id_muc_do_uu_tien, condition=condition)
        return [cong_van_schemas.CongVanCurrent.from_orm(cong_van) for cong_van in cong_van_s]
    except Exception as e:

        return api_exceptions.handle_simple_exception(e, logger)
    
    

@router.get('/cvden/list/da_hoan_tat')
async def get_list_cong_van_den_da_hoan_tat(limit: int=None, offset: int=None, order_by: str=None,
                        id_loai_cong_van: int = None, 
                        id_muc_do_uu_tien: int = None,
    current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)):
    """ List ra các công văn đến đã xử lý xong (id_tinh_trang_xu_ly = 3)"""
    
    try:
        id_tinh_trang_xu_ly = 3
        condition = (db_models.CongVanVersion.id_nguoi_xu_ly == current_user.id)
        cong_van_s = crud_cong_van.select_list_cong_van(db, limit, offset, order_by, id_loai_cong_van, id_tinh_trang_xu_ly, id_muc_do_uu_tien, condition=condition)
        return [cong_van_schemas.CongVanCurrent.from_orm(cong_van) for cong_van in cong_van_s]
    except Exception as e:

        return api_exceptions.handle_simple_exception(e, logger)



@router.get('/list/cho_duyet')
async def get_list_cong_van(limit: int=None, offset: int=None, order_by: str=None,
                        id_loai_cong_van: int = None, 
                        id_muc_do_uu_tien: int = None,
    current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)):
    """ List ra các công văn được tạo bởi current_user mà đang chờ duyệt (id_tinh_trang_xu_ly = 1)"""
    
    try:
        id_tinh_trang_xu_ly = 1
        condition = (db_models.CongVanVersion.id_nguoi_tao == current_user.id)
        cong_van_s = crud_cong_van.select_list_cong_van(db, limit, offset, order_by, id_loai_cong_van, id_tinh_trang_xu_ly, id_muc_do_uu_tien, condition=condition)
        return [cong_van_schemas.CongVanCurrent.from_orm(cong_van) for cong_van in cong_van_s]
    except Exception as e:

        return api_exceptions.handle_simple_exception(e, logger)
    
    

@router.get('/list/chua_duyet')
async def get_list_cong_van(limit: int=None, offset: int=None, order_by: str=None,
                        id_loai_cong_van: int = None, 
                        id_muc_do_uu_tien: int = None,
    current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)):
    """ List ra các công văn đang chờ current_user duyệt (id_tinh_trang_xu_ly = 1)"""
    
    try:
        id_tinh_trang_xu_ly = 1
        condition = (db_models.CongVanVersion.id_nguoi_ky == current_user.id)
        cong_van_s = crud_cong_van.select_list_cong_van(db, limit, offset, order_by, id_loai_cong_van, id_tinh_trang_xu_ly, id_muc_do_uu_tien, condition=condition)
        return [cong_van_schemas.CongVanCurrent.from_orm(cong_van) for cong_van in cong_van_s]
    except Exception as e:

        return api_exceptions.handle_simple_exception(e, logger)
    
    
    
@router.get('/list/cho_xu_ly')
async def get_list_cong_van(limit: int=None, offset: int=None, order_by: str=None,
                        id_loai_cong_van: int = None, 
                        id_muc_do_uu_tien: int = None,
    current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)):
    """ List ra các công văn được tạo hoặc duyệt (ký) bởi current_user mà đang chờ xử lý (id_tinh_trang_xu_ly = 2)"""
    
    try:
        id_tinh_trang_xu_ly = 2
        condition = (db_models.CongVanVersion.id_nguoi_tao == current_user.id) | (db_models.CongVanVersion.id_nguoi_ky == current_user.id)
        cong_van_s = crud_cong_van.select_list_cong_van(db, limit, offset, order_by, id_loai_cong_van, id_tinh_trang_xu_ly, id_muc_do_uu_tien, condition=condition)
        return [cong_van_schemas.CongVanCurrent.from_orm(cong_van) for cong_van in cong_van_s]
    except Exception as e:

        return api_exceptions.handle_simple_exception(e, logger)
    
    

@router.get('/list/chua_xu_ly')
async def get_list_cong_van(limit: int=None, offset: int=None, order_by: str=None,
                        id_loai_cong_van: int = None, 
                        id_muc_do_uu_tien: int = None,
    current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)):
    """ List ra các công văn đang chờ current_user xử lý (id_tinh_trang_xu_ly = 2)"""
    
    try:
        id_tinh_trang_xu_ly = 2
        condition = (db_models.CongVanVersion.id_nguoi_xu_ly == current_user.id) 
        cong_van_s = crud_cong_van.select_list_cong_van(db, limit, offset, order_by, id_loai_cong_van, id_tinh_trang_xu_ly, id_muc_do_uu_tien, condition=condition)
        return [cong_van_schemas.CongVanCurrent.from_orm(cong_van) for cong_van in cong_van_s]
    except Exception as e:

        return api_exceptions.handle_simple_exception(e, logger)
    
    

@router.get('/list/dang_theo_doi')
async def get_list_cong_van(limit: int=None, offset: int=None, order_by: str=None,
                        id_loai_cong_van: int = None, 
                        id_muc_do_uu_tien: int = None,
    current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)):
    """ List ra các công văn current_user đang theo dõi mà chưa hoàn tất (id_tinh_trang_xu_ly != 3)"""
    
    try:
        id_tinh_trang_xu_ly = -3 # temporary
        condition = (db_models.CongVanVersion.id_nguoi_theo_doi == current_user.id) 
        cong_van_s = crud_cong_van.select_list_cong_van(db, limit, offset, order_by, id_loai_cong_van, id_tinh_trang_xu_ly, id_muc_do_uu_tien, condition=condition)
        return [cong_van_schemas.CongVanCurrent.from_orm(cong_van) for cong_van in cong_van_s]
    except Exception as e:

        return api_exceptions.handle_simple_exception(e, logger)



@router.get('/{id}')
async def get_cong_van_by_id(id: int,
    current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)):

    try:
        cong_van = crud_cong_van.get_cong_van_by_id(db, cong_van_id=id)
        authorize_user_for_cong_van(current_user, cong_van)
        if cong_van is None:
            raise api_exceptions.NOT_FOUND_EXCEPTION()
        return cong_van_schemas.CongVanFull.from_orm(cong_van)
    except Exception as e:
        return api_exceptions.handle_simple_exception(e, logger)



@router.post('/create')
async def create_cong_van_di(
    cong_van_version: cong_van_schemas.CongVanVersionCreate,
    current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)
):
    """some"""
    # if current_user.phan_quyen != db_models.PhanQuyen.admin:
    #     raise exceptions.PERMISSION_EXCEPTION()
    # logger.info(cong_van_version.__dict__)
    try:
        cong_van_version.id_nguoi_tao = current_user.id
        cong_van_version.id_nguoi_cap_nhat = current_user.id
        logger.info(cong_van_version.__dict__)
        new_cong_van = crud_cong_van.create_cong_van(db, cong_van_version)
        # logger.info(f"{new_cong_van.__dict__}")
        
        cong_van_noti_push.create_cong_van_notify(db, new_cong_van, current_user)
        return cong_van_schemas.CongVanFull.from_orm(new_cong_van)
    except Exception as e:
        return api_exceptions.handle_simple_exception(e, logger)
    
    

# @router.post('/cong_van/update')
# async def update_cong_van(
#     cong_van_version_pydantic: cong_van_schemas.CongVanVersionCreate,
#     current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)
# ):
    
#     try:
#         cong_van = crud_cong_van.get_cong_van_by_id(db, cong_van_version_pydantic.cong_van_id)
#         if cong_van is None:
#             raise api_exceptions.NOT_FOUND_EXCEPTION()
        
#         cong_van = crud_cong_van.update_cong_van(db, cong_van, cong_van_version_pydantic)
#         return cong_van_schemas.CongVanFull.from_orm(cong_van)
#     except Exception as e:

#         return api_exceptions.handle_simple_exception(e, logger)
    
    

@router.post('/{cong_van_id}/update/tep_dinh_kem')
async def update_cong_van__tep_dinh_kem(
    cong_van_id: int,
    tep_dinh_kem_input: UploadFile = File(...),
    current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)
):
    
    save_location = None
    tep_dinh_kem = None
    cong_van = None
    try:
        tep_dinh_kem, save_location = await create_location_and_save_tep_dinh_kem(tep_dinh_kem_input, db)
        cong_van: db_models.CongVan = crud_cong_van.get_cong_van_by_id(db, cong_van_id)
        if cong_van is None:
            raise api_exceptions.NOT_FOUND_EXCEPTION()
        
        cong_van.cong_van_current_version.id_tep_dinh_kem = tep_dinh_kem.id
        cong_van = crud_cong_van.update_cong_van(db, cong_van)
        # logger.info(f"{cong_van.tep_dinh_kem.__dict__}")
        return cong_van_schemas.CongVanFull.from_orm(cong_van)
    except Exception as e:
        if cong_van is not None:
            cong_van.cong_van_current_version.id_tep_dinh_kem = None
            cong_van = crud_cong_van.update_cong_van(db, cong_van)
        
        if tep_dinh_kem is not None:
            crud_cong_van.delete_save_file(db, tep_dinh_kem)
            
        return api_exceptions.handle_simple_exception(e, logger)
    
    
    
@router.put('/{cong_van_id}/update')
async def update_cong_van(
    cong_van_id: int,
    cong_van_version_pydantic: cong_van_schemas.CongVanVersionUpdateBT1,
    current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)
):
    
    try:
        cong_van: db_models.CongVan = crud_cong_van.get_cong_van_by_id(db, cong_van_id)
        if cong_van is None:
            raise api_exceptions.NOT_FOUND_EXCEPTION()
        elif cong_van.cong_van_current_version.id_nguoi_tao != current_user.id and cong_van.cong_van_current_version.id_nguoi_ky != current_user.id:
            # logger.info(f"{cong_van.cong_van_current_version.__dict__}")
            raise api_exceptions.PERMISSION_EXCEPTION()
        
        cong_van_version_pydantic.id_nguoi_cap_nhat = current_user.id
        cong_van = crud_cong_van.update_cong_van(db, cong_van, cong_van_version_pydantic)
        
        cong_van_noti_push.update_cong_van_notify(db, cong_van, current_user)
        return cong_van_schemas.CongVanFull.from_orm(cong_van)
    except Exception as e:

        return api_exceptions.handle_simple_exception(e, logger)
    


@router.put('/{cong_van_id}/update/duyet')
async def update_cong_van(
    cong_van_id: int,
    current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)
):
    
    try:
        cong_van: db_models.CongVan = crud_cong_van.get_cong_van_by_id(db, cong_van_id)
        if cong_van is None:
            raise api_exceptions.NOT_FOUND_EXCEPTION()
        elif cong_van.cong_van_current_version.id_nguoi_ky != current_user.id:
            raise api_exceptions.PERMISSION_EXCEPTION()
        
        cong_van.cong_van_current_version.id_tinh_trang_xu_ly = 2
        cong_van.cong_van_current_version.ngay_ky = datetime.now()
        cong_van.update_at = datetime.now()
        cong_van = crud_cong_van.update_cong_van(db, cong_van)
        
        cong_van_noti_push.duyet_cong_van_notify(db, cong_van, current_user)
        return cong_van_schemas.CongVanFull.from_orm(cong_van)
    except Exception as e:

        return api_exceptions.handle_simple_exception(e, logger)
    



@router.put('/{cong_van_id}/update/xu_ly')
async def update_cong_van(
    cong_van_id: int,
    current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)
):
    
    try:
        cong_van: db_models.CongVan = crud_cong_van.get_cong_van_by_id(db, cong_van_id)
        if cong_van is None:
            raise api_exceptions.NOT_FOUND_EXCEPTION()
        elif cong_van.cong_van_current_version.id_nguoi_xu_ly != current_user.id:
            raise api_exceptions.PERMISSION_EXCEPTION()
        
        cong_van.cong_van_current_version.id_tinh_trang_xu_ly = 3
        cong_van.cong_van_current_version.ngay_hoan_tat = datetime.now()
        cong_van.update_at = datetime.now()
        cong_van = crud_cong_van.update_cong_van(db, cong_van)
        
        cong_van_noti_push.xu_ly_cong_van_notify(db, cong_van, current_user)
        return cong_van_schemas.CongVanFull.from_orm(cong_van)
    except Exception as e:

        return api_exceptions.handle_simple_exception(e, logger)
    
    

@router.delete('/{id}/delete')
async def delete_cong_van(
    id: int,
    # cong_van: cong_van_schemas.CongVanCreate,
    current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)
):
    cong_van: db_models.CongVan = crud_cong_van.get_cong_van_by_id(db, id)
    # logger.info(f"{cong_van.__dict__}")
    if cong_van is None:
        raise api_exceptions.NOT_FOUND_EXCEPTION()
    
    try:
        if cong_van.cong_van_current_version.id_tinh_trang_xu_ly == 1 and \
            (current_user.id != cong_van.cong_van_current_version.id_nguoi_tao and current_user.id != cong_van.cong_van_current_version.id_nguoi_ky):
            raise api_exceptions.PERMISSION_EXCEPTION()
        
        if cong_van.cong_van_current_version.id_tinh_trang_xu_ly > 1 and current_user.phan_quyen != db_models.PhanQuyen.admin:
            raise api_exceptions.PERMISSION_EXCEPTION()
        return crud_cong_van.delete_cong_van(db, cong_van)
    except Exception as e:

        return api_exceptions.handle_simple_exception(e, logger)
    

#################################################################### 
@router.get("/{cong_van_id}/trao_doi/list")
async def get_list_cong_van_luu_tru(
    cong_van_id: int, limit: int=None, offset: int=None, order_by=None,
    current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)):

    try:
        cac_trao_doi = crud_cong_van.select_list_trao_doi_by_cong_van_id(db, cong_van_id, limit=limit, offset=offset)
        return [cong_van_schemas.TraoDoiCongVanFull.from_orm(trao_doi) for trao_doi in cac_trao_doi]
    except Exception as e:
        return api_exceptions.handle_simple_exception(e, logger)
    

@router.post('/{cong_van_id}/trao_doi/create')
async def create_trao_doi(cong_van_id: int, trao_doi_pydantic: cong_van_schemas.TraoDoiCongVanCreate,
                          current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)
                          ):
    cong_van: db_models.CongVan = crud_cong_van.get_cong_van_by_id(db, cong_van_id)
    if cong_van is None:
        raise api_exceptions.NOT_FOUND_EXCEPTION(f"Can not find cong_van with id={cong_van_id}")
    elif cong_van.cong_van_current_version.id_tinh_trang_xu_ly == 3:
        raise api_exceptions.UNPROCESSABLE_ENTITY(f"Can not post comment on processed document!")
    
    try:
        trao_doi_pydantic.id_nguoi_tao = current_user.id
        trao_doi_pydantic.id_cong_van = cong_van_id
        trao_doi = crud_cong_van.create_trao_doi(db, cong_van, trao_doi=trao_doi_pydantic)
        
        cong_van_noti_push.add_trao_doi_cong_van_notify(db, cong_van, current_user)
        return cong_van_schemas.TraoDoiCongVanFull.from_orm(trao_doi)
    except db_exceptions.PermissionException as e:
        raise api_exceptions.PERMISSION_EXCEPTION()
    except Exception as e:
        return api_exceptions.handle_simple_exception(e, logger)
    
    
#################################################################### 

@router.get("/luu_tru/list")
async def get_list_cong_van_luu_tru(limit: int=None, offset: int=None,
                        order_by=None,
    current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)):

    try:
        cac_cong_van_luu_tru = crud_cong_van.select_list_cong_van_luu_tru(db, limit=limit, offset=offset)
        return [cong_van_schemas.CongVanLuuTruFull.from_orm(cong_van_luu_tru) for cong_van_luu_tru in cac_cong_van_luu_tru]
    except Exception as e:

        return api_exceptions.handle_simple_exception(e, logger)


@router.get('/luu_tru/{cong_van_luu_tru_id}')
async def get_cong_van_luu_tru_by_id(
    cong_van_luu_tru_id: int,
    current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)
):
    if current_user.phan_quyen != "admin":
        raise api_exceptions.PERMISSION_EXCEPTION()
    try:
        cong_van = crud_cong_van.get_cong_van_luu_tru_by_id(db, cong_van_id=cong_van_luu_tru_id)
        # authorize_user_for_cong_van(current_user, cong_van)
        if cong_van is None:
            raise api_exceptions.NOT_FOUND_EXCEPTION()
        return cong_van_schemas.CongVanLuuTruFull.from_orm(cong_van)
    except Exception as e:
        return api_exceptions.handle_simple_exception(e, logger)



@router.post('/luu_tru/create')
async def create_cong_van_luu_tru(
    cong_van_luu_tru_pydantic: cong_van_schemas.CongVanLuuTruCreate,
    current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)
):
    # if current_user.phan_quyen != db_models.PhanQuyen.admin:
    #     raise exceptions.PERMISSION_EXCEPTION()
    
    try:
        new_cong_van = crud_cong_van.create_cong_van_luu_tru(db, cong_van_luu_tru_pydantic)
        # logger.info(f"{new_cong_van.__dict__}")
        return cong_van_schemas.CongVanLuuTruFull.from_orm(new_cong_van)
    except Exception as e:
        return api_exceptions.handle_simple_exception(e, logger)
    
    
    
@router.post('/luu_tru/{cong_van_luu_tru_id}/update/tep_dinh_kem')
async def update_cong_van_luu_tru__tep_dinh_kem(
    cong_van_luu_tru_id: int,
    tep_dinh_kem_input: UploadFile = File(...),
    current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)
):
    
    save_location = None
    tep_dinh_kem = None
    cong_van = None
    old_id_tep_dinh_kem = None
    try:
        tep_dinh_kem, save_location = await create_location_and_save_tep_dinh_kem(tep_dinh_kem_input, db)
        cong_van: db_models.CongVanLuuTru = crud_cong_van.get_cong_van_luu_tru_by_id(db, cong_van_luu_tru_id)
        if cong_van is None:
            raise api_exceptions.NOT_FOUND_EXCEPTION()
        
        old_id_tep_dinh_kem = cong_van.id_tep_dinh_kem
        cong_van.id_tep_dinh_kem = tep_dinh_kem.id
        cong_van = crud_cong_van.update_cong_van_luu_tru(db, cong_van)
        # logger.info(f"{cong_van.tep_dinh_kem.__dict__}")
        return cong_van_schemas.CongVanLuuTruFull.from_orm(cong_van)
    except Exception as e:
        if cong_van is not None:
            cong_van.id_tep_dinh_kem = old_id_tep_dinh_kem
            cong_van = crud_cong_van.update_cong_van_luu_tru(db, cong_van)
        
        if tep_dinh_kem is not None:
            crud_cong_van.delete_save_file(db, tep_dinh_kem)
            
        return api_exceptions.handle_simple_exception(e, logger)
    
    

@router.delete('/luu_tru/{cong_van_luu_tru_id}/delete')
async def delete_cong_van_luu_tru(
    cong_van_luu_tru_id: int,
    # cong_van: cong_van_schemas.CongVanCreate,
    current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)
):
    if  current_user.phan_quyen != db_models.PhanQuyen.admin:
            raise api_exceptions.PERMISSION_EXCEPTION()
        
    cong_van: db_models.CongVan = crud_cong_van.get_cong_van_luu_tru_by_id(db, cong_van_luu_tru_id)
    # logger.info(f"{cong_van.__dict__}")
    if cong_van is None:
        raise api_exceptions.NOT_FOUND_EXCEPTION()
    
    try:
        return crud_cong_van.delete_cong_van_luu_tru(db, cong_van)
    except Exception as e:

        return api_exceptions.handle_simple_exception(e, logger)
    

@router.get("/luu_tru/{cong_van_id}/download/tep_dinh_kem")
async def download_tep_dinh_kem(
                        cong_van_id: int,
                        user=Depends(user_core.get_user_of_download_token),
                        db=Depends(get_db)):
    cong_van_luu_tru: db_models.CongVanLuuTru = crud_cong_van.get_cong_van_luu_tru_by_id(db, cong_van_id)
    
    # is_authorized = authorize_user_for_ai_model_version(user, ai_model_version)
    is_authorized = True
    if is_authorized:
        try:
            file_path = os.path.join(cong_van_luu_tru.tep_dinh_kem.save_location)
            if os.path.isfile(file_path):
                return FileResponse(file_path, filename=cong_van_luu_tru.tep_dinh_kem.name)
            else:
                return None

        except Exception as e:
            logger.error(f'{str(e)}: {traceback.format_exc()}')
            raise api_exceptions.INTERNAL_SERVER_ERROR(str(e))
    else:
        raise api_exceptions.PERMISSION_EXCEPTION()
