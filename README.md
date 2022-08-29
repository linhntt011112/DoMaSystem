# Overview
## Features
---
# How to run
## Prerequisite

* Python 3.9.6
* Docker 20.10.16 and docker-compose 1.29.1
* npm 8.4.1 and node 17.5.0

Install all back-end requirements using
```
cd backend && pip install -r requirements.txt
```
and all front-end requirements 
```
cd frontend && npm install --force
```
---
## Run
### Database and redis

```
cd backend && \
COMPOSE_PROJECT_NAME=DMS docker-compose -f database/start_db_docker-compose.yml up -d
```

This command will download all necessary images, create and start containers with default settings (mysql and redis). Data is stored at (default) location ```backend/database/docker``` .



### Back-end
1.  Navigate to ```backend```
```
cd backend
```
2. (Optional) Change config:
* **config.py** (application's config): includes configurations of database, cors, caching and logging.
* **gunicorn_config.py** (server's config): includes configurations of server's worker, server's initialization logging location.
* **local_config.json** (file's config)
3. Start server (It's recommended to start server in a python virtual environment)
```
gunicorn -c ./gunicorn_config.py main:app
```

### Front-end
1.  Navigate to ```frontend```
```
cd frontend
```

2. (Optional) Change config:
* **src/config/backend.jsx**: Only ```BACKEND_URL``` variable should be changed as it point to your back-end's origin (scheme, hostname and port)
3. Start front-end in development mode:
```
npm start
```

## Deploy
1. Switch to branch ```deploy```
2. Change config files if necessary and build front-end 
```
cd frontend
npm run build
mv build prod_build
```
3. Run back-end and front-end as services (for creating these services, see ```systemd.service```)
4. Configure nginx (see ```nginx.conf```) and add a HTTPS certificate using tools like [Certbot](https://certbot.eff.org/)

This branch was deployed to AWS with these instructions and was available at [domasy.site](https://domasy.site) (I turned off the AWS server, but will re-open it when the time comes)

---
# Database
## Schemas
## Notification-related tables
---
# Realtime Notification
