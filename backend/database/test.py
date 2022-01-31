from database.db import engine, DBSessionLocal
from database.models import User, Position


# db_session = DBSessionLocal().get_session()
# positions = db_session.query(Position).all()
# users = db_session.query(User).all()

# print(positions[0].as_dict())
# print(users[0].as_dict())

from db import get_user_by_name

user = get_user_by_name('abc123')
if user is not None:
    print(user.as_dict())

else:
    print('Not found!')