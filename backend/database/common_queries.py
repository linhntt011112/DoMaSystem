from collections import Iterable
from sqlalchemy import select
from sqlalchemy.orm import Session, scoped_session


from database import db_models


def query_all(session: scoped_session, class_name):
    res = session.query(class_name).all()
    # Session.remove()
    
    return res


def query_filter(session: scoped_session, class_name, condition):
    res = session.query(class_name).filter(condition).all()
    # Session.remove()
    
    return res


# def update(class_name, condition, session: Session):
#     res = session.query(class_name).update()
  

def add_and_commit(session: scoped_session, data):
    try:
        session.add(data)
        session.commit()
        session.refresh(data)
        return data
    except Exception as e:
        session.rollback()
        raise 
    
    # Session.remove()


def select_with_options(session: Session, class_: db_models.Base, 
                        condition=None, limit=None, offset=None, order_by=None, 
                        **kwargs):
    query = session.query(class_)
    if condition is not None:
        query = query.filter(condition)
    
    if limit is not None and offset is not None:
        query = query.order_by(order_by).limit(limit).offset(offset)

    res = query.all()
    return res



def delete(session: Session, data):
    try:
        session.delete(data)
        session.commit()
        # session.refresh(data)
        return True
    except Exception as e:
        session.rollback()
        raise