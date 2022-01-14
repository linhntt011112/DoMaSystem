from typing import Optional

from fastapi import FastAPI, Form, HTTPException, Depends, Cookie, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import APIKeyCookie
from starlette.responses import HTMLResponse
from starlette import status
from jose import jwt
from pydantic import BaseModel


from config import session_config, frontend_config
from database.db import users
from session import SessionManger

from utils import as_form, OAuth2PasswordBearerWithCookie


app = FastAPI()

origins = [
    frontend_config.URL,
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)

# cookie_sec = APIKeyCookie(name="session")

secret_key = session_config.SECRET_KEY


@app.get("/")
@app.get("/login")
def login_page():
    return HTMLResponse(
        """
        <form action="/login" method="post">
        Username: <input type="text" name="username" required>
        <br>
        Password: <input type="password" name="password" required>
        <input type="submit" value="Login">
        </form>
        """
    )


@as_form
class UserIn(BaseModel):
    username: str
    password: str
    

@app.post("/login")
def login(request: Request, response: Response, user: UserIn):
    print(user)
    print(request.cookies)
    user_id = user.username
    if user_id not in users:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Invalid user or password"
        )
    db_password = users[user_id].password
    if not user.password == db_password:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Invalid user or password"
        )
    token = SessionManger.make_session_token(user_id)
    response.set_cookie("session", token, httponly=True, secure=True, samesite='none')
    return {"ok": True}


@app.post("/logout")
def logout(response: Response):
    response.set_cookie("session", "", httponly=True, secure=True, samesite='none')
    return {"ok": True}


@app.get("/get_current_user")
def read_private(request: Request):
    user_name = ""
    if "session" in request.cookies:
        session_token = str(request.cookies['session'])
        user_id = SessionManger.get_session_user_id(session_token)
        
        if user_id  in users:
            user = users[user_id]
            user_name = user.name
    return {"username": user_name,
            # 'request': request.cookies
            }