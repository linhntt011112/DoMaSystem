from typing import Union
import json
import traceback
import asyncio
import async_timeout
import aioredis

from loguru  import logger
from fastapi import Cookie, Depends, FastAPI, Query, WebSocket, status, APIRouter

from ..core.user import decode_token_f
from config import server_config


router = APIRouter(prefix="/ws")


async def get_token_data(
    websocket: WebSocket,
    token: Union[str, None] = Query(default=None),
):
    
    try:
        token_data = decode_token_f(token)
        # logger.info(f"{token_data}")
        if token_data is None:
            raise ValueError()
        return token_data
    except Exception as e:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
    

@router.websocket("/")
async def websocket_endpoint(
    websocket: WebSocket,
    token_data: str = Depends(get_token_data),
):
    
    try:
        redis = aioredis.from_url(server_config.pubsub.redis_url)
        channel = redis.pubsub()
        # await channel.subscribe("test")
        await channel.subscribe(token_data["id"])
        
        await websocket.accept()
        while True:
            
            try:
                async with async_timeout.timeout(1):
                    message = await channel.get_message(ignore_subscribe_messages=True)
                    if message is not None:
                        # logger.debug(f"(Reader) Message Received: {message}")
                        # data = await websocket.receive_text()
                        # await websocket.send_text(f"{data}")
                           
                        await websocket.send_text(
                            message['data'].decode("utf8")
                        )
                    await asyncio.sleep(0.1)
            except asyncio.TimeoutError:
                pass
    except Exception as e:
        # logger.warning(f'{str(e)}: {traceback.format_exc()}')
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        
