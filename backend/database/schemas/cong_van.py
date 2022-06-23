import datetime

from typing import List, Optional, Union
from pydantic import BaseModel

from . import nguoi_dung
from . import static_tables



class SaveFileFull(BaseModel):
    id: int
    name: str
    # save_location: str
    url: str = None

    upload_at: datetime.datetime
    
    class Config:
        orm_mode = True
    
    
class SaveFileCreate(BaseModel):
    name: str
    save_location: str
    url: str = None

    upload_at: datetime.datetime = None
    


class LoaiCongVanFull(BaseModel):
    id: int
    ma_loai: str
    
    name: str
    trang_thai: str
    
    id_nguoi_cap_nhat: int
    nguoi_cap_nhat: nguoi_dung.UserBase
    thoi_gian_cap_nhat: datetime.datetime
    
    mo_ta: str = None
    
    class Config:
        orm_mode=True
    
    

class LoaiCongVanCreate(BaseModel):
    ma_loai: str
    name: str
    trang_thai: str
    
    id_nguoi_cap_nhat: int = None
    mo_ta: str = None
    
    class Config:
        orm_mode=True
    


class LoaiCongVanUpdate(BaseModel):
    id: int
    ma_loai: str = None
    
    name: str = None
    trang_thai: str = None
    id_nguoi_cap_nhat: int = None
    
    mo_ta: str = None
    
    
    
########################################################################

class CongVanListInput(BaseModel):
    limit: int = None
    offset: int = None
    order_by: str = None
    
    id_loai_cong_van: int = None
    id_tinh_trang_xu_ly: int = None
    id_muc_do_uu_tien: int = None
    


class CongVanDiVersionFull(BaseModel):
    id: int
    version_name: str = None
    ten_cong_van: str
    id_phong_ban_nhan: int
    phong_ban_nhan: static_tables.PhongBanFull
    
    id_nguoi_ky: int
    nguoi_ky: nguoi_dung.UserBase
    
    ngay_ky: Union[datetime.datetime, datetime.date] = None
    ngay_hieu_luc: Union[datetime.datetime, datetime.date]
    ngay_het_hieu_luc: Union[datetime.datetime, datetime.date] = None
    
    id_phong_ban_phat_hanh: int
    phong_ban_phat_hanh: static_tables.PhongBanFull
    
    ngay_phat_hanh: Union[datetime.datetime, datetime.date]
    
    id_loai_cong_van: int 
    loai_cong_van: LoaiCongVanFull
    
    trich_yeu_noi_dung: str = None
    noi_dung: str
    
    id_nguoi_xu_ly: int 
    nguoi_xu_ly: nguoi_dung.UserBase
    id_nguoi_theo_doi: int = None
    nguoi_theo_doi: nguoi_dung.UserBase = None
    
    id_tinh_trang_xu_ly: int 
    tinh_trang_xu_ly: static_tables.TinhTrangXuLyFull
    
    ly_do: str = None
    so_luong_van_ban: int
    
    # id_muc_do_bao_mat: int
    id_muc_do_uu_tien: int
    muc_do_uu_tien: static_tables.MucDoUuTienFull
    
    id_tep_dinh_kem: int = None
    tep_dinh_kem: SaveFileFull = None
    
    id_nguoi_tao: int 
    nguoi_tao: nguoi_dung.UserBase
    
    id_nguoi_duyet: int
    nguoi_duyet: nguoi_dung.UserBase
    
    ngay_tao: Union[datetime.datetime, datetime.date]
    ngay_duyet: Union[datetime.datetime, datetime.date] = None
    
    noi_dung_thay_doi: str = None
    cong_van_di_id: int
    
    class Config:
        orm_mode = True
    
    

class CongVanDiVersionCreate(BaseModel):
    version_name: str = None
    ten_cong_van: str
    id_phong_ban_nhan: int
    
    id_nguoi_ky: int
    ngay_ky: Union[datetime.datetime, datetime.date] = None
    ngay_hieu_luc: Union[datetime.datetime, datetime.date]
    ngay_het_hieu_luc: Union[datetime.datetime, datetime.date] = None
    
    id_phong_ban_phat_hanh: int
    ngay_phat_hanh: Union[datetime.datetime, datetime.date]
    
    id_loai_cong_van: int 
    
    noi_dung: str
    
    id_nguoi_xu_ly: int 
    id_nguoi_theo_doi: int = None
    id_tinh_trang_xu_ly: int 
    
    ly_do: str = None
    so_luong_van_ban: int
    
    # id_muc_do_bao_mat: int
    id_muc_do_uu_tien: int
    
    # id_tep_dinh_kem: int = None
    id_nguoi_tao: int 
    id_nguoi_duyet: int
    
    ngay_tao: Union[datetime.datetime, datetime.date]
    ngay_duyet: Union[datetime.datetime, datetime.date] = None
    
    noi_dung_thay_doi: str = None
    cong_van_di_id: int = None

    
    
    
class CongVanDiVersionUpdate(BaseModel):
    id: int
    version_name: str = None
    ten_cong_van: str
    id_phong_ban_nhan: int
    
    id_nguoi_ky: int
    
    ngay_ky: Union[datetime.datetime, datetime.date] = None
    ngay_hieu_luc: Union[datetime.datetime, datetime.date]
    ngay_het_hieu_luc: Union[datetime.datetime, datetime.date] = None
    
    id_phong_ban_phat_hanh: int
    
    ngay_phat_hanh: Union[datetime.datetime, datetime.date]
    
    id_loai_cong_van: int 
    
    trich_yeu_noi_dung: str = None
    noi_dung: str
    
    id_nguoi_xu_ly: int 
    id_nguoi_theo_doi: int = None
    
    id_tinh_trang_xu_ly: int 
    
    ly_do: str = None
    so_luong_van_ban: int
    
    id_muc_do_uu_tien: int
    
    id_tep_dinh_kem: int = None
    
    id_nguoi_tao: int 
    
    id_nguoi_duyet: int
    
    ngay_tao: Union[datetime.datetime, datetime.date]
    ngay_duyet: Union[datetime.datetime, datetime.date] = None

        
    
class CongVanDiVersion_TraoDoi(BaseModel):
    id_cong_van_di: int
    id_trao_doi: int
    
    
    
    
class CongVanDiFull(BaseModel):
    id: int 
    
    cong_van_di_current_version_id: int
    cong_van_di_current_version: CongVanDiVersionFull
    
    cong_van_di_versions: List[CongVanDiVersionFull]
    
    class Config:
        orm_mode = True
    

class CongVanDiCurrent(BaseModel):
    id: int 
    
    cong_van_di_current_version_id: int
    cong_van_di_current_version: CongVanDiVersionFull
    class Config:
        orm_mode = True


class CongVanDiCreate(BaseModel):   
    cong_van_di_current_version_id: int = None
    
    