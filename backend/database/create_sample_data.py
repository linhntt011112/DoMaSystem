import datetime

from sqlalchemy.orm import session, sessionmaker
from sqlalchemy.schema import MetaData

from database.db import engine
from database.models import *
import database.common_queries as  common_queries 
from database.utils import Hasher


def get_hash_password(password):
    return Hasher.get_password_hash(password)


def create_tables():           # new
	Base.metadata.create_all(bind=engine)
 
 
def drop_all_tables():
    Base.metadata.drop_all(bind=engine)


# def create_sample_positions():
#     db_session = DBSessionLocal().get_session()
    
#     positions = [
#         Position(name='admin'),
#         Position(name='Nhan vien')
#     ]
    
#     [db_session.add(position) for position in positions]
#     db_session.commit()
    
 
def create_sample_nguoi_dung():
    
    # positions = db_session.query(Position).all()  # .filter(Position.name == 'NhanVien')
    # positions = {position.name: position for position in positions}
    
    nguoi_dung_s = [
        NguoiDung(
            ho_ten = 'Nguyen Thi A',
            ten_tai_khoan = 'nta',
            password = get_hash_password('nta'),
            # ngay_sinh = Column(Date, nullable=True)
            # dia_chi = Column(String(100), nullable=True)
            ngay_cap_nhat = datetime.datetime(2022, 2, 24),
            # ngay_vao_lam = Column(Date, nullable=True)
            # dien_thoai = Column(String(15), nullable=True)
            # email = Column(String(15), nullable=True)
            
            phan_quyen = PhanQuyen.admin,
            gioi_tinh = GioiTinh.nu,
            
            cccd = '123456789012',
            # ngay_cap = Column(Date, nullable=True)
            # noi_cap = Column(String(100), nullable=True)
            # que_quan = Column(String(100), nullable=True)
            
            tk_ngan_hang = '12345678',
            # ngan_hang = Column(String(100), nullable=True)
            
            # phong_ban = Column(String(100), nullable=True)
            # chuc_vu = Column(String(100), nullable=True)
            # hoc_van = Column(String(100), nullable=True)
            # dan_toc = Column(String(100), nullable=True)
            # quoc_tich = Column(String(100), nullable=True)
            # ton_giao = Column(String(100), nullable=True)
            ),
        NguoiDung(
            ho_ten = 'Nguyen Van B',
            ten_tai_khoan = 'nvb',
            password = get_hash_password('nvb'),
            ngay_cap_nhat = datetime.datetime(2022, 2, 24),
            
            phan_quyen = PhanQuyen.user,
            gioi_tinh = GioiTinh.nam,
            
            cccd = '234567890121',
            
            tk_ngan_hang = '23456781',
            ),
    ]

    common_queries.add_and_commit(nguoi_dung_s)
    
    
def create_sample_loai_cong_van():
    nguoi_dung_s = common_queries.query_all(NguoiDung)
    nguoi_dung_s = {nguoi_dung.ten_tai_khoan: nguoi_dung for nguoi_dung in nguoi_dung_s}
    
    loai_cong_van_s = [
        LoaiCongVan(
            loai_cong_van = 'loai 1',
            trang_thai = TrangThaiLoaiCongVan.hoat_dong,
            ngay_cap_nhat = datetime.datetime(2022, 2, 24),
            ma_nguoi_cap_nhat = nguoi_dung_s['nta'].ma_nguoi_dung,
            mo_ta = 'chua co gi',
            ),
    ]
    
    ass_nguoi_dung_cong_van1 = AssociationNguoiKiCongVan()
    ass_nguoi_dung_cong_van1.nguoi_ki = nguoi_dung_s['nta']
    loai_cong_van_s[0].nguoi_ki_s.append(ass_nguoi_dung_cong_van1)

    common_queries.add_and_commit([loai_cong_van_s[0], ass_nguoi_dung_cong_van1])


drop_all_tables()
create_tables()
create_sample_nguoi_dung()
create_sample_loai_cong_van()
