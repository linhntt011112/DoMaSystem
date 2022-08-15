import pusher

pusher_client = pusher.Pusher(
  app_id='1457637',
  key='0ec381f4de9bc7aa5e7b',
  secret='a0469754758acb06c642',
  cluster='ap1',
  ssl=True
)

# pusher_client.trigger('my-channel', 'my-event', {'message': 'hello world'})
    
  
from config import server_config
import aioredis

async def redis_send_data(channel, message):
    redis = aioredis.from_url(server_config.pubsub.redis_url)
    await redis.publish(
            channel=channel,
            message=message
        )