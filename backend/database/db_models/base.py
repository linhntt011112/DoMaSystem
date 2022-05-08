from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Boolean, Date, DateTime
from sqlalchemy import ForeignKey, Sequence, UniqueConstraint, Table

Base = declarative_base()


class SaveFileNormal:
    __tablename__ = 'save_file'
    id = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True) 
    name = Column(String(256), nullable=False)
    save_location = Column(String(1024), nullable=False)
    url = Column(String(1024), nullable=True)

    upload_at = Column(DateTime, nullable=False)


class SaveFile(Base, SaveFileNormal):
    pass
