from sqlalchemy import create_engine
from sqlalchemy.orm import session, sessionmaker

from database.config import db_config
from database.models import Base, Person, Position


class User:
    def __init__(self, id, password, name):
        self.password = password
        self.name = name
        self.id = id

users = [
    User("linh", "linh0111", "Linh Nguyễn"),
    User("tan", "tan1112", "Tân Hoàng")
]
users = {user.id: user for user in users}

engine = create_engine(db_config.DB_URL, echo=True, future=True)


class DBSessionLocal:  
    __instance__ = None
    
    def __init__(self):
        self.new = sessionmaker(autocommit=False,autoflush=False, bind=engine)
        
    def get_session(self):
        return self.new()
    
    def __new__(cls):  # Singleton
        if cls.__instance__ is None:
            cls.__instance__ = super().__new__(cls)
        return cls.__instance__



