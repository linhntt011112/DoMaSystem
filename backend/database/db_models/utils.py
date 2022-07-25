from sqlalchemy import Table, Column, Integer, String, Boolean, Date, DateTime
from sqlalchemy import ForeignKey, Sequence, UniqueConstraint
from sqlalchemy.orm import relationship

from .base import Base, SaveFile
from .nguoi_dung import NguoiDung



class Lich(Base):
    __tablename__ = 'lich'
    id = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True)
    name = Column(String(1024), nullable=False)
   
    id_nguoi_tao =  Column(Integer, ForeignKey('nguoi_dung.id'), nullable=False)
    nguoi_tao = relationship('NguoiDung', backref='lich')
   
    create_at = Column(DateTime, nullable=False)
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=False)