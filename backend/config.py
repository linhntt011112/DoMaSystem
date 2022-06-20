import os

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
    
    base_save_dir = '/home/aimenext/tanhm/DMS/storage'
    tep_dinh_kem_save_dir = os.path.join(base_save_dir, 'tep_dinh_kem')
    
    class Caching:
        redis_url = "redis://default:DMS@localhost:3012"
        default_expiration_time_in_seconds = 60*30
        
    caching = Caching()
    

server_config = ServerConfig()