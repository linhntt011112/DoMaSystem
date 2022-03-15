from collections import Iterable

from database.db import Session


def query_all(class_name):
    session = Session()
    res = session.query(class_name).all()
    # Session.remove()
    
    return res


def query_filter(class_name, condition):
    session = Session()
    res = session.query(class_name).filter(condition).all()
    # Session.remove()
    
    return res


def update(class_name, condition):
    session = Session()
    res = session.query(class_name).update()
  

def add_and_commit(data):
    session = Session()
    if isinstance(data, Iterable):
        session.add_all(data)
    else:
        session.add(data)
        
    try:
        session.commit()
    except Exception as e:
        session.rollback()
        raise 
    
    # Session.remove()
    
