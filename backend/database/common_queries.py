from collections import Iterable

from database.db import Session


def query_all(class_name):
    Session()
    res = Session.query(class_name).all()
    # Session.remove()
    
    return res


def query_filter(class_name, condition):
    Session()
    res = Session.query(class_name).filter(condition).all()
    # Session.remove()
    
    return res
  

def add_and_commit(data):
    Session()
    if isinstance(data, Iterable):
        Session.add_all(data)
    else:
        Session.add(data)
        
    try:
        Session.commit()
    except:
        Session.rollback()
        raise 
    
    # Session.remove()
    
