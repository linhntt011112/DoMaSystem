# # https://pawamoy.github.io/posts/unify-logging-for-a-gunicorn-uvicorn-app/
import os
import logging
import sys

from uvicorn import Config, Server
from loguru import logger
from config import server_config

LOG_LEVEL = logging.getLevelName(os.environ.get("LOG_LEVEL", "DEBUG"))
JSON_LOGS = True if os.environ.get("JSON_LOGS", "0") == "1" else False


class InterceptHandler(logging.Handler):
    def emit(self, record):
        # Get corresponding Loguru level if it exists
        try:
            level = logger.level(record.levelname).name
        except ValueError:
            level = record.levelno

        # Find caller from where originated the logged message
        frame, depth = logging.currentframe(), 2
        while frame.f_code.co_filename == logging.__file__:
            frame = frame.f_back
            depth += 1

        logger.opt(depth=depth, exception=record.exc_info).log(level, record.getMessage())


def setup_logging(log_file='log/app_log.log'):
    # intercept everything at the root logger
    # logger.remove()
    logging.root.handlers = [InterceptHandler()]
    logging.root.setLevel(LOG_LEVEL)

    # remove every other logger's handlers
    # and propagate to root logger
    for name in logging.root.manager.loggerDict.keys():
        logging.getLogger(name).handlers = []
        logging.getLogger(name).propagate = True
    
    # configure loguru
    sys.stdout.reconfigure(encoding='utf-8') 
    logger.configure(handlers=[{"sink": sys.stdout, "serialize": JSON_LOGS}])
    format = "<green>{time:YYYY-MM-DD HH:mm:ss.SSS}</green> | <level>{level: <8}</level> | <yellow>" + pid+"</yellow> |<cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - <level>{message}</level>"
    logger.add(log_file, rotation="5 GB", level=logging.INFO, encoding="utf8", format=format)    


# if __name__ == '__main__':
#     server = Server(
#         Config(
#             "app:app",
#             host=server_config.host,
#             port=server_config.port,
#             log_level=LOG_LEVEL,
#         ),
#     )

#     # setup logging last, to make sure no library overwrites it
#     # (they shouldn't, but it happens)
#     setup_logging()

#     server.run()

setup_logging(server_config.log_file)
from app import app
