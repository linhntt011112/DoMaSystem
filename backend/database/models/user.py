import secrets
from sqlalchemy import Column, Integer, String, Boolean, Date
from sqlalchemy import ForeignKey, Sequence
from sqlalchemy.orm import relationship


from .base import Base

class Position(Base):
    __tablename__ = 'position'
    id = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True)
    name = Column(String(50), nullable=False)
    # people = relationship("Person", back_populates="position")
    
    def as_dict(self):
        secrets = set(['id'])
        return {c.name: getattr(self, c.name) for c in self.__table__.columns if c.name not in secrets}
        
    
    
class User(Base):
    __tablename__ = 'person'
    id = Column(Integer, Sequence('id_autoincrement', start=1001, increment=1), primary_key=True, index=True)
    username = Column(String(50), nullable=False)
    password = Column(String(64), nullable=False)
    fullname = Column(String(50), nullable=False)
    dob = Column(Date, nullable=False)
    address = Column(String(100), nullable=False)
    avatar = Column(String(200), nullable=True)
    update_date = Column(Date, nullable=False)
    position_id = Column(Integer, ForeignKey("position.id"))
    position = relationship("Position")
    
    def as_dict(self):
        secrets = set(['id', 'password', 'position'])
        return {c.name: getattr(self, c.name) for c in self.__table__.columns if c.name not in secrets}
