# python -m database.create_sample_data
import datetime

from sqlalchemy.orm import session, sessionmaker
from sqlalchemy.schema import MetaData

import os
import timeit
# print(os.getcwd())
from database.db import engine, get_session
from database import db_models
from database.db_models import *
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

    # common_queries.add_and_commit(nguoi_dung_s)
    [common_queries.add_and_commit(get_session(), nguoi_dung) for nguoi_dung in nguoi_dung_s]
    
    
def create_sample_loai_cong_van():
    session = get_session()
    # nguoi_dung_s = common_queries.query_all(session, NguoiDung)
    # nguoi_dung_s = {nguoi_dung.ten_tai_khoan: nguoi_dung for nguoi_dung in nguoi_dung_s}
    
    # loai_cong_van_s = [
    #     LoaiCongVan(
    #         loai_cong_van = 'loai 1',
    #         trang_thai = TrangThaiLoaiCongVan.hoat_dong,
    #         ngay_cap_nhat = datetime.datetime(2022, 2, 24),
    #         ma_nguoi_cap_nhat = nguoi_dung_s['nta'].ma_nguoi_dung,
    #         mo_ta = 'chua co gi',
    #         ),
    # ]
    
    # ass_nguoi_dung_cong_van1 = AssociationNguoiKiCongVan()
    # ass_nguoi_dung_cong_van1.nguoi_ki = nguoi_dung_s['nta']
    # loai_cong_van_s[0].nguoi_ki_s.append(ass_nguoi_dung_cong_van1)
    #
    # [common_queries.add_and_commit(session, obj) for obj in [loai_cong_van_s[0], ass_nguoi_dung_cong_van1]]

def create_sample_static_table():
    phong_ban_s = [
        db_models.PhongBan(phong_ban="Phòng kế toán"),
        db_models.PhongBan(phong_ban="Phòng hành chính"),
        db_models.PhongBan(phong_ban="Phòng kiểm toán"),
        db_models.PhongBan(phong_ban="Phòng chăm sóc khách hàng"),
        db_models.PhongBan(phong_ban="Phòng nhân sự"),
        db_models.PhongBan(phong_ban="Phòng Công nghệ thông tin"),
        db_models.PhongBan(phong_ban="Phòng Quan hệ quốc tế"),
        db_models.PhongBan(phong_ban="Phòng Marketing"),
        db_models.PhongBan(phong_ban="Phòng Nghiên cứu và phát triển sản phẩm"),
        db_models.PhongBan(phong_ban="Phòng kinh doanh"),
        db_models.PhongBan(phong_ban="Phòng thu mua"),
    ]
    [common_queries.add_and_commit(get_session(), obj) for obj in phong_ban_s]

    chuc_vu_s = [
        db_models.ChucVu(chuc_vu="Giám đốc điều hành"),
        db_models.ChucVu(chuc_vu="Giám đốc tài chính"),
        db_models.ChucVu(chuc_vu="Giám đốc Marketing"),
        db_models.ChucVu(chuc_vu="Giám đốc pháp lý"),
        db_models.ChucVu(chuc_vu="Giám đốc thương mại"),
        db_models.ChucVu(chuc_vu="Giám đốc vận hành"),
    ]
    [common_queries.add_and_commit(get_session(), obj) for obj in chuc_vu_s]

    hoc_van_s = [
        db_models.HocVan(hoc_van="Thạc sĩ"),
        db_models.HocVan(hoc_van="Tiến sĩ"),
        db_models.HocVan(hoc_van="Cao đẳng"),
        db_models.HocVan(hoc_van="Cử nhân"),
    ]
    [common_queries.add_and_commit(get_session(), obj) for obj in hoc_van_s]

    dan_toc_s = [
        db_models.DanToc(dan_toc="Kinh"),
        db_models.DanToc(dan_toc="Tày"),
        db_models.DanToc(dan_toc="Thái"),
    ]
    [common_queries.add_and_commit(get_session(), obj) for obj in dan_toc_s]


def run_all():
    print(timeit.timeit(lambda : drop_all_tables(), number=1))
    print(timeit.timeit(lambda : create_tables(), number=1))
    print(timeit.timeit(lambda : create_sample_nguoi_dung(), number=1))
    print(timeit.timeit(lambda : create_sample_loai_cong_van(), number=1))
    print(timeit.timeit(lambda : create_sample_static_table(), number=1))
    # drop_all_tables()
    # create_tables()
    # create_sample_nguoi_dung()
    # create_sample_loai_cong_van()

run_all()