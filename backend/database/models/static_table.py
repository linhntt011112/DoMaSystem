from sqlalchemy import Column, Integer, String, Boolean, Date
from sqlalchemy import ForeignKey, Sequence

from .base import Base


class GioiTinh:
    type = bool
    nam = True
    nu = False
    

class PhanQuyen:
    type = bool
    admin = True
    user = False
    

class TrangThaiLoaiCongVan:
    type = bool
    hoat_dong = True
    khong_hoat_dong = False
  
  
class PhongBan(Base):
    __tablename__ = 'phong_ban'
    id = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True)
    phong_ban = Column(String(50), nullable=False)
      
  
class ChucVu(Base):
    __tablename__ = 'chuc_vu'
    id = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True)
    chuc_vu = Column(String(50), nullable=False)
      
  
class HocVan(Base):
    __tablename__ = 'hoc_van'
    id = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True)
    hoc_van = Column(String(50), nullable=False)
      
  
class DanToc(Base):
    __tablename__ = 'dan_toc'
    id = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True)
    dan_toc = Column(String(50), nullable=False)
      
  
class QuocTich(Base):
    __tablename__ = 'quoc_tich'
    id = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True)
    quoc_tich = Column(String(50), nullable=False)
    

class TonGiao(Base):
    __tablename__ = 'ton_giao'
    id = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True)
    ton_giao = Column(String(50), nullable=False)
