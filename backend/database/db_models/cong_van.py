from sqlalchemy import Table, Column, Integer, String, Boolean, Date
from sqlalchemy import ForeignKey, Sequence
from sqlalchemy.orm import relationship

from .base import Base
from .nguoi_dung import NguoiDung


class AssociationNguoiKiCongVan(Base):
    __tablename__ = 'nguoi_ki_cong_van'
    ma_nguoi_dung = Column('ma_nguoi_dung', ForeignKey('nguoi_dung.ma_nguoi_dung'), primary_key=True)
    ma_loai_cong_van = Column('ma_loai_cong_van', ForeignKey('loai_cong_van.ma_loai'), primary_key=True)
    nguoi_ki = relationship("NguoiDung")
    loai_cong_van = relationship("LoaiCongVan", back_populates="nguoi_ki_s")


class LoaiCongVan(Base):
    __tablename__ = 'loai_cong_van'
    ma_loai = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True)
    loai_cong_van = Column(String(50), nullable=False)
    trang_thai = Column(String(10), nullable=False)
    ngay_cap_nhat = Column(Date, nullable=False)
    mo_ta = Column(String(200), nullable=True)
    
    ma_nguoi_cap_nhat = Column(Integer, ForeignKey("nguoi_dung.ma_nguoi_dung"), nullable=False)
    nguoi_cap_nhat = relationship('NguoiDung')
    
    nguoi_ki_s = relationship('AssociationNguoiKiCongVan', back_populates="loai_cong_van")
    
    def as_dict(self):
        secrets = set(['nguoi_cap_nhat', 'nguoi_ki_s'])
        res = {c.name: getattr(self, c.name) for c in self.__table__.columns if c.name not in secrets}
        res['nguoi_cap_nhat'] = self.nguoi_cap_nhat.ho_ten
        res['nguoi_ki'] = [nguoi_ki.nguoi_ki.ho_ten for nguoi_ki in self.nguoi_ki_s]
        return res
      


