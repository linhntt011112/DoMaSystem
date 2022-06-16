# from sqlalchemy import Table, Column, Integer, String, Boolean, Date, DateTime
# from sqlalchemy import ForeignKey, Sequence
# from sqlalchemy.orm import relationship

# from .base import Base
# from .nguoi_dung import NguoiDung



# class NotificationTemplate(Base):
#     __tablename__ = 'notification_template'
#     id = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True)
    
#     reference_table = Column(String(128), nullable=False)
#     action = Column(String(512), nullable=False)
    
    

# class NotificationObject(Base):
#     __tablename__ = 'notification_template'
#     id = Column(Integer, Sequence('id_autoincrement', start=1, increment=1), primary_key=True, index=True)
    
#     notification_template_id = Column(Integer, ForeignKey('notification_template.id'), nullable=False)
#     notification_template = relationship('NotificationTemplate', backref="notification_object", uselist=False)
    
#     created_on = Column(DateTime, nullable=False)
    
#     actor_id =  Column(Integer, nullable=False)
#     notification_template = relationship('NotificationTemplate', backref="notification_object", uselist=False)
 
    