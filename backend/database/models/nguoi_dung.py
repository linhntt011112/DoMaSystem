import secrets
from sqlalchemy import Column, Integer, String, Boolean, Date
from sqlalchemy import ForeignKey, Sequence, UniqueConstraint
from sqlalchemy.orm import relationship


from .base import Base

# class Position(Base):
#     __tablename__ = 'position'
#     id = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True)
#     name = Column(String(50), nullable=False)
#     # people = relationship("Person", back_populates="position")
    
#     def as_dict(self):
#         secrets = set(['id'])
#         return {c.name: getattr(self, c.name) for c in self.__table__.columns if c.name not in secrets}
        
    
class NguoiDung(Base):
    __tablename__ = 'nguoi_dung'
    ma_nguoi_dung = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True)
    ho_ten = Column(String(50), nullable=False)
    ten_tai_khoan = Column(String(50), nullable=False)
    password = Column(String(64), nullable=False)
    password_salt = Column(String(64), nullable=False)
    ngay_sinh = Column(Date, nullable=True)
    dia_chi = Column(String(100), nullable=True)
    ngay_cap_nhat = Column(Date, nullable=False)
    ngay_vao_lam = Column(Date, nullable=True)
    dien_thoai = Column(String(15), nullable=True)
    email = Column(String(15), nullable=True)
    
    phan_quyen = Column(Boolean, nullable=False)
    gioi_tinh = Column(Boolean, nullable=True)
    
    cccd = Column(String(15), nullable=False)
    ngay_cap = Column(Date, nullable=True)
    noi_cap = Column(String(100), nullable=True)
    que_quan = Column(String(100), nullable=True)
    
    tk_ngan_hang = Column(String(100), nullable=False)
    ngan_hang = Column(String(100), nullable=True)
    
    phong_ban = Column(String(100), nullable=True)
    chuc_vu = Column(String(100), nullable=True)
    hoc_van = Column(String(100), nullable=True)
    dan_toc = Column(String(100), nullable=True)
    quoc_tich = Column(String(100), nullable=True)
    ton_giao = Column(String(100), nullable=True)
    
    __table_args__ = (UniqueConstraint('ho_ten', name='unique_items'),
                     )
    
    
    def as_dict(self):
        secrets = set(['password'])
        return {c.name: getattr(self, c.name) for c in self.__table__.columns if c.name not in secrets}
