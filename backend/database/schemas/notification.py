import datetime
import string

from typing import List, Optional, Union
from pydantic import BaseModel

from . import nguoi_dung
from . import static_tables


class NotificationTemplateFull(BaseModel):
    id: int
    entity_type: str
    template: str
    
    class Config:
        orm_mode = True



class NotificationObjectFull(BaseModel):
    id: int
    
    notification_template_id: int
    notification_template: NotificationTemplateFull
    
    created_on: Union[datetime.datetime, datetime.date]
    
    actor_id: int
    actor: nguoi_dung.UserShort
    
    entity_id: int
    
    class Config:
        orm_mode = True
    
    
    
    
class NotificationFull(BaseModel):
    id: int    
    notification_object_id: int
    notification_object: NotificationObjectFull
    
    notifier_id: int
    notifier: nguoi_dung.UserShort
    
    status: int
    
    class Config:
        orm_mode = True
        
    
    def get_msg(self):
        return {
            "id": self.notification_object.id,
            "{{actor_id}}": self.notification_object.actor.ho_ten,
            "{{entity_id}}": self.notification_object.entity_id,
            "entity_type": self.notification_object.notification_template.entity_type,
            "template": self.notification_object.notification_template.template
        }
