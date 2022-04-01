from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Boolean, Date, DateTime
from sqlalchemy import ForeignKey, Sequence, UniqueConstraint, Table

BM = declarative_base()

class Base(BM):
    __tablename__ = 'base'
    id = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True)
    

class SaveFile(Base):
    __tablename__ = 'save_file'
    id = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True) 
    name = Column(String(50), nullable=False)
    save_location = Column(String(100), nullable=False)
    # url = Column(String(100), nullable=True)

    upload_at = Column(DateTime, nullable=False)
