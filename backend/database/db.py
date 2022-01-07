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


def create_tables():           # new
	Base.metadata.create_all(bind=engine)
 
 
def create_sample_data():
    db_session = DBSessionLocal().get_session()
    pos1 = db_session.query(Position).filter(Position.name == 'NhanVien').all()[0]
    users = [
        Person(username='linh', password='linh0111', position_id=pos1.id, position=pos1),
        Person(username='Tan', password='tan1112', position_id=pos1.id, position=pos1)
    ]

    [db_session.add(user) for user in users]
    db_session.commit()
 


create_tables()
create_sample_data()
# create

