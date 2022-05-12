import datetime

from typing import Optional, Union
from pydantic import BaseModel

from database.db_models import PhanQuyen, GioiTinh
from . import static_tables


class UserBase(BaseModel):
    id: int
    ho_ten: str
    ten_tai_khoan: str
    password: str
    password_salt: str
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

    tk_ngan_hang: str
    ngan_hang: str = None

    phong_ban: static_tables.PhongBanFull = None
    chuc_vu: static_tables.ChucVuFull = None
    hoc_van: static_tables.HocVanFull = None
    dan_toc: static_tables.DanTocFull = None
    quoc_tich: static_tables.QuocTichFull = None
    ton_giao: static_tables.TonGiaoFull = None
    
    class Config:
        orm_mode = True


class UserCreate(BaseModel):
    ho_ten: str
    ten_tai_khoan: str
    password: Optional[str] = None
    ngay_sinh: Union[datetime.datetime, datetime.date] = None
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

    tk_ngan_hang: str
    ngan_hang: str = None

    phong_ban: str = None
    chuc_vu: str = None
    hoc_van: str = None
    dan_toc: str = None
    quoc_tich: str = None
    ton_giao: str = None