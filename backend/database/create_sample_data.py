import datetime

from sqlalchemy.orm import session, sessionmaker
from sqlalchemy.schema import MetaData

from database.db import DBSessionLocal, engine
from database.models import Base, User, Position
from database.utils import Hasher


def get_hash_password(password):
    return Hasher.get_password_hash(password)


def create_tables():           # new
	Base.metadata.create_all(bind=engine)
 
 
def drop_all_tables():
    Base.metadata.drop_all(bind=engine)


def create_sample_positions():
    db_session = DBSessionLocal().get_session()
    
    positions = [
        Position(name='admin'),
        Position(name='Nhan vien')
    ]
    
    [db_session.add(position) for position in positions]
    db_session.commit()
    
 
def create_sample_users():
    db_session = DBSessionLocal().get_session()
    
    positions = db_session.query(Position).all()  # .filter(Position.name == 'NhanVien')
    positions = {position.name: position for position in positions}
    
    users = [
        User(
            username = 'abc123',
            password = get_hash_password('linh0111'),
            fullname = 'Nguyen Thi B',
            dob = datetime.date(1991, 1, 1),
            address = "Ho Chi Minh",
            avatar = "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg",
            update_date = datetime.datetime.today().date(),
            position_id = positions['Nhan vien'].id,
            position = positions['Nhan vien']
            ),
        User(
            username = 'admin123',
            password = get_hash_password('linh0111'),
            fullname = 'Nguyen Thi A',
            dob = datetime.date(1991, 1, 1),
            address = "Ho Chi Minh",
            avatar = "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg",
            update_date = datetime.datetime.today().date(),
            position_id = positions['admin'].id,
            position = positions['admin']
            ),
        User(
            username = 'cnt123',
            password = get_hash_password('linh0111'),
            fullname = 'Nguyen Thi C',
            dob = datetime.date(1995, 4, 1),
            address = "205 Nguyen Xi",
            avatar = "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=338&ext=jpg",
            update_date = datetime.datetime.today().date(),
            position_id = positions['Nhan vien'].id,
            position = positions['Nhan vien']
            ),
    ]

    [db_session.add(user) for user in users]
    db_session.commit()


drop_all_tables()
create_tables()
create_sample_positions()
create_sample_users()
