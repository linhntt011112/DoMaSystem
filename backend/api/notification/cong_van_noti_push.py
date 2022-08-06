from database import db_models

from loguru import logger
from exceptions import api_exceptions
from database.crud import notification as crud_notification

from .notification_push import pusher_client
from .crud import error_wrap


user_fields = set(["id_nguoi_tao", "id_nguoi_ky", "id_nguoi_xu_ly", "id_nguoi_theo_doi"])

def cong_van_notify(db, cong_van: db_models.CongVan, actor: db_models.NguoiDung, notification_template_id, actor_field, event):
    notification_object = crud_notification.create_notification_object(db, actor.id, notification_template_id, cong_van.id)
    msg = {
        "id": notification_object.id,
        "{{actor_id}}": actor.ho_ten,
        "{{entity_id}}": cong_van.id,
        "entity_type": notification_object.notification_template.entity_type,
        "template": notification_object.notification_template.template,
        "create_on": notification_object.created_on
    }
    
    # cvversion_data_dict = cong_van.cong_van_current_version.__dict__
    # logger.info(cvversion_data_dict)
    
    not_notify = {actor_field}
    if cong_van.cong_van_current_version.id_tinh_trang_xu_ly < 2:
        not_notify.add("id_nguoi_xu_ly")  # nguoi xu ly chua nhan duoc do chua duyet 
    
    notified = set()
    for field in user_fields:
        if field not in not_notify:
            notifier_id = getattr(cong_van.cong_van_current_version, field)
            if notifier_id is not None and notifier_id != actor.id and notifier_id not in notified:
                crud_notification.create_notitfication(db, notification_object.id, notifier_id)
                logger.info(f"{str(notifier_id), event, msg}")
                pusher_client.trigger(str(notifier_id), event, msg)
                notified.add(notifier_id)
    
    return notification_object

    

def create_cong_van_notify(db, cong_van: db_models.CongVan, actor: db_models.NguoiDung):
    return cong_van_notify(db, cong_van, actor, notification_template_id=1, actor_field="id_nguoi_tao", event="create_cong_van")


def update_cong_van_notify(db, cong_van: db_models.CongVan, actor: db_models.NguoiDung):
    actor_field = None
    for field in user_fields:
        if cong_van.cong_van_current_version.id_nguoi_cap_nhat == getattr(cong_van.cong_van_current_version, field):
            actor_field = field
            break
    return cong_van_notify(db, cong_van, actor, notification_template_id=2, actor_field=actor_field, event="update_cong_van")


def duyet_cong_van_notify(db, cong_van: db_models.CongVan, actor: db_models.NguoiDung):
    return cong_van_notify(db, cong_van, actor, notification_template_id=3, actor_field="id_nguoi_ky", event="duyet_cong_van")


def xu_ly_cong_van_notify(db, cong_van: db_models.CongVan, actor: db_models.NguoiDung):
    return cong_van_notify(db, cong_van, actor, notification_template_id=4, actor_field="id_nguoi_xu_ly", event="xu_ly_cong_van")


def add_trao_doi_cong_van_notify(db, cong_van: db_models.CongVan, actor: db_models.NguoiDung):
    return cong_van_notify(db, cong_van, actor, notification_template_id=5, actor_field="", event="add_trao_doi_cong_van")

