
from datetime import datetime
from .. import common_queries, db_models
from ..schemas import utils as utils_schemas

import typing 
from exceptions import db_exceptions



def get_lich_by_id(db, id):
    user = common_queries.query_filter(db, db_models.Lich, (db_models.Lich.id==id))
    if len(user) >= 1:
        return user[0]
    else:
        return None
    
    
def select_list_lich_by_user_id(db, user_id, **kwargs):
    condition = (db_models.Lich.id_nguoi_tao==user_id)
    list_of_objs = common_queries.select_with_options(db, db_models.Lich, condition=condition, **kwargs)
    return list_of_objs



def validate_lich(lich: typing.Union[utils_schemas.LichCreate, db_models.Lich]):
    if lich.start_time > lich.end_time:
        raise db_exceptions.InvalidValueException("End time is smaller than start time!")
    return True


def create_lich(db, lich_pydantic: utils_schemas.LichCreate):
    validate_lich(lich_pydantic)
    data_dict = lich_pydantic.__dict__
    data_dict["create_at"] = datetime.now()
    lich = db_models.Lich(**data_dict)
    
    new_lich = common_queries.add_and_commit(db, lich)
    return new_lich


def update_lich(db, lich_pydantic: utils_schemas.LichUpdate, lich: db_models.Lich):
    data_dict = lich_pydantic.__dict__
    data_dict["create_at"] = datetime.now()
    for k in data_dict:
        if data_dict[k] is not None:
            setattr(lich, k, data_dict[k])
    
    if validate_lich(lich):
        return common_queries.add_and_commit(db, lich)



def delete_lich(db, lich: db_models.Lich):
    
    return common_queries.delete(db, lich)


