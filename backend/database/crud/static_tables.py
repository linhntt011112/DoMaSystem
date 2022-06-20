
from datetime import datetime
from .. import common_queries, db_models
from ..schemas import static_tables as static_table_schemas

import typing 
from exceptions import db_exceptions



def get_list(db, class_):
    return common_queries.query_all(db, class_)



def get_static_table_by_id(db, static_table_id, class_):
    obj = common_queries.query_filter(db, class_, condition=(class_.id == static_table_id))
    if len(obj) >= 1:
        return obj[0]
    else:
        return None
    


def get_static_table_by_name(db, static_table_name, class_):
    obj = common_queries.query_filter(db, class_, condition=(class_.name == static_table_name))
    if len(obj) >= 1:
        return obj[0]
    else:
        return None
    
    
def insert(db, obj: db_models.StaticTable):
    obj.update_at = datetime.now()
    return common_queries.add_and_commit(db, obj)


def update(db, obj, obj_pydantic: static_table_schemas.StaticTableUpdate):
    data_dict = obj_pydantic.__dict__
    data_dict = {k: data_dict[k] for k in data_dict if data_dict[k] is not None}
    
    [setattr(obj, k, data_dict[k]) for k in data_dict]
    obj.update_at = datetime.now()
    
    return common_queries.add_and_commit(db, obj)


def delete(db, obj):
    return common_queries.delete(db, obj)

