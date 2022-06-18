import json
import os 
import datetime
import  random
import hashlib
import shutil

from loguru import logger
from fastapi import UploadFile


from exceptions import api_exceptions

# async def create_dir()


async def create_save_location(filename: str, base_save_dir: str, is_dir=False):
    os.makedirs(base_save_dir, exist_ok=True)
    
    max_attempt = 10
    counter = 0
    # logger.info(f'|||||||||||||||||||||||||||||{file.filename}')
    while counter < max_attempt:
        seed = str(random.randint(0, max_attempt-1))
        hashed_str = hashlib.md5((seed + filename).encode('utf-8')).hexdigest()
        now = str(datetime.datetime.now().strftime("%Y%m%d%H%M%S%z"))
        
        new_filename = f'{now}-{hashed_str}-{seed}'
        save_file_path = os.path.join(base_save_dir, new_filename)
        
        if os.path.isfile(save_file_path) or os.path.isdir(save_file_path):
            continue
        else:
            if not is_dir:
                open(save_file_path, 'wb').close()  # create new file
            else:
                os.makedirs(save_file_path)
            return save_file_path
    raise Exception('Too many attempt')




async def save_file(file, file_path):
    with open(file_path, 'wb') as f:
        shutil.copyfileobj(file, f)



def remove_file(path: str) -> None:
    os.unlink(path)