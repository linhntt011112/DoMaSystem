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

    

def create_sample_static_table():
    now = datetime.datetime.now()
    phong_ban_s = [
        db_models.PhongBan(name="Phòng kế toán", update_at=now),
        db_models.PhongBan(name="Phòng hành chính", update_at=now),
        db_models.PhongBan(name="Phòng kiểm toán", update_at=now),
        db_models.PhongBan(name="Phòng chăm sóc khách hàng", update_at=now),
        db_models.PhongBan(name="Phòng nhân sự", update_at=now),
        db_models.PhongBan(name="Phòng Công nghệ thông tin", update_at=now),
        db_models.PhongBan(name="Phòng Quan hệ quốc tế", update_at=now),
        db_models.PhongBan(name="Phòng Marketing", update_at=now),
        db_models.PhongBan(name="Phòng Nghiên cứu và phát triển sản phẩm", update_at=now),
        db_models.PhongBan(name="Phòng kinh doanh", update_at=now),
        db_models.PhongBan(name="Phòng thu mua", update_at=now),
    ]
    [common_queries.add_and_commit(get_session(), obj) for obj in phong_ban_s]

    chuc_vu_s = [
        db_models.ChucVu(name="Nhân viên", update_at=now),
        db_models.ChucVu(name="Giám đốc điều hành", update_at=now),
        db_models.ChucVu(name="Giám đốc tài chính", update_at=now),
        db_models.ChucVu(name="Giám đốc Marketing", update_at=now),
        db_models.ChucVu(name="Giám đốc pháp lý", update_at=now),
        db_models.ChucVu(name="Giám đốc thương mại", update_at=now),
        db_models.ChucVu(name="Giám đốc vận hành", update_at=now),
    ]
    [common_queries.add_and_commit(get_session(), obj) for obj in chuc_vu_s]

    hoc_van_s = [
        db_models.HocVan(name="Thạc sĩ", update_at=now),
        db_models.HocVan(name="Tiến sĩ", update_at=now),
        db_models.HocVan(name="Cao đẳng", update_at=now),
        db_models.HocVan(name="Cử nhân", update_at=now),
    ]
    [common_queries.add_and_commit(get_session(), obj) for obj in hoc_van_s]

    dan_toc_s = [
        db_models.DanToc(name="Kinh", update_at=now),
        db_models.DanToc(name="Tày", update_at=now),
        db_models.DanToc(name="Thái", update_at=now),
        db_models.DanToc(name="Khác", update_at=now),
    ]
    [common_queries.add_and_commit(get_session(), obj) for obj in dan_toc_s]

    quoc_tich_s = [
        db_models.QuocTich(name="Việt Nam", update_at=now),
        db_models.QuocTich(name="Khác", update_at=now),
    ]
    [common_queries.add_and_commit(get_session(), obj) for obj in quoc_tich_s]

    ton_giao_s = [
        db_models.TonGiao(name="Không", update_at=now),
        db_models.TonGiao(name="Phật Giáo", update_at=now),
        db_models.TonGiao(name="Công Giáo", update_at=now),
        db_models.TonGiao(name="Tin Lành", update_at=now),
        db_models.TonGiao(name="Hồi Giáo", update_at=now),
        db_models.TonGiao(name="Cao Đài", update_at=now),
        db_models.TonGiao(name="Hòa Hảo", update_at=now),
    ]
    [common_queries.add_and_commit(get_session(), obj) for obj in ton_giao_s]
    
    
    tinh_trang_xu_ly_s = [
        db_models.TinhTrangXuLy(name="Đang chờ duyệt và kí", update_at=now),
        db_models.TinhTrangXuLy(name="Đang chờ xử lý", update_at=now),
        db_models.TinhTrangXuLy(name="Đã xử lý", update_at=now),
    ]
    [common_queries.add_and_commit(get_session(), obj) for obj in tinh_trang_xu_ly_s]
    
    
    # muc_do_bao_mat_s = [
    #     db_models.MucDoBaoMat(name="1", update_at=now),
    #     db_models.MucDoBaoMat(name="2", update_at=now),
    #     db_models.MucDoBaoMat(name="3", update_at=now),
    # ]
    # [common_queries.add_and_commit(get_session(), obj) for obj in muc_do_bao_mat_s]
    
    
    muc_do_uu_tien_s = [
        db_models.MucDoUuTien(name="1", update_at=now),
        db_models.MucDoUuTien(name="2", update_at=now),
        db_models.MucDoUuTien(name="3", update_at=now),
    ]
    [common_queries.add_and_commit(get_session(), obj) for obj in muc_do_uu_tien_s]




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
            password_salt = 'salt_nvb',
            password = Hasher.get_password_hash(Hasher.salt_password('nvb', 'salt_nvb')),
            dia_chi = 'So 4 ngach 42 Dai hoc Bach Khoa Ho Chi Minh',
            ngay_sinh = datetime.datetime(1992, 2, 24),
            ngay_cap_nhat = datetime.datetime(2022, 2, 24),
            
            phan_quyen = PhanQuyen.user,
            gioi_tinh = GioiTinh.nam,
            
            cccd = '234567890121',
            
            tk_ngan_hang = '23456781',
            id_phong_ban = 2,
            id_chuc_vu = 1,
            ),
        NguoiDung(
            ho_ten = 'Nguyen Thi C',
            ten_tai_khoan = 'ntc',
            password_salt = 'salt_ntc',
            password = Hasher.get_password_hash(Hasher.salt_password('ntc', 'salt_ntc')),
            dia_chi = 'So 4 ngach 42 Dai hoc Bach Khoa Ho Chi Minh',
            ngay_sinh = datetime.datetime(1992, 2, 24),
            ngay_cap_nhat = datetime.datetime(2022, 2, 24),
            
            phan_quyen = PhanQuyen.user,
            gioi_tinh = GioiTinh.nu,
            
            cccd = '234567890121',
            
            tk_ngan_hang = '23456781',
            id_phong_ban = 3,
            id_chuc_vu = 3,
            ),
        NguoiDung(
            ho_ten = 'Nguyen Van D',
            ten_tai_khoan = 'nvd',
            password_salt = 'salt_nvd',
            password = Hasher.get_password_hash(Hasher.salt_password('ntd', 'salt_nvd')),
            dia_chi = 'So 4 ngach 42 Dai hoc Bach Khoa Ho Chi Minh',
            ngay_sinh = datetime.datetime(1992, 2, 24),
            ngay_cap_nhat = datetime.datetime(2022, 2, 24),
            
            phan_quyen = PhanQuyen.user,
            gioi_tinh = GioiTinh.nam,
            
            cccd = '234567890121',
            
            tk_ngan_hang = '23456781',
            id_phong_ban = 4,
            id_chuc_vu = 4,
            ),
    ]

    # common_queries.add_and_commit(nguoi_dung_s)
    [common_queries.add_and_commit(get_session(), nguoi_dung) for nguoi_dung in nguoi_dung_s]
    
    
