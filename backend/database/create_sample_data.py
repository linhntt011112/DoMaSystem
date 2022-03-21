# python -m database.create_sample_data.py
import datetime

from sqlalchemy.orm import session, sessionmaker
from sqlalchemy.schema import MetaData

import os
import timeit
print(os.getcwd())
from database.db import engine
from database.models import *
import database.common_queries as  common_queries 
from api.utils import Hasher


def create_tables():           # new
	Base.metadata.create_all(bind=engine)
 
 
def drop_all_tables():
    Base.metadata.drop_all(bind=engine)

    
 
def create_sample_nguoi_dung():
    
    # positions = db_session.query(Position).all()  # .filter(Position.name == 'NhanVien')
    # positions = {position.name: position for position in positions}
    
    nguoi_dung_s = [
        NguoiDung(
            ho_ten = 'Nguyen Thi A',
            ten_tai_khoan = 'nta',
            password_salt = 'salt_nta',
            password = Hasher.get_password_hash(Hasher.salt_password('nta', 'salt_nta')),
            
            ngay_sinh = datetime.datetime(1982, 2, 24),
            dia_chi = 'So 4 ngach 42 Dai hoc Bach Khoa Ha Noi',
            ngay_cap_nhat = datetime.datetime(2022, 2, 24),
            ngay_vao_lam = datetime.datetime(1982, 2, 24),
            dien_thoai = '123456789012',
            email = 'nta@gmail.com',
            
            phan_quyen = PhanQuyen.admin,
            gioi_tinh = GioiTinh.nu,
            
            cccd = '123456789012',
            ngay_cap = datetime.datetime(1982, 2, 24),
            noi_cap = 'So 4 ngach 42 Dai hoc Bach Khoa Ha Noi',
            que_quan = 'So 4 ngach 42 Dai hoc Bach Khoa Ha Noi',
            
            tk_ngan_hang = '12345678',
            ngan_hang = 'So 4 ngach 42 Dai hoc Bach Khoa Ha Noi',
            
            phong_ban = 'So 4 ngach 42 Dai hoc Bach Khoa Ha Noi',
            chuc_vu = 'So 4 ngach 42 Dai hoc Bach Khoa Ha Noi',
            hoc_van = 'So 4 ngach 42 Dai hoc Bach Khoa Ha Noi',
            dan_toc = 'So 4 ngach 42 Dai hoc Bach Khoa Ha Noi',
            quoc_tich = 'So 4 ngach 42 Dai hoc Bach Khoa Ha Noi',
            ton_giao = 'So 4 ngach 42 Dai hoc Bach Khoa Ha Noi',
            ),
        NguoiDung(
            ho_ten = 'Nguyen Van B',
            ten_tai_khoan = 'nvb',
            password_salt = 'salt_ntb',
            password = Hasher.get_password_hash(Hasher.salt_password('ntb', 'salt_ntb')),
            dia_chi = 'So 4 ngach 42 Dai hoc Bach Khoa Ho Chi Minh',
            ngay_sinh = datetime.datetime(1992, 2, 24),
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


def run_all():
    print(timeit.timeit(lambda : drop_all_tables(), number=1))
    print(timeit.timeit(lambda : create_tables(), number=1))
    print(timeit.timeit(lambda : create_sample_nguoi_dung(), number=1))
    # print(timeit.timeit(lambda : create_sample_loai_cong_van(), number=1))
    # drop_all_tables()
    # create_tables()
    # create_sample_nguoi_dung()
    # create_sample_loai_cong_van()

if __name__ == "__main__":
    run_all()