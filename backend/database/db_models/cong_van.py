from sqlalchemy import Table, Column, Integer, String, Boolean, Date, DateTime
from sqlalchemy import ForeignKey, Sequence, UniqueConstraint
from sqlalchemy.orm import relationship

from .base import Base, SaveFile
from .nguoi_dung import NguoiDung
from .static_tables import PhongBan, TrangThaiLoaiCongVan


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
    id = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True)
    ma_loai = Column(String(256), nullable=False)
    name = Column(String(256), nullable=False)
    trang_thai = Column(String(256), nullable=False)
    
    id_nguoi_cap_nhat = Column(Integer, ForeignKey('nguoi_dung.id'), nullable=False)
    nguoi_cap_nhat = relationship('NguoiDung', backref="ki_loai_cong_van")
    thoi_gian_cap_nhat = Column(DateTime, nullable=False)
    
    mo_ta = Column(String(512), nullable=True)
    
    __table_args__ = (UniqueConstraint('ma_loai', name='unique__ma_loai'),
                    )
    


class CongVanDiVersion(Base):
    __tablename__ = 'cong_van_di_version'
    id = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True)
    # so_cong_van = Column(String(256), nullable=False)
    ten_cong_van = Column(String(256), nullable=False)
    
    id_phong_ban_nhan = Column(Integer, ForeignKey('phong_ban.id'), nullable=False)
    phong_ban_nhan = relationship("PhongBan", foreign_keys=id_phong_ban_nhan, uselist=False, post_update=True,
                                            primaryjoin=(id_phong_ban_nhan==PhongBan.id))
    
    id_nguoi_ky = Column(Integer, ForeignKey('nguoi_dung.id'), nullable=False)
    nguoi_ky = relationship("NguoiDung", foreign_keys=id_nguoi_ky, uselist=False, post_update=True,
                                            primaryjoin=(id_nguoi_ky==NguoiDung.id))
    ngay_ky = Column(DateTime, nullable=True)
    
    
    id_phong_ban_phat_hanh = Column(Integer, ForeignKey('phong_ban.id'), nullable=False)
    phong_ban_phat_hanh = relationship("PhongBan", foreign_keys=id_phong_ban_phat_hanh, uselist=False, post_update=True, 
                                       primaryjoin=(id_phong_ban_phat_hanh==PhongBan.id))
    
    # ngay_ky = Column(Date, nullable=False)
    ngay_phat_hanh = Column(DateTime, nullable=False)
    
    id_loai_cong_van = Column(Integer, ForeignKey('loai_cong_van.id'), nullable=False)
    loai_cong_van = relationship('LoaiCongVan', backref="cong_van", uselist=False)
    
    # trich_yeu_noi_dung = Column(String(256), nullable=True)
    noi_dung = Column(String(2**13-1), nullable=False)
    
    id_nguoi_xu_ly = Column(Integer, ForeignKey('nguoi_dung.id'), nullable=False)
    nguoi_xu_ly = relationship("NguoiDung", foreign_keys=id_nguoi_xu_ly, uselist=False, post_update=True,
                                            primaryjoin=(id_nguoi_xu_ly==NguoiDung.id))
    
    id_nguoi_theo_doi = Column(Integer, ForeignKey('nguoi_dung.id'), nullable=True)
    nguoi_theo_doi = relationship("NguoiDung", foreign_keys=id_nguoi_theo_doi, uselist=False, post_update=True,
                                            primaryjoin=(id_nguoi_theo_doi==NguoiDung.id))
    id_tinh_trang_xu_ly = Column(Integer, ForeignKey('tinh_trang_xu_ly.id'), nullable=False)
    tinh_trang_xu_ly = relationship("TinhTrangXuLy", backref="cong_van")
    
    ly_do = Column(String(512), nullable=True)
    so_luong_van_ban = Column(Integer, nullable=False)
    
    # id_muc_do_bao_mat = Column(Integer, ForeignKey('muc_do_bao_mat.id'), nullable=False)
    # muc_do_bao_mat = relationship("MucDoBaoMat", backref="cong_van", uselist=False)
    
    id_muc_do_uu_tien = Column(Integer, ForeignKey('muc_do_uu_tien.id'), nullable=False)
    muc_do_uu_tien = relationship("MucDoUuTien", backref="cong_van", uselist=False)
    
    id_tep_dinh_kem = Column(Integer, ForeignKey('save_file.id'), nullable=True)
    tep_dinh_kem = relationship("SaveFile", backref="cong_van", uselist=False)
    
    id_nguoi_tao = Column(Integer, ForeignKey('nguoi_dung.id'), nullable=False)
    nguoi_tao = relationship("NguoiDung", foreign_keys=id_nguoi_tao, uselist=False, post_update=True,
                                            primaryjoin=(id_nguoi_tao==NguoiDung.id))
    
    id_nguoi_duyet = Column(Integer, ForeignKey('nguoi_dung.id'), nullable=True)
    nguoi_duyet = relationship("NguoiDung", foreign_keys=id_nguoi_duyet, uselist=False, post_update=True,
                                            primaryjoin=(id_nguoi_duyet==NguoiDung.id))
    
    ngay_hieu_luc = Column(DateTime, nullable=False)
    ngay_het_hieu_luc = Column(DateTime, nullable=True)
    
    ngay_tao = Column(DateTime, nullable=False)
    ngay_duyet = Column(DateTime, nullable=True)
    
    noi_dung_thay_doi = Column(String(4096), nullable=True)
    
    cac_trao_doi = relationship("TraoDoiCongVanDi", back_populates="cong_van_di_version")
    
    cong_van_di_id = Column(Integer, ForeignKey('cong_van_di.id', name="cong_van_di_id"), nullable=False)
    cong_van_di = relationship("CongVanDi", back_populates="cong_van_di_versions", foreign_keys=cong_van_di_id, primaryjoin="CongVanDiVersion.cong_van_di_id==CongVanDi.id", uselist=False)



