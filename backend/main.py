from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, APIRouter, Depends, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from config import frontend_config
from api import user, login


origins = [
    frontend_config.URL,
]
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)

app_router = APIRouter(prefix='/api')
app_router.include_router(user.router )
app_router.include_router(login.router)
app.include_router(app_router)

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):

    exc_str = f'{exc}'.replace('\n', ' ').replace('   ', ' ')
    # or logger.error(f'{exc}')
    await request.json()
    print((request.json(), exc_str))
    content = {'status_code': 10422, 'message': exc_str, 'data': None}
    return JSONResponse(content=content, status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)