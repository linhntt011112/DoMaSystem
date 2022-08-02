from sys import prefix
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, APIRouter, Depends, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from loguru import logger

from redis import asyncio as aioredis
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend

from config import frontend_config, server_config
from api import user, login, static_tables, cong_van, common, cong_van_version, loai_cong_van, api_utils


origins = frontend_config.possible_urls
# origins = [
#     'localhost:3008',
#     'http://localhost:3008',
#     'http://127.0.0.1:3008/'
#     ]

app = FastAPI(title=server_config.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)

router = APIRouter(prefix='/api/v1')
router.include_router(user.router)
router.include_router(login.router)
router.include_router(static_tables.router)
router.include_router(common.router)
router.include_router(loai_cong_van.router)
router.include_router(cong_van.router)
router.include_router(cong_van_version.router)
router.include_router(api_utils.router)
app.include_router(router)


@app.on_event("startup")
async def startup():
    redis = aioredis.from_url(server_config.caching.redis_url, encoding="utf8", decode_responses=True)
    FastAPICache.init(RedisBackend(redis), prefix=server_config.app_name, expire=server_config.caching.default_expiration_time_in_seconds)
    

@app.on_event("shutdown")
def shutdown_event():
    logger.info("Application shutdown")

# @app.exception_handler(RequestValidationError)
# async def validation_exception_handler(request: Request, exc: RequestValidationError):

#     exc_str = f'{exc}'.replace('\n', ' ').replace('   ', ' ')
#     # or logger.error(f'{exc}')
#     await request.json()
#     print((request.json(), exc_str))
#     content = {'status_code': 10422, 'message': exc_str, 'data': None}
#     return JSONResponse(content=content, status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)