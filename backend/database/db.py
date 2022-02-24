from contextlib import contextmanager

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

from database.config import db_config


engine = create_engine(db_config.DB_URL, 
                    #    future=True,
                       query_cache_size=100,
                        # echo=True, # for logging query
                        )

Session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))

# class DBSessionLocal:  
#     __instance__ = None
    
#     def __init__(self):
#         self.new = sessionmaker(autocommit=False, autoflush=False, bind=engine)
        
#     def get_session(self):
#         return self.new()
    
#     def __new__(cls):  # Singleton
#         if cls.__instance__ is None:
#             cls.__instance__ = super().__new__(cls)
#         return cls.__instance__


# def get_user_by_name(username):
#     db_session = DBSessionLocal().get_session()
#     possible_user = db_session.query(User).filter(User.username == username).all()
#     try:
#         if len(possible_user) != 1: 
#             return None
#         else:
#             return possible_user[0]
#     except:
#         return None
    