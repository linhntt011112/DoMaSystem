from datetime import datetime

from .. import common_queries, db_models

from loguru import logger
from exceptions import db_exceptions



def select_list_noti_template(db, **kwargs):
    list_of_objs = common_queries.select_with_options(db, db_models.NotificationTemplate, **kwargs)
    return list_of_objs


def create_notification_object(db,  actor_id, notification_template_id, entity_id):
    now = datetime.now()
    notification_object = db_models.NotificationObject(
        notification_template_id=notification_template_id,
        created_on=now,
        actor_id=actor_id,
        entity_id=entity_id
    )
    return common_queries.add_and_commit(db, notification_object)



def select_list_unread_notification(db, user_id, **kwargs):
    condition = (db_models.Notification.notifier_id == user_id) & (db_models.Notification.status == db_models.NotificationStatus.unread)
    list_of_objs = common_queries.select_with_options(db, db_models.Notification, condition=condition, 
                                                      join_field=db_models.Notification.notification_object, desc=db_models.NotificationObject.created_on, **kwargs)
    return list_of_objs


def select_list_read_notification(db, user_id, **kwargs):
    condition = (db_models.Notification.notifier_id == user_id) & (db_models.Notification.status == db_models.NotificationStatus.read)
    list_of_objs = common_queries.select_with_options(db, db_models.Notification, condition=condition, 
                                                      join_field=db_models.Notification.notification_object, desc=db_models.NotificationObject.created_on, **kwargs)
    return list_of_objs


def create_notitfication(db, notification_object_id, notifier_id):
    notification = db_models.Notification(
        notification_object_id=notification_object_id,
        notifier_id=notifier_id,
        status=db_models.NotificationStatus.unread
    )
    return common_queries.add_and_commit(db, notification)



def mark_as_read(db, user_id, notification_id):
    db.query(db_models.Notification).filter(db_models.Notification.id == notification_id, db_models.Notification.notifier_id==user_id).\
        update({db_models.Notification.status: db_models.NotificationStatus.read}, synchronize_session=False)
    db.commit()
    return True



def mark_all_as_read(db, user_id):
    db.query(db_models.Notification).filter(db_models.Notification.notifier_id == user_id, db_models.Notification.status == db_models.NotificationStatus.unread).\
        update({db_models.Notification.status: db_models.NotificationStatus.read}, synchronize_session=False)
    db.commit()
    return True
