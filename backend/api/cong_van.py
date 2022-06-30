from fastapi import Depends, FastAPI, APIRouter, File, UploadFile, Form
from pydantic import BaseModel
from jose import JWTError, jwt
from loguru import logger

from database import db_models
from database.common_queries import query_all, query_filter
from database.db import get_db
from database.crud import cong_van as crud_cong_van
from database.schemas import cong_van as cong_van_schemas


from config import server_config
from .user import get_current_active_user
from .core import file_utils
from exceptions import api_exceptions


router = APIRouter(prefix='/cong_van')


# def authorize_user_for_loai_cong_van(user: db_models.NguoiDung, ai_model: db_models.AIModel):
#     if user.id == ai_model.company.creator_id:
#         return True
#     else:
#         return False
    

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


@router.get("/loai_cong_van/list")
async def get_list_loai_cong_van(limit: int=None, offset: int=None,
                        order_by=None,
    current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)):

    try:
        cac_loai_cong_van = crud_cong_van.select_list_loai_cong_van(db, limit=limit, offset=offset)
        return [cong_van_schemas.LoaiCongVanFull.from_orm(loai_cong_van) for loai_cong_van in cac_loai_cong_van]
    except Exception as e:

        return api_exceptions.handle_simple_exception(e, logger)


@router.post("/loai_cong_van/create")
async def create_loai_cong_van(loai_cong_van: cong_van_schemas.LoaiCongVanCreate,
    current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)):
    if current_user.phan_quyen != db_models.PhanQuyen.admin:
        raise api_exceptions.PERMISSION_EXCEPTION()
    
    try:
        loai_cong_van.id_nguoi_cap_nhat = current_user.id
        new_loai_cong_van = crud_cong_van.create_loai_cong_van(db, loai_cong_van)
        return cong_van_schemas.LoaiCongVanFull.from_orm(new_loai_cong_van)
    except Exception as e:

        return api_exceptions.handle_simple_exception(e, logger)
    
    

@router.put("/loai_cong_van/update")
async def get_list_users(loai_cong_van_pydantic: cong_van_schemas.LoaiCongVanUpdate,
    current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)):
    if current_user.phan_quyen != db_models.PhanQuyen.admin:
        raise api_exceptions.PERMISSION_EXCEPTION()

    
    try:
        loai_cong_van = crud_cong_van.get_loai_cong_van_by_id(db, loai_cong_van_pydantic.id)
        if loai_cong_van is None:
            raise api_exceptions.NOT_FOUND_EXCEPTION()
        
        loai_cong_van.id_nguoi_cap_nhat = current_user.id
        loai_cong_van = crud_cong_van.update_loai_cong_van(db, loai_cong_van, loai_cong_van_pydantic)
        
        return cong_van_schemas.LoaiCongVanFull.from_orm(loai_cong_van)
    except Exception as e:

        return api_exceptions.handle_simple_exception(e, logger)



@router.delete("/loai_cong_van/delete/{id}")
async def delete_loai_cong_van(id: int,
    current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)):
    if current_user.phan_quyen != db_models.PhanQuyen.admin:
        raise api_exceptions.PERMISSION_EXCEPTION()
    
    try:
        is_success =  crud_cong_van.delete_loai_cong_van_by_id(db, id)
        if is_success:
            return True
        else:
            raise api_exceptions.INTERNAL_SERVER_ERROR(f"Can not delete loai_cong_van with id={id}")
        
    except Exception as e:

        return api_exceptions.handle_simple_exception(e, logger)



@router.get('/cong_van/list')
async def get_list_cong_van(limit: int=None, offset: int=None, order_by: str=None,
                        id_loai_cong_van: int = None, 
                        id_tinh_trang_xu_ly: int = None,
                        id_muc_do_uu_tien: int = None,
    current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)):
    
    try:
        cong_van_s = crud_cong_van.select_list_cong_van(db, limit, offset, order_by, id_loai_cong_van, id_tinh_trang_xu_ly, id_muc_do_uu_tien)
        return [cong_van_schemas.CongVanFull.from_orm(cong_van) for cong_van in cong_van_s]
    except Exception as e:

        return api_exceptions.handle_simple_exception(e, logger)
    


@router.get('/cong_van/{id}')
async def get_list_cong_van(id: int,
    current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)):

    try:
        cong_van = crud_cong_van.get_cong_van_by_id(db, cong_van_id=id)
        if cong_van is None:
            raise api_exceptions.NOT_FOUND_EXCEPTION()
        return cong_van_schemas.CongVanFull.from_orm(cong_van)
    except Exception as e:

        return api_exceptions.handle_simple_exception(e, logger)



@router.post('/cong_van/create')
async def create_cong_van(
    cong_van_version: cong_van_schemas.CongVanVersionCreate,
    current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)
):
    # if current_user.phan_quyen != db_models.PhanQuyen.admin:
    #     raise exceptions.PERMISSION_EXCEPTION()
    
    try:
        cong_van_version.id_nguoi_tao = current_user.id
        new_cong_van = crud_cong_van.create_cong_van(db, cong_van_version)
        logger.info(f"{new_cong_van.__dict__}")
        return cong_van_schemas.CongVanFull.from_orm(new_cong_van)
    except Exception as e:
        return api_exceptions.handle_simple_exception(e, logger)
    
    

@router.post('/cong_van/update')
async def update_cong_van(
    cong_van_version_pydantic: cong_van_schemas.CongVanVersionCreate,
    current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)
):
    
    try:
        cong_van = crud_cong_van.get_cong_van_by_id(db, cong_van_version_pydantic.cong_van_id)
        if cong_van is None:
            raise api_exceptions.NOT_FOUND_EXCEPTION()
        
        cong_van = crud_cong_van.update_cong_van(db, cong_van, cong_van_version_pydantic)
        return cong_van_schemas.CongVanFull.from_orm(cong_van)
    except Exception as e:

        return api_exceptions.handle_simple_exception(e, logger)
    
    

@router.post('/cong_van/update/tep_dinh_kem')
async def update_cong_van__tep_dinh_kem(
    cong_van_id: int = Form(...),
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
    
    

@router.delete('/cong_van/delete/{id}')
async def delete_cong_van(
    id: int,
    # cong_van: cong_van_schemas.CongVanCreate,
    current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)
):
    if current_user.phan_quyen != db_models.PhanQuyen.admin:
        raise api_exceptions.PERMISSION_EXCEPTION()
    
    cong_van = crud_cong_van.get_cong_van_by_id(db, cong_van_id=id)
    # logger.info(f"{cong_van.__dict__}")
    if cong_van is None:
        raise api_exceptions.NOT_FOUND_EXCEPTION()
    
    try:
        return crud_cong_van.delete_cong_van(db, cong_van)
    except Exception as e:

        return api_exceptions.handle_simple_exception(e, logger)

