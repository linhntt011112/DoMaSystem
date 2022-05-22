import datetime

from typing import Optional, Union
from pydantic import BaseModel

from database.db_models import PhanQuyen, GioiTinh
from . import static_tables


class UserBase(BaseModel):
    id: int
    ho_ten: str
    ten_tai_khoan: str
    # password: str
    # password_salt: str
    ngay_sinh: Union[datetime.datetime, datetime.date] = None
    dia_chi: str = None
    ngay_cap_nhat: Union[datetime.datetime, datetime.date]
    ngay_vao_lam: Union[datetime.datetime, datetime.date] = None
    dien_thoai: str = None
    email: str = None

    phan_quyen: PhanQuyen.type 
    gioi_tinh: GioiTinh.type = None

    cccd: str
    ngay_cap: Union[datetime.datetime, datetime.date] = None
    noi_cap: str = None
    que_quan: str = None

    tk_ngan_hang: str = None
    ngan_hang: str = None

    phong_ban: static_tables.PhongBanFull = None
    chuc_vu: static_tables.ChucVuFull = None
    hoc_van: static_tables.HocVanFull = None
    dan_toc: static_tables.DanTocFull = None
    quoc_tich: static_tables.QuocTichFull = None
    ton_giao: static_tables.TonGiaoFull = None
    
    class Config:
        orm_mode = True
        

class UserBaseFirstTime(UserBase):
    plain_password: str = None


class UserCreate(BaseModel):
    ho_ten: str
    ten_tai_khoan: str
    password: str = None
    # password_salt: str
    ngay_sinh: Union[datetime.datetime, datetime.date]
    dia_chi: str = None
    # ngay_cap_nhat: Union[datetime.datetime, datetime.date]
    ngay_vao_lam: Union[datetime.datetime, datetime.date]
    dien_thoai: str = None
    email: str = None

    phan_quyen: PhanQuyen.type 
    gioi_tinh: GioiTinh.type

    cccd: str
    ngay_cap: Union[datetime.datetime, datetime.date] = None
    noi_cap: str = None
    que_quan: str = None

    tk_ngan_hang: str = None
    ngan_hang: str = None

    id_phong_ban: int = None
    id_chuc_vu: int = None
    id_hoc_van: int = None
    id_dan_toc: int = None
    id_quoc_tich: int = None
    id_ton_giao: int = None
    
    
class UserUpdateInfo(BaseModel):
    id: int
    dia_chi: str = None
    ngay_vao_lam: Union[datetime.datetime, datetime.date] = None
    dien_thoai: str = None
    email: str = None

    phan_quyen: PhanQuyen.type 
    # gioi_tinh: GioiTinh.type


    ngay_cap: Union[datetime.datetime, datetime.date] = None
    noi_cap: str = None
    que_quan: str = None

    tk_ngan_hang: str = None
    ngan_hang: str = None


    id_hoc_van: int = None
    id_dan_toc: int = None
    id_quoc_tich: int = None
    id_ton_giao: int = None


class UserUpdatePassword(BaseModel):
    current_plain_password: str 
    new_plain_password: str
    
