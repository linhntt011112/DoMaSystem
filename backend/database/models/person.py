from sqlalchemy import Column, Integer, String, Boolean,Date, ForeignKey
from sqlalchemy.orm import relationship

from .base import Base


class Position(Base):
    id = Column(Integer, primary_key = True, index=True)
    name = Column(String(50), nullable=False)
    # people = relationship("Person", back_populates="position")
    
    
class Person(Base):
    id = Column(Integer, primary_key = True, index=True)
    user_name = Column(String(50), nullable=False)
    password = Column(String(50), nullable=False)
    position_id = Column(Integer, ForeignKey("position.id"))
    position = relationship("Position")
