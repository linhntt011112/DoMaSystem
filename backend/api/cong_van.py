from fastapi import Depends, FastAPI, APIRouter, HTTPException, status
from pydantic import BaseModel
from jose import JWTError, jwt

from database.models import *
from database.common_queries import query_all, query_filter

from .user import get_current_user

