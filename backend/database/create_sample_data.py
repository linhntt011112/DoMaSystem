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
            id_phong_ban = 1,
            id_chuc_vu = 2,
            id_hoc_van = 1,
            id_dan_toc = 3,
            id_quoc_tich = 2,
            id_ton_giao = 1
            
            # name = 1,
            # name = 2,
            # name = 'So 4 ngach 42 Dai hoc Bach Khoa Ha Noi',
            # name = 'So 4 ngach 42 Dai hoc Bach Khoa Ha Noi',
            # name = 'So 4 ngach 42 Dai hoc Bach Khoa Ha Noi',
            # name = 'So 4 ngach 42 Dai hoc Bach Khoa Ha Noi',
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
        db_models.PhongBan(name="Phòng kế toán"),
        db_models.PhongBan(name="Phòng hành chính"),
        db_models.PhongBan(name="Phòng kiểm toán"),
        db_models.PhongBan(name="Phòng chăm sóc khách hàng"),
        db_models.PhongBan(name="Phòng nhân sự"),
        db_models.PhongBan(name="Phòng Công nghệ thông tin"),
        db_models.PhongBan(name="Phòng Quan hệ quốc tế"),
        db_models.PhongBan(name="Phòng Marketing"),
        db_models.PhongBan(name="Phòng Nghiên cứu và phát triển sản phẩm"),
        db_models.PhongBan(name="Phòng kinh doanh"),
        db_models.PhongBan(name="Phòng thu mua"),
    ]
    [common_queries.add_and_commit(get_session(), obj) for obj in phong_ban_s]

    chuc_vu_s = [
        db_models.ChucVu(name="Giám đốc điều hành"),
        db_models.ChucVu(name="Giám đốc tài chính"),
        db_models.ChucVu(name="Giám đốc Marketing"),
        db_models.ChucVu(name="Giám đốc pháp lý"),
        db_models.ChucVu(name="Giám đốc thương mại"),
        db_models.ChucVu(name="Giám đốc vận hành"),
    ]
    [common_queries.add_and_commit(get_session(), obj) for obj in chuc_vu_s]

    hoc_van_s = [
        db_models.HocVan(name="Thạc sĩ"),
        db_models.HocVan(name="Tiến sĩ"),
        db_models.HocVan(name="Cao đẳng"),
        db_models.HocVan(name="Cử nhân"),
    ]
    [common_queries.add_and_commit(get_session(), obj) for obj in hoc_van_s]

    dan_toc_s = [
        db_models.DanToc(name="Kinh"),
        db_models.DanToc(name="Tày"),
        db_models.DanToc(name="Thái"),
        db_models.DanToc(name="Khác"),
    ]
    [common_queries.add_and_commit(get_session(), obj) for obj in dan_toc_s]

    quoc_tich_s = [
        db_models.QuocTich(name="Việt Nam"),
        db_models.QuocTich(name="Khác"),
    ]
    [common_queries.add_and_commit(get_session(), obj) for obj in quoc_tich_s]

    ton_giao_s = [
        db_models.TonGiao(name="Không"),
        db_models.TonGiao(name="Phật Giáo"),
        db_models.TonGiao(name="Công Giáo"),
        db_models.TonGiao(name="Tin Lành"),
        db_models.TonGiao(name="Hồi Giáo"),
        db_models.TonGiao(name="Cao Đài"),
        db_models.TonGiao(name="Hòa Hảo"),
    ]
    [common_queries.add_and_commit(get_session(), obj) for obj in ton_giao_s]


def run_all():
    print(timeit.timeit(lambda : drop_all_tables(), number=1))
    print(timeit.timeit(lambda : create_tables(), number=1))
    print(timeit.timeit(lambda : create_sample_static_table(), number=1))
    print(timeit.timeit(lambda : create_sample_nguoi_dung(), number=1))
    print(timeit.timeit(lambda : create_sample_loai_cong_van(), number=1))
    # drop_all_tables()
    # create_tables()
    # create_sample_nguoi_dung()
    # create_sample_loai_cong_van()

run_all()