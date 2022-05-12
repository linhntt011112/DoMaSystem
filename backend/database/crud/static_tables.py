
from datetime import datetime
from .. import common_queries, db_models
from ..schemas import nguoi_dung as user_schemas

import typing 
from . import exceptions



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


