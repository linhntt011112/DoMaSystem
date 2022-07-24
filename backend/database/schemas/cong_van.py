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
    nguoi_cap_nhat: nguoi_dung.UserShort
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
    


class CongVanVersionFull(BaseModel):
    id: int
    version_name: str = None
    ten_cong_van: str
    
    id_phong_ban_nhan: int
    phong_ban_nhan: static_tables.PhongBanFull
    
    id_nguoi_ky: int
    nguoi_ky: nguoi_dung.UserShort
    
    ngay_ky: Union[datetime.datetime, datetime.date] = None
    # ngay_hieu_luc: Union[datetime.datetime, datetime.date]
    # ngay_het_hieu_luc: Union[datetime.datetime, datetime.date] = None
    
    id_phong_ban_phat_hanh: int
    phong_ban_phat_hanh: static_tables.PhongBanFull
    
    # ngay_phat_hanh: Union[datetime.datetime, datetime.date]
    
    id_loai_cong_van: int 
    loai_cong_van: LoaiCongVanFull
    
    noi_dung: str
    
    id_nguoi_xu_ly: int 
    nguoi_xu_ly: nguoi_dung.UserShort
    ngay_hoan_tat: Union[datetime.datetime, datetime.date] = None
    
    id_nguoi_theo_doi: int = None
    nguoi_theo_doi: nguoi_dung.UserShort = None
    
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
    nguoi_tao: nguoi_dung.UserShort
    
    # id_nguoi_duyet: int
    # nguoi_duyet: nguoi_dung.UserShort
    
    ngay_tao: Union[datetime.datetime, datetime.date]
    
    thoi_gian_cap_nhat: Union[datetime.datetime, datetime.date]
    
    id_nguoi_cap_nhat: int
    nguoi_cap_nhat: nguoi_dung.UserShort
    noi_dung_thay_doi: str = None
    cong_van_id: int = None
    
    class Config:
        orm_mode = True
    
    

class CongVanVersionCreate(BaseModel):
    version_name: str = None
    ten_cong_van: str
    id_phong_ban_nhan: int
    
    id_nguoi_ky: int
    # ngay_ky: Union[datetime.datetime, datetime.date] = None
    
    id_phong_ban_phat_hanh: int
    # ngay_phat_hanh: Union[datetime.datetime, datetime.date]
    
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
    id_nguoi_tao: int = None
    
    ngay_tao: Union[datetime.datetime, datetime.date] = None
    
    thoi_gian_cap_nhat: Union[datetime.datetime, datetime.date] = None
    
    id_nguoi_cap_nhat: int = None
    # nguoi_cap_nhat: nguoi_dung.UserShort
    noi_dung_thay_doi: str = None
    cong_van_id: int = None



class CongVanVersionUpdate(BaseModel):
    pass
    
    
class CongVanVersionUpdateBT1(CongVanVersionUpdate):
    """Thay doi truoc khi duyet

    Args:
        BaseModel (_type_): _description_
    """
    version_name: str = None
    ten_cong_van: str = None
    id_phong_ban_nhan: int = None
    
    id_nguoi_ky: int = None
    # ngay_ky: Union[datetime.datetime, datetime.date] = None
    
    id_phong_ban_phat_hanh: int = None
    # ngay_phat_hanh: Union[datetime.datetime, datetime.date]
    
    id_loai_cong_van: int  = None
    
    noi_dung: str = None
    
    id_nguoi_xu_ly: int = None
    id_nguoi_theo_doi: int = None
    # id_tinh_trang_xu_ly: int 
    
    ly_do: str = None
    so_luong_van_ban: int = None
    
    # id_muc_do_bao_mat: int
    id_muc_do_uu_tien: int = None
    
    id_tep_dinh_kem: int = None
    # id_nguoi_tao: int = None
    
    # ngay_tao: Union[datetime.datetime, datetime.date] = None
    
    thoi_gian_cap_nhat: Union[datetime.datetime, datetime.date] = None
    
    id_nguoi_cap_nhat: int = None
    # nguoi_cap_nhat: nguoi_dung.UserShort
    noi_dung_thay_doi: str = None
    # cong_van_id: int = None
    
    
        
    
class CongVanVersion_TraoDoi(BaseModel):
    id_cong_van: int
    id_trao_doi: int
    
    
    
    
class CongVanFull(BaseModel):
    id: int 
    
    cong_van_current_version_id: int
    cong_van_current_version: CongVanVersionFull
    
    cong_van_versions: List[CongVanVersionFull]

    create_at: Union[datetime.datetime, datetime.date]
    update_at: Union[datetime.datetime, datetime.date]
    
    class Config:
        orm_mode = True
    

class CongVanCurrent(BaseModel):
    id: int 
    
    cong_van_current_version_id: int
    cong_van_current_version: CongVanVersionFull
    
    create_at: Union[datetime.datetime, datetime.date]
    update_at: Union[datetime.datetime, datetime.date]
    
    class Config:
        orm_mode = True


class CongVanCreate(BaseModel):   
    cong_van_current_version_id: int = None
    
    

###########################################################################

class CongVanLuuTruCreate(BaseModel):
    ten_cong_van: str = None
   
    phong_ban_nhan: str = None
   
    nguoi_ky: str = None
    ngay_ky: Union[datetime.datetime, datetime.date] = None
   
   
    phong_ban_phat_hanh: str = None
   
    loai_cong_van: str = None
   
    noi_dung: str = None
   
    nguoi_xu_ly: str = None
    
    ngay_hoan_tat: Union[datetime.datetime, datetime.date] = None
   
    nguoi_theo_doi: str = None
    tinh_trang_xu_ly: str = None
   
    ly_do: str =  None
    so_luong_van_ban: int  = None
   
    # id_muc_do_bao_mat = Column(Integer, ForeignKey('muc_do_bao_mat.id'), nullable=False)
    # muc_do_bao_mat = relationship("MucDoBaoMat", backref="cong_van", uselist=False)
   
    muc_do_uu_tien: str = None
   
   
    nguoi_tao: str = None

    ngay_tao: Union[datetime.datetime, datetime.date] = None
    
    

class CongVanLuuTruFull(CongVanLuuTruCreate):
    id: int
    
    id_tep_dinh_kem: int = None
    tep_dinh_kem: SaveFileFull = None
    create_at: Union[datetime.datetime, datetime.date]
    update_at: Union[datetime.datetime, datetime.date]
    
    class Config:
        orm_mode=True
        
        
        
class TraoDoiCongVanFull(BaseModel):
    id: int
    noi_dung: str
    id_cong_van: int
   
    id_nguoi_tao: int
    nguoi_tao: nguoi_dung.UserShort
    
    create_at: Union[datetime.datetime, datetime.date]
    
    class Config:
        orm_mode = True
    
    
class TraoDoiCongVanCreate(BaseModel):
    noi_dung: str
    id_cong_van: int = None
    id_nguoi_tao: int = None
    
    
    
    