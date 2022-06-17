# from fastapi import Depends, FastAPI, APIRouter, HTTPException, status, Form
# from pydantic import BaseModel
# from jose import JWTError, jwt
# from loguru import logger

# from database import db_models
# from database.common_queries import query_all, query_filter
# from database.db import get_db
# from database.crud import cong_van as crud_cong_van
# from database.schemas import cong_van as cong_van_schemas


# from .user import get_current_active_user
# from ..exceptions import api_exceptions


# router = APIRouter(prefix='/cong_van/trao_doi')


# # def authorize_user_for_loai_cong_van(user: db_models.NguoiDung, ai_model: db_models.AIModel):
# #     if user.id == ai_model.company.creator_id:
# #         return True
# #     else:
# #         return False
    

# # def _get_ai_model_by_id(db, ai_model_id) :
# #     ai_model: db_models.AIModel = crud_ai_model.get_ai_model_by_id(db, ai_model_id)
# #     if ai_model is None:
# #         raise exceptions.NOT_FOUND_EXCEPTION(f"Can not find ai_model_version with id={ai_model_id}")
    
# #     return ai_model


# @router.get("/loai_cong_van/list")
# async def get_list_users(limit: int=None, offset: int=None,
#                         order_by=None,
#     current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)):

#     try:
#         cac_loai_cong_van = crud_cong_van.select_list_loai_cong_van(db, limit=limit, offset=offset)
#         return [cong_van_schemas.LoaiCongVanFull.from_orm(loai_cong_van) for loai_cong_van in cac_loai_cong_van]
#     except Exception as e:
#         # db.rollback()
#         return api_exceptions.handle_simple_exception(e, logger)


# @router.post("/loai_cong_van/create")
# async def get_list_users(loai_cong_van: cong_van_schemas.LoaiCongVanCreate,
#     current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)):
#     if current_user.phan_quyen != db_models.PhanQuyen.admin:
#         raise api_exceptions.PERMISSION_EXCEPTION()
    
#     try:
#         loai_cong_van.id_nguoi_cap_nhat = current_user.id
#         new_loai_cong_van = crud_cong_van.create_loai_cong_van(db, loai_cong_van)
#         return cong_van_schemas.LoaiCongVanFull.from_orm(new_loai_cong_van)
#     except Exception as e:
#         # db.rollback()
#         return api_exceptions.handle_simple_exception(e, logger)



# @router.delete("/loai_cong_van/delete/{id}")
# async def delete_loai_cong_van(id: int,
#     current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)):
#     if current_user.phan_quyen != db_models.PhanQuyen.admin:
#         raise api_exceptions.PERMISSION_EXCEPTION()
    
#     try:
#         is_success =  crud_cong_van.delete_loai_cong_van_by_id(db, id)
#         if is_success:
#             return True
#         else:
#             raise api_exceptions.INTERNAL_SERVER_ERROR(f"Can not delete loai_cong_van with id={id}")
        
#     except Exception as e:
#         # db.rollback()
#         return api_exceptions.handle_simple_exception(e, logger)



# @router.get('/cvdi/list')
# async def get_list_cvdi(limit: int=None, offset: int=None,
#                         order_by=None,
#     current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)):

#     try:
#         cong_van_s = crud_cong_van.select_list_cong_van_di(db, limit=limit, offset=offset)
#         return [cong_van_schemas.CongVanDiFull.from_orm(cong_van) for cong_van in cong_van_s]
#     except Exception as e:
#         # db.rollback()
#         return api_exceptions.handle_simple_exception(e, logger)



# @router.post('/cvdi/create')
# async def create_cong_van(
#     cong_van_di: cong_van_schemas.CongVanDiCreate,
#     current_user: db_models.NguoiDung = Depends(get_current_active_user), db=Depends(get_db)
# ):
#     # if current_user.phan_quyen != db_models.PhanQuyen.admin:
#     #     raise exceptions.PERMISSION_EXCEPTION()
    
#     try:
#         cong_van_di.id_nguoi_tao = current_user.id
#         new_cong_van_di = crud_cong_van.create_cong_van_di(db, cong_van_di)
#         return cong_van_schemas.CongVanDiFull.from_orm(new_cong_van_di)
#     except Exception as e:
#         # db.rollback()
#         return api_exceptions.handle_simple_exception(e, logger)

