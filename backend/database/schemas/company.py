from pydantic import BaseModel
from datetime import datetime
import typing as t

from . import nguoi_dung as schemas_user


class CompanyFull(BaseModel):
    id: int
    full_name: str
    description: str = None
    create_at: datetime
    
    creator_id: int
    creator: schemas_user.UserBase

    class Config:
        orm_mode = True


class CompanyCreate(BaseModel):
    full_name: str
    description: str = None

    creator_id: int = None
    create_at: datetime = None
    

class CompanyShort(BaseModel):
    id: int
    full_name: str
    description: str = None
    create_at: datetime
    
    creator_id: int

    class Config:
        orm_mode = True
