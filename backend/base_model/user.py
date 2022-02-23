# import datetime
# from pydantic import BaseModel


# class PositionModel(BaseModel):
#     id: int
#     name: str
    
    
# class UserModel(BaseModel):
#     id = Column(Integer, Sequence('id_autoincrement', start=1001, increment=1), primary_key=True, index=True)
#     username = Column(String(50), nullable=False)
#     password = Column(String(64), nullable=False)
#     fullname: str
#     dob: datetime.date
#     address: str
#     avatar: str
#     update_date: datetime.date
#     position_id: int