from concurrent.futures import thread
from config import server_config


loglevel = 'debug'

preload = False
workers = 2
bind = f'{server_config.host}:{server_config.port}'
worker_class = 'uvicorn.workers.UvicornWorker'
worker_connections = 2000

pidfile = "log/gunicorn.pid" # pid file
# accesslog = "gunicorn/access.log" # Access log directory
errorlog = "log/debug.log" # error log
graceful_timeout = 600
timeout = 600