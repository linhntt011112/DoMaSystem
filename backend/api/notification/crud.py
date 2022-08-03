import functools

from loguru import logger
from exceptions import api_exceptions
from database.crud import notification as crud_notification

from .notification_push import pusher_client


def error_wrap(func):
    @functools.wraps(func)
    def wrap(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as e:
            # raise api_exceptions.NotificationException()
            logger.warning(f"Error while creating notification: {e}!")
    return wrap


# @error_wrap
def select_list_noti_template(db, **kwargs):
    return crud_notification.select_list_noti_template(db, **kwargs)


# @error_wrap
def create_notification_object(db,  actor_id, notification_template_id, entity_id):
    return crud_notification.create_notification_object(db,  actor_id, notification_template_id, entity_id)
    


# @error_wrap
def create_notification(db, notification_object_id, notifier_id):
    return crud_notification.create_notification(db, notification_object_id, notifier_id)

