from database.models import *


# db_session = DBSessionLocal().get_session()
# positions = db_session.query(Position).all()
# users = db_session.query(User).all()

# print(positions[0].as_dict())
# print(users[0].as_dict())

from common_queries import query_all

for item in query_all(NguoiDung) + query_all(LoaiCongVan):
    print(item.as_dict())