class CongVanDi:
    __tablename__ = 'cong_van_di'
    id = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True)
    
    cong_van_di_current_version_id = Column(Integer, ForeignKey("cong_van_di_version.id", name="cong_van_di_current_version_id"), nullable=True)
    cong_van_di_current_version = relationship("CongVanDiVersion", foreign_keys=cong_van_di_current_version_id, uselist=False, post_update=True,
                                            primaryjoin=(cong_van_di_current_version_id==CongVanDiVersion.id))
    
    cong_van_di_versions = relationship("CongVanDiVersion", back_populates="cong_van_di", order_by="CongVanDiVersion.ngay_tao", primaryjoin="CongVanDiVersion.cong_van_di_id==CongVanDi.id")



class TraoDoiBase:
    __tablename__ = 'trao_doi'
    id = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True)
    noi_dung = Column(String(512), nullable=False)
    
    
class TraoDoiCongVanDi(Base, TraoDoiBase):
    __tablename__ = 'trao_doi_cong_van_di'
    
    id_cong_van_di = Column(Integer, ForeignKey('cong_van_di_version.id'), nullable=False)
    cong_van_di_version = relationship("CongVanDi", back_populates="cac_trao_doi", uselist=False)
    
    id_nguoi_tao =  Column(Integer, ForeignKey('nguoi_dung.id'), nullable=False)
    nguoi_tao = relationship('NguoiDung', backref='trao_doi')

# class CongVanDi_TraoDoi(Base):
#     __tablename__ = 'associate_cong_van_di__trao_doi'
#     id_cong_van_di = Column(Integer, ForeignKey("cong_van_di_version.id"), primary_key=True, nullable=False)
#     id_trao_doi = Column(Integer, ForeignKey("trao_doi.id"), primary_key=True, nullable=False)
