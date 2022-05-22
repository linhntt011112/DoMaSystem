import secrets
from sqlalchemy import Column, Integer, String, Boolean, Date
from sqlalchemy import ForeignKey, Sequence, UniqueConstraint
from sqlalchemy.orm import relationship


from .base import Base

# class Position(Base):
#     __tablename__ = 'position'
#     id = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True)
#     name = Column(String(128), nullable=False)
#     # people = relationship("Person", back_populates="position")
    
#     def as_dict(self):
#         secrets = set(['id'])
#         return {c.name: getattr(self, c.name) for c in self.__table__.columns if c.name not in secrets}
        
    
class NguoiDung(Base):
    __tablename__ = 'nguoi_dung'
    id = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True)
    ho_ten = Column(String(128), nullable=False)
    ten_tai_khoan = Column(String(128), nullable=False)
    password = Column(String(64), nullable=False)
    password_salt = Column(String(64), nullable=False)
    ngay_sinh = Column(Date, nullable=True)
    dia_chi = Column(String(100), nullable=True)
    ngay_cap_nhat = Column(Date, nullable=False)
    ngay_vao_lam = Column(Date, nullable=True)
    dien_thoai = Column(String(128), nullable=True)
    email = Column(String(128), nullable=True)
    
    phan_quyen = Column(String(10), nullable=False)
    gioi_tinh = Column(String(10), nullable=True)
    
    cccd = Column(String(128), nullable=False)
    ngay_cap = Column(Date, nullable=True)
    noi_cap = Column(String(100), nullable=True)
    que_quan = Column(String(100), nullable=True)
    
    tk_ngan_hang = Column(String(100), nullable=True)
    ngan_hang = Column(String(100), nullable=True)
    
    id_phong_ban = Column(Integer, ForeignKey('phong_ban.id'))
    phong_ban = relationship("PhongBan", backref="nguoi_dung_s", uselist=False)
    
    id_chuc_vu = Column(Integer, ForeignKey('chuc_vu.id'))
    chuc_vu = relationship("ChucVu", backref="nguoi_dung_s", uselist=False)
    
    id_hoc_van = Column(Integer, ForeignKey('hoc_van.id'))
    hoc_van = relationship("HocVan", backref="nguoi_dung_s", uselist=False)
    
    id_dan_toc = Column(Integer, ForeignKey('dan_toc.id'))
    dan_toc = relationship("DanToc", backref="nguoi_dung_s", uselist=False)
    
    id_quoc_tich = Column(Integer, ForeignKey('quoc_tich.id'))
    quoc_tich = relationship("QuocTich", backref="nguoi_dung_s", uselist=False)
    
    id_ton_giao = Column(Integer, ForeignKey('ton_giao.id'))
    ton_giao = relationship("TonGiao", backref="nguoi_dung_s", uselist=False)
        
    __table_args__ = (UniqueConstraint('ten_tai_khoan', name='unique__ten_tai_khoan'),
                     )
    
    
