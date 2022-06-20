from sqlalchemy import Column, DateTime, Integer, String, Boolean, Date
from sqlalchemy import ForeignKey, Sequence

from .base import Base


class GioiTinh:
    type = str
    nam = "Nam"
    nu = "Nu"
    
    def verify(gioi_tinh):
        if gioi_tinh in {"Nam", "Nu"}:
            return True
        
        return False
    

class PhanQuyen:
    type = str
    admin = "admin"
    user = "user"
    
    @staticmethod
    def verify(phan_quyen):
        if phan_quyen in {"admin", "user"}:
            return True
        
        return False
    
    
class NotificationStatus:
    type = int
    unread = 0
    read = 1
    
    @staticmethod
    def verify(status):
        if status in {0, 1}:
            return True
        
        return False
    

class TrangThaiLoaiCongVan:
    type = str
    hoat_dong = "hoat_dong"
    khong_hoat_dong = "khong_hoat_dong"
    
    @staticmethod
    def verify(trang_thai_cong_van):
        if trang_thai_cong_van in {TrangThaiLoaiCongVan.hoat_dong, TrangThaiLoaiCongVan.khong_hoat_dong}:
            return True
        
        return False
    

class StaticTable:
    __tablename__ = 'static_table'
    id = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True)
    name = Column(String(128), nullable=False)
    
    update_at = Column(DateTime, nullable=True)
  
  
class PhongBan(Base, StaticTable):
    __tablename__ = 'phong_ban'
    pass
      
  
class ChucVu(Base, StaticTable):
    __tablename__ = 'chuc_vu'
    pass
      
  
class HocVan(Base, StaticTable):
    __tablename__ = 'hoc_van'
    pass
      
  
class DanToc(Base, StaticTable):
    __tablename__ = 'dan_toc'
    pass
      
  
class QuocTich(Base, StaticTable):
    __tablename__ = 'quoc_tich'
    pass
    

class TonGiao(Base, StaticTable):
    __tablename__ = 'ton_giao'
    pass


class TinhTrangXuLy(Base, StaticTable):
    __tablename__ = 'tinh_trang_xu_ly'
    pass
    
    
# class MucDoBaoMat(Base, StaticTable):
#     __tablename__ = 'muc_do_bao_mat'
#     pass
    

class MucDoUuTien(Base, StaticTable):
    __tablename__ = 'muc_do_uu_tien'
    pass
    
