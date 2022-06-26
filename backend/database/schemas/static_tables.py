import datetime

from typing import Optional, Union
from pydantic import BaseModel


class StaticTable(BaseModel):
    id: int
    name: str
    
    update_at: datetime.datetime = None
    
    class Config:
        orm_mode = True
        
        

class StaticTableUpdate(BaseModel):
    id: int
    name: str

class StaticTableCreate(BaseModel):
    name: str
    

class StaticTableDelete(BaseModel):
    id: int


class PhongBanFull(StaticTable):
    pass


class ChucVuFull(StaticTable):
    pass
    

class HocVanFull(StaticTable):
    pass
    

class DanTocFull(StaticTable):
    pass
    

class QuocTichFull(StaticTable):
    pass
    

class TonGiaoFull(StaticTable):
    pass



class TinhTrangXuLyFull(StaticTable):
    pass
    


# class MucDoBaoMatFull(StaticTable):
#     pass
    


class MucDoUuTienFull(StaticTable):
    pass
