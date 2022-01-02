from typing import Dict

from fastapi import HTTPException
from fastapi.security import APIKeyCookie
from starlette import status
from config import session_config
from jose import jwt

from database.db import users


class SessionManger:
    __instance__ = None
    
    def __init__(self):
        self.sessions: Dict[APIKeyCookie] = dict()
    
    def __new__(cls):  # Singleton
        if cls.__instance__ is None:
            cls.__instance__ = super().__new__(cls)
        return cls.__instance__
    
    @staticmethod
    def get_session_user_id(session_token):
        # print(session)
        try:
            payload = jwt.decode(session_token, session_config.SECRET_KEY)
            user_id = payload["sub"]
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, detail="Invalid authentication with error: {}".format(e)
            )
        # print(user_id, users)
        if user_id not in users:
            user_id = None
        return user_id
    
    @staticmethod       
    def make_session_token(user_id):
        return jwt.encode({"sub": user_id}, session_config.SECRET_KEY)
