# uvicorn main:app --port 3009 --reload
# bin/rm ./log/gunicorn.pid
. ./venv/bin/activate && \
DMS_FRONT_END_URL=http://localhost:3008 gunicorn -c ./gunicorn_config.py main:app