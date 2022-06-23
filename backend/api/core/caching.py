from typing import Optional
from loguru import logger
from fastapi import Request, Response
from fastapi_cache import FastAPICache
from fastapi_cache.decorator import cache
from redis import asyncio as aioredis

from config import server_config


DEFAULT_KEY_PREFIX = server_config.app_name


def gen_obj_cache_key(obj):
    return f'{DEFAULT_KEY_PREFIX}:{obj.__name__}:{obj.id}'


def static_tables_key_builder(
    func,
    namespace: Optional[str] = "",
    request: Request = None,
    response: Response = None,
    *args,
    **kwargs,
):
    # logger.debug(f"{args}")
    # logger.debug(f"{kwargs}")
    kwargs = kwargs['kwargs']
    prefix = FastAPICache.get_prefix()
    static_table_name = kwargs['static_table_name']
    current_user = kwargs['current_user'] 
    cache_key = f"{prefix}:{namespace}:{static_table_name}:{current_user.id}:{func.__module__}:{func.__name__}"
    # cache_key = f"{prefix}:{namespace}:{func.__module__}:{func.__name__}:{args}:{kwargs}"
    return cache_key



def user_token_key_builder(
    func,
    namespace: Optional[str] = "",
    request: Request = None,
    response: Response = None,
    *args,
    **kwargs,
):
    # logger.debug(f"{args}")
    # logger.debug(f"{kwargs}")
    kwargs = kwargs['kwargs']
    prefix = FastAPICache.get_prefix()
    token = kwargs['token']
    cache_key = f"{prefix}:{namespace}:{token}:{func.__module__}:{func.__name__}"
    # cache_key = f"{prefix}:{namespace}:{func.__module__}:{func.__name__}:{args}:{kwargs}"
    return cache_key


async def reset_cache(namespace: str):
    redis_conn: aioredis.Redis = FastAPICache.get_backend().redis
    prefix = FastAPICache.get_prefix()
    async for key in redis_conn.scan_iter(f"{prefix}:{namespace}"):
        await redis_conn.delete(key)

    return True

