from ast import In
from sqlalchemy import Table, Column, Integer, String, Boolean, Date, DateTime
from sqlalchemy import ForeignKey, Sequence
from sqlalchemy.orm import relationship

from .base import Base, SaveFile
from .nguoi_dung import NguoiDung


# class AssociationNguoiKiCongVan(Base):
#     __tablename__ = 'nguoi_ki_cong_van'
#     ma_nguoi_dung = Column('ma_nguoi_dung', ForeignKey('nguoi_dung.ma_nguoi_dung'), primary_key=True)
#     ma_loai_cong_van = Column('ma_loai_cong_van', ForeignKey('loai_cong_van.ma_loai'), primary_key=True)
#     nguoi_ki = relationship("NguoiDung")
#     loai_cong_van = relationship("LoaiCongVan", back_populates="nguoi_ki_s")


# class LoaiCongVan(Base):
#     __tablename__ = 'loai_cong_van'
#     ma_loai = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True)
#     loai_cong_van = Column(String(50), nullable=False)
#     trang_thai = Column(String(10), nullable=False)
#     ngay_cap_nhat = Column(Date, nullable=False)
#     mo_ta = Column(String(200), nullable=True)
    
#     ma_nguoi_cap_nhat = Column(Integer, ForeignKey("nguoi_dung.ma_nguoi_dung"), nullable=False)
#     nguoi_cap_nhat = relationship('NguoiDung')
    
#     nguoi_ki_s = relationship('AssociationNguoiKiCongVan', back_populates="loai_cong_van")
    
#     def as_dict(self):
#         secrets = set(['nguoi_cap_nhat', 'nguoi_ki_s'])
#         res = {c.name: getattr(self, c.name) for c in self.__table__.columns if c.name not in secrets}
#         res['nguoi_cap_nhat'] = self.nguoi_cap_nhat.ho_ten
#         res['nguoi_ki'] = [nguoi_ki.nguoi_ki.ho_ten for nguoi_ki in self.nguoi_ki_s]
#         return res



class LoaiCongVan(Base):
    __tablename__ = 'loai_cong_van'
    ma_loai = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True)
    loai_cong_van = Column(String(100), nullable=False)
    trang_thai = Column(Boolean, nullable=False)
    
    ma_nguoi_cap_nhat = Column(Integer, nullable=False)
    nguoi_cap_nhat = relationship('NguoiDung', backref="ki_loai_cong_van")
    
    mo_ta = Column(String(100), nullable=False)
    

class TinhTrangXuLy(Base):
    __tablename__ = 'tinh_trang_xu_ly'
    id = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True)
    tinh_trang_xu_ly = Column(String(100), nullable=False)
    
    
class MucDoBaoMat(Base):
    __tablename__ = 'muc_do_bao_mat'
    id = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True)
    muc_do_bao_mat = Column(String(100), nullable=False)
    

class MucDoKhanCap(Base):
    __tablename__ = 'muc_do_khan_cap'
    id = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True)
    muc_do_khan_cap  = Column(String(100), nullable=False)
    
    
    
class TraoDoi(Base):
    __tablename__ = 'loai_cong_van'
    id = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True)
    noi_dung = Column(String(100), nullable=False)
    ma_nguoi_tao =  Column(Integer, nullable=False)
    
    nguoi_tao = relationship('NguoiDung', backref='trao_doi')
    


class CongVanDi(Base):
    __tablename__ = 'cong_van_di'
    so_cong_van = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True)
    ten_cong_van = Column(String(100), nullable=False)
    ma_phong_ban_nhan = Column(Integer, nullable=False)
    
    ma_nguoi_ky = Column(Integer, nullable=False)
    ngay_ky = Column(Date, nullable=False)
    ngay_hieu_luc = Column(Date, nullable=False)
    ngay_het_hieu_luc = Column(Date, nullable=True)
    
    ma_phong_ban_phat_hanh = Column(Integer, nullable=False)
    ngay_phat_hanh = Column(Date, nullable=False)
    
    ma_loai_cong_van = Column(Integer, nullable=False)
    loai_cong_van = relationship('LoaiCongVan', backref="cong_van")
    
    trich_yeu_noi_dung = Column(String(100), nullable=True)
    noi_dung = Column(String(500), nullable=False)
    
    ma_nguoi_xu_ly = Column(Integer, nullable=False)
    ma_nguoi_theo_doi = Column(Integer, nullable=True)
    ma_tinh_trang_xu_ly = Column(Integer, nullable=False)
    
    ly_do = Column(String(500), nullable=False)
    so_luong_van_ban = Column(Integer, nullable=False)
    
    ma_muc_do_bao_mat = Column(Integer, nullable=False)
    ma_muc_do_khan_cap = Column(Integer, nullable=False)
    
    ma_tep_dinh_kem = Column(Integer, nullable=True)
    ma_nguoi_tao = Column(Integer, nullable=False)
    ma_nguoi_duyet = Column(Integer, nullable=False)
    
    ngay_duyet = Column(Date, nullable=True)



class CongVanDi_TraoDoi(Base):
    __tablename__ = 'associate_cong_van_di__trao_doi'
    ma_cong_van_di = Column(Integer, nullable=False)
    ma_trao_doi = Column(Integer, nullable=False)
