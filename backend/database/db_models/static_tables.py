from sqlalchemy import Column, Integer, String, Boolean, Date
from sqlalchemy import ForeignKey, Sequence

from .base import Base


class GioiTinh:
    type = str
    nam = "Nam"
    nu = "Nu"
    

class PhanQuyen:
    type = str
    admin = "admin"
    user = "user"
    

class TrangThaiLoaiCongVan:
    type = str
    hoat_dong = "hoat_dong"
    khong_hoat_dong = "khong_hoat_dong"
    

class StaticTable:
    __tablename__ = 'static_table'
    id = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True)
    name = Column(String(128), nullable=False)
  
  
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
