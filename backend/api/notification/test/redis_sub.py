import asyncio

import async_timeout

import aioredis

STOPWORD = "STOP"
CHANNEL = 'test'

async def reader():
    redis = aioredis.from_url("redis://default:DMS@localhost:3012/1")
    channel = redis.pubsub()
    await channel.subscribe(CHANNEL)
    while True:
        try:
            async with async_timeout.timeout(1):
                message = await channel.get_message(ignore_subscribe_messages=True)
                if message is not None:
                    print(f"(Reader) Message Received: {message}")
                    if message["data"].decode() == STOPWORD:
                        print("(Reader) STOP")
                        break
                await asyncio.sleep(0.01)
        except asyncio.TimeoutError:
            pass



if __name__ == "__main__":
    asyncio.run(reader())