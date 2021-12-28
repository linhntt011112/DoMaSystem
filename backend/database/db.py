from sqlalchemy import create_engine
from sqlalchemy.orm import session, sessionmaker

from database.config import db_config
from database.models import Base


engine = create_engine(db_config.DB_URL, echo=True, future=True)


class SessionLocal:  
    __instance__ = None
    
    def __init__(self):
        self.new = sessionmaker(autocommit=False,autoflush=False, bind=self.engine)
    
    def __new__(cls):  # Singleton
        if cls.__instance__ is None:
            cls.__instance__ = super().__new__(cls)
        return cls.__instance__

def create_tables():           #new
	Base.metadata.create_all(bind=engine)
 

create_tables()