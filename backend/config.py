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
    host = '0.0.0.0'
    port = 3009

server_config = ServerConfig()