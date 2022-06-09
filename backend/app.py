
   
from sys import prefix
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, APIRouter, Depends, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from loguru import logger

from config import frontend_config
from api import user, login, static_tables, cong_van


# origins = frontend_config.possible_urls
origins = [
    'localhost:3008',
    'http://localhost:3008',
    'http://127.0.0.1:3008/'
    ]
app = FastAPI()

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
router.include_router(cong_van.router)
# router.include_router(company.router)
app.include_router(router)

# @app.exception_handler(RequestValidationError)
# async def validation_exception_handler(request: Request, exc: RequestValidationError):

#     exc_str = f'{exc}'.replace('\n', ' ').replace('   ', ' ')
#     # or logger.error(f'{exc}')
#     await request.json()
#     print((request.json(), exc_str))
#     content = {'status_code': 10422, 'message': exc_str, 'data': None}
#     return JSONResponse(content=content, status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)