# uvicorn main:app --port 3009 --reload
bin/rm ./log/gunicorn.pid
. ./venv/bin/activate && \
gunicorn -c ./gunicorn_config.py main:app