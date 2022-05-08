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
  
  
class PhongBan(Base):
    __tablename__ = 'phong_ban'
    id = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True)
    phong_ban = Column(String(128), nullable=False)
      
  
class ChucVu(Base):
    __tablename__ = 'chuc_vu'
    id = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True)
    chuc_vu = Column(String(128), nullable=False)
      
  
class HocVan(Base):
    __tablename__ = 'hoc_van'
    id = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True)
    hoc_van = Column(String(128), nullable=False)
      
  
class DanToc(Base):
    __tablename__ = 'dan_toc'
    id = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True)
    dan_toc = Column(String(128), nullable=False)
      
  
class QuocTich(Base):
    __tablename__ = 'quoc_tich'
    id = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True)
    quoc_tich = Column(String(128), nullable=False)
    

class TonGiao(Base):
    __tablename__ = 'ton_giao'
    id = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True)
    ton_giao = Column(String(128), nullable=False)
