from database.db import engine, DBSessionLocal
from database.models import User, Position


db_session = DBSessionLocal().get_session()
positions = db_session.query(Position).all()
users = db_session.query(User).all()

print(positions[0].as_dict())
print(users[0].as_dict())