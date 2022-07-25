import datetime

from typing import List, Optional, Union
from pydantic import BaseModel

from . import nguoi_dung



class LichFull(BaseModel):
    id: int
    name: str
    
    id_nguoi_tao: int
    nguoi_tao: nguoi_dung.UserShort
    
    create_at: Union[datetime.datetime, datetime.date]
    start_time: Union[datetime.datetime, datetime.date]
    end_time: Union[datetime.datetime, datetime.date]
    
    class Config:
        orm_mode = True
        
        
class LichCreate(BaseModel):
    name: str
    id_nguoi_tao: int
    
    start_time: Union[datetime.datetime, datetime.date]
    end_time: Union[datetime.datetime, datetime.date]
    