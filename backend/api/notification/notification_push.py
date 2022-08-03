import pusher

pusher_client = pusher.Pusher(
  app_id='1457637',
  key='0ec381f4de9bc7aa5e7b',
  secret='a0469754758acb06c642',
  cluster='ap1',
  ssl=True
)

# pusher_client.trigger('my-channel', 'my-event', {'message': 'hello world'})
    
    
    