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
        "{{actor_id}}": actor.ho_ten,
        "{{entity_id}}": cong_van.cong_van_current_version.ten_cong_van,
        "template": notification_object.notification_template.template
    }
    # for field in user_fields:
    #     if field != actor_field:
    #         notifier_id = getattr(cong_van, field)
    #         crud_notification.create_notitfication(db, notification_object.id, notifier_id)
    #         pusher_client.trigger(notifier_id, event, msg)
    
    return notification_object

    

def create_cong_van_notify(db, cong_van: db_models.CongVan, actor: db_models.NguoiDung):
    return cong_van_notify(db, cong_van, actor, notification_template_id=1, actor_field="id_nguoi_tao", event="create_cong_van")


def update_cong_van_notify(db, cong_van: db_models.CongVan, actor: db_models.NguoiDung):
    actor_field = "id_nguoi_tao"
    for field in actor_field:
        if cong_van.cong_van_current_version.id_nguoi_cap_nhat == getattr(cong_van, field):
            actor_field = field
            break
    return cong_van_notify(db, cong_van, actor, notification_template_id=1, actor_field=actor_field, event="update_cong_van")


def duyet_cong_van_notify(db, cong_van: db_models.CongVan, actor: db_models.NguoiDung):
    return cong_van_notify(db, cong_van, actor, notification_template_id=1, actor_field="id_nguoi_ky", event="duyet_cong_van")


def xu_ly_cong_van_notify(db, cong_van: db_models.CongVan, actor: db_models.NguoiDung):
    return cong_van_notify(db, cong_van, actor, notification_template_id=1, actor_field="id_nguoi_xu_ly", event="create_cong_van")