def create_sample_loai_cong_van():
    
    loai_cong_van_s = [
        LoaiCongVan(
            ma_loai = 'cv1',
            name='loai 1',
            trang_thai = TrangThaiLoaiCongVan.hoat_dong,
            
            id_nguoi_cap_nhat=1,
            thoi_gian_cap_nhat = datetime.datetime.now(),
            
            mo_ta = 'cv loai 1',
            ),
        LoaiCongVan(
            ma_loai = 'cv2',
            name='loai 2',
            trang_thai = TrangThaiLoaiCongVan.hoat_dong,
            
            id_nguoi_cap_nhat=1,
            thoi_gian_cap_nhat = datetime.datetime.now() - datetime.timedelta(days=1),
            
            mo_ta = 'cv loai 2',
            ),
    ]
    
    [common_queries.add_and_commit(get_session(), loai_cong_van) for loai_cong_van in loai_cong_van_s]


def create_sample_notification():
    notification_templates = [
        NotificationTemplate(
            entity_type="cong_van",
            template="{{actor_id}} đã thêm mới công văn {{entity_id}}"
        ),
        NotificationTemplate(
            entity_type="cong_van",
            template="{{actor_id}} đã sửa đổi công văn {{entity_id}}"
        ),
        NotificationTemplate(
            entity_type="cong_van",
            template="{{actor_id}} đã  duyệt công văn {{entity_id}}"
        ),
        NotificationTemplate(
            entity_type="cong_van",
            template="{{actor_id}} đã xử lý công văn {{entity_id}}"
        ),
        NotificationTemplate(
            entity_type="cong_van",
            template="{{actor_id}} đã thêm một trao đổi về công văn {{entity_id}}"
        )
    ]
    [common_queries.add_and_commit(get_session(), notification_template) for notification_template in notification_templates]



def run_all():
    # print(timeit.timeit(lambda : drop_all_tables(), number=1))
    # print(timeit.timeit(lambda : create_tables(), number=1))
    # print(timeit.timeit(lambda : create_sample_static_table(), number=1))
    # print(timeit.timeit(lambda : create_sample_nguoi_dung(), number=1))
    # print(timeit.timeit(lambda : create_sample_loai_cong_van(), number=1))
    
    
    
    # db_models.TraoDoiCongVan.__table__.drop(engine)
    # db_models.Lich.__table__.create(engine)
    
    # db_models.Notification.__table__.drop(engine)
    # db_models.NotificationObject.__table__.drop(engine)
    # db_models.NotificationTemplate.__table__.drop(engine)
    
    
    db_models.NotificationTemplate.__table__.create(engine)
    db_models.NotificationObject.__table__.create(engine)
    db_models.Notification.__table__.create(engine)
    print(timeit.timeit(lambda : create_sample_notification(), number=1))
    
    # drop_all_tables()
    # create_tables()
    # create_sample_nguoi_dung()
    # create_sample_loai_cong_van()
    pass

run_all()