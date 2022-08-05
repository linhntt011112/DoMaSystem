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
   


class CongVanVersion(Base):
    __tablename__ = 'cong_van_version'
    id = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True)
    version_name = Column(String(256), nullable=True)
   
    ten_cong_van = Column(String(256), nullable=False)
   
    id_phong_ban_nhan = Column(Integer, ForeignKey('phong_ban.id'), nullable=False)
    phong_ban_nhan = relationship("PhongBan", foreign_keys=id_phong_ban_nhan, uselist=False
                                            )
   
    id_nguoi_ky = Column(Integer, ForeignKey('nguoi_dung.id'), nullable=False)
    nguoi_ky = relationship("NguoiDung", foreign_keys=id_nguoi_ky, uselist=False)
    ngay_ky = Column(DateTime, nullable=True)
   
   
    id_phong_ban_phat_hanh = Column(Integer, ForeignKey('phong_ban.id'), nullable=False)
    phong_ban_phat_hanh = relationship("PhongBan", foreign_keys=id_phong_ban_phat_hanh, uselist=False
                                       )
   
    # ngay_phat_hanh = Column(DateTime, nullable=False)
   
    id_loai_cong_van = Column(Integer, ForeignKey('loai_cong_van.id'), nullable=False)
    loai_cong_van = relationship('LoaiCongVan', backref="cong_van", uselist=False)
   
    # trich_yeu_noi_dung = Column(String(256), nullable=True)
    noi_dung = Column(String(2**13-1), nullable=False)
   
    id_nguoi_xu_ly = Column(Integer, ForeignKey('nguoi_dung.id'), nullable=False)
    nguoi_xu_ly = relationship("NguoiDung", foreign_keys=id_nguoi_xu_ly, uselist=False
                                           )
    ngay_hoan_tat = Column(DateTime, nullable=True)
   
    id_nguoi_theo_doi = Column(Integer, ForeignKey('nguoi_dung.id'), nullable=True)
    nguoi_theo_doi = relationship("NguoiDung", foreign_keys=id_nguoi_theo_doi, uselist=False
                                           )
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
    nguoi_tao = relationship("NguoiDung", foreign_keys=id_nguoi_tao, uselist=False
                                            )
   
    # id_nguoi_duyet = Column(Integer, ForeignKey('nguoi_dung.id'), nullable=True)
    # nguoi_duyet = relationship("NguoiDung", foreign_keys=id_nguoi_duyet, uselist=False
    #                                         )
   
    # ngay_hieu_luc = Column(DateTime, nullable=False)
    # ngay_het_hieu_luc = Column(DateTime, nullable=True)
   
    ngay_tao = Column(DateTime, nullable=False)
    # ngay_duyet = Column(DateTime, nullable=True)
   

    # cac_trao_doi = relationship("TraoDoiCongVan", back_populates="cong_van_version")
   
    noi_dung_thay_doi = Column(String(4096), nullable=True)
        
    thoi_gian_cap_nhat = Column(DateTime, nullable=False)

    id_nguoi_cap_nhat =  Column(Integer, ForeignKey('nguoi_dung.id'), nullable=False)
    nguoi_cap_nhat = relationship("NguoiDung", foreign_keys=id_nguoi_cap_nhat, uselist=False)
                                  
   
    cong_van_id = Column(Integer, ForeignKey('cong_van.id', name="cong_van_id"), nullable=False)
    cong_van = relationship("CongVan", back_populates="cong_van_versions", foreign_keys=cong_van_id, uselist=False)
   
    __table_args__ = (UniqueConstraint('version_name', 'cong_van_id', name='unique__version_name__cong_van_id'),
                    )



class CongVan(Base):
    __tablename__ = 'cong_van'
    id = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True)
   
    cong_van_current_version_id = Column(Integer, ForeignKey("cong_van_version.id", name="cong_van_current_version_id"), nullable=True)
    cong_van_current_version = relationship("CongVanVersion", foreign_keys=cong_van_current_version_id, uselist=False, post_update=True)
   
    cong_van_versions = relationship("CongVanVersion", back_populates="cong_van", order_by="CongVanVersion.ngay_tao", primaryjoin="CongVanVersion.cong_van_id==CongVan.id",  post_update=True)
    tat_ca_trao_doi = relationship("TraoDoiCongVan", backref="cong_van", primaryjoin="TraoDoiCongVan.id_cong_van==CongVan.id")
   
    create_at = Column(DateTime, nullable=False)
    update_at = Column(DateTime, nullable=False)



class TraoDoiBase:
    __tablename__ = 'trao_doi'
    id = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True)
    noi_dung = Column(String(1024), nullable=False)
   
   
class TraoDoiCongVan(Base, TraoDoiBase):
    __tablename__ = 'trao_doi_cong_van'
   
    id_cong_van = Column(Integer, ForeignKey('cong_van.id'), nullable=False)
   
    id_nguoi_tao =  Column(Integer, ForeignKey('nguoi_dung.id'), nullable=False)
    nguoi_tao = relationship('NguoiDung', backref='trao_doi')
    
    create_at = Column(DateTime, nullable=False)

# class CongVan_TraoDoi(Base):
#     __tablename__ = 'associate_cong_van__trao_doi'
#     id_cong_van = Column(Integer, ForeignKey("cong_van_version.id"), primary_key=True, nullable=False)
#     id_trao_doi = Column(Integer, ForeignKey("trao_doi.id"), primary_key=True, nullable=False)



class CongVanLuuTru(Base):
    __tablename__ = 'cong_van_luu_tru'
    id = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True)
   
    ten_cong_van = Column(String(256), nullable=True)
   
    phong_ban_nhan = Column(String(256), nullable=True)
   
    nguoi_ky = Column(String(256), nullable=True)
    ngay_ky = Column(DateTime, nullable=True)
   
   
    phong_ban_phat_hanh = Column(String(256), nullable=True)
   
    loai_cong_van = Column(String(256), nullable=True)
   
    noi_dung = Column(String(2**13-1), nullable=True)
   
    nguoi_xu_ly = Column(String(256), nullable=True)
    
    ngay_hoan_tat = Column(DateTime, nullable=True)
   
    nguoi_theo_doi = Column(String(256), nullable=True)
    tinh_trang_xu_ly = Column(String(256), nullable=True)
   
    ly_do = Column(String(512), nullable=True)
    so_luong_van_ban = Column(Integer, nullable=True)
   
    # id_muc_do_bao_mat = Column(Integer, ForeignKey('muc_do_bao_mat.id'), nullable=False)
    # muc_do_bao_mat = relationship("MucDoBaoMat", backref="cong_van", uselist=False)
   
    muc_do_uu_tien = Column(String(256), nullable=True)
   
    id_tep_dinh_kem = Column(Integer, ForeignKey('save_file.id'), nullable=True)
    tep_dinh_kem = relationship("SaveFile", backref="cong_van_luu_tru", uselist=False)
   
    nguoi_tao = Column(String(256), nullable=True)

   
    ngay_tao = Column(DateTime, nullable=True)
    
    create_at = Column(DateTime, nullable=False)
    update_at = Column(DateTime, nullable=False)
