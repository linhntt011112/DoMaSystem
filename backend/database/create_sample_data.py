from sqlalchemy.orm import session, sessionmaker

from database.db import DBSessionLocal, engine
from database.models import Base, Person, Position

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
 


# create_tables()
# create_sample_data()
# create
