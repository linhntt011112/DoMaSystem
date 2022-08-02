import os
import json

with open("local_config.json") as f:
    local_config = json.load(f)


class DBConfig:
    DB_PORT: int = "3010"
    DB_USER: str = 'root'
    DB_PASSWORD: str = '123456'
    DB_SERVER: str = 'localhost'
    DB_NAME: str = 'DMS'

    DB_URL: str = f'mysql+mysqlconnector://{DB_USER}:{DB_PASSWORD}@{DB_SERVER}:{DB_PORT}/{DB_NAME}'

db_config = DBConfig()


class FrontEndConfig:
    URL = 'http://localhost:3008'

    possible_urls = [
        "*"
    ]

frontend_config = FrontEndConfig()


class ServerConfig:
    app_name = "DMS"
    host = '0.0.0.0'
    port = 3009
    log_file = 'log/app_log.log'

    base_save_dir = local_config["ServerConfig"]["base_save_dir"]
    tep_dinh_kem_save_dir = os.path.join(base_save_dir, 'tep_dinh_kem')

    class Caching:
        redis_url = "redis://default:DMS@localhost:3012/0"
        default_expiration_time_in_seconds = 60*30

    caching = Caching()
    
    class PubSub:
        redis_url = "redis://default:DMS@localhost:3012/1"
    pubsub = PubSub()
    notification_key = "MIICXAIBAAKBgQC/Ttc4mWodTGbczo6wbabrsQs74tel2y7/WpRZ3I1JnlDoaYSk"


server_config = ServerConfig() 
