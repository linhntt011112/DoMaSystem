import redis
import aioredis
import time
import asyncio

CHANNEL = 'test'

async def main():
    r = aioredis.from_url("redis://default:DMS@localhost:3012/1")
    while True:
        message = input()
        await r.publish(
            channel=CHANNEL,
            message=message
        )

if __name__ == '__main__':
    asyncio.run(main())