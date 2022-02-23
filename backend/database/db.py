from sqlalchemy import create_engine
from sqlalchemy.orm import session, sessionmaker

from database.config import db_config
from database.models import Base, User, Position


# class User:
#     def __init__(self, id, password, name):
#         self.password = password
#         self.name = name
#         self.id = id

# users = [
#     User("linh", "linh0111", "Linh Nguyễn"),
#     User("tan", "tan1112", "Tân Hoàng")
# ]
# users = {user.id: user for user in users}

engine = create_engine(db_config.DB_URL, future=True,
                        # echo=True  # for logging query
                        )


class DBSessionLocal:  
    __instance__ = None
    
    def __init__(self):
        self.new = sessionmaker(autocommit=False, autoflush=False, bind=engine)
        
    def get_session(self):
        return self.new()
    
    def __new__(cls):  # Singleton
        if cls.__instance__ is None:
            cls.__instance__ = super().__new__(cls)
        return cls.__instance__


def get_user_by_name(username):
    db_session = DBSessionLocal().get_session()
    possible_user = db_session.query(User).filter(User.username == username).all()
    try:
        if len(possible_user) != 1: 
            return None
        else:
            return possible_user[0]
    except:
        return None
    