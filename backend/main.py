from typing import Optional

from fastapi import FastAPI, Form, HTTPException, Depends, Cookie, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import APIKeyCookie
from starlette.responses import HTMLResponse
from starlette import status
from jose import jwt
from pydantic import Bas

from config import session_config
from database.db import users
from session import SessionManger


app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
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


class 

@app.post("/login")
def login(response: Response, username: str, password: str):
    print(response)
    user_id = username
    if user_id not in users:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Invalid user or password"
        )
    db_password = users[user_id].password
    if not password == db_password:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Invalid user or password"
        )
    token = SessionManger.make_session_token(user_id)
    response.set_cookie("session", token)
    return {"ok": True}


@app.get("/logout")
def logout(response: Response):
    response.delete_cookie("session")
    return {"ok": True}


@app.get("/private")
def read_private(request: Request):
    if "session" not in request.cookies:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Please login!"
        )
    session_token = str(request.cookies['session'])
    user_id = SessionManger.get_session_user_id(session_token)
    if user_id not in users:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Please login!"
        )
    user = users[user_id]
    return {"username": user.name,
            # 'request': request.cookies
            }