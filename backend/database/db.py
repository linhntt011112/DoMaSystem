import os

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

from config import db_config


engine = create_engine(db_config.DB_URL, 
                    #    future=True,
                       query_cache_size=1000,
                        # echo=True, # for logging query,
                        pool_pre_ping=True,
                        )

Session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))

def get_db():
    try:
        db = Session()
        yield db
    except:
        db.rollback()
        raise
    finally:
        db.close()

def get_session():
    return Session()
