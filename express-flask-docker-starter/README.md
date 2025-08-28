# Express + Flask (Docker + Compose) Starter

A minimal project where a Node.js (Express) **frontend** renders a form and forwards
submissions to a **Flask** **backend**. Both services run with Docker and are connected
using Docker Compose on the same network.

## Folder Structure

```text
express-flask-docker-starter/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── public/
│   │   └── styles.css
│   ├── server.js
│   └── views/
│       └── index.ejs
├── docker-compose.yml
├── .gitignore
└── README.md
```

## Run (Docker Compose)

```bash
docker compose up --build
# Frontend: http://localhost:3000
# Backend:  http://localhost:5000/health
```

## Push Images to Docker Hub

1. Log in and set your Docker Hub user:
   ```bash
   export DOCKER_USER="yourdockerhubusername"
   docker login
   ```

2. Build and tag:
   ```bash
   docker build -t "$DOCKER_USER/express-frontend:latest" ./frontend
   docker build -t "$DOCKER_USER/flask-backend:latest"   ./backend
   ```

3. Push:
   ```bash
   docker push "$DOCKER_USER/express-frontend:latest"
   docker push "$DOCKER_USER/flask-backend:latest"
   ```

4. Update `docker-compose.yml` images to use your `$DOCKER_USER` and deploy:
   ```bash
   docker compose up -d
   ```

## Push Code to GitHub

```bash
git init
git add .
git commit -m "Express + Flask + Docker Compose starter"
git branch -M main
git remote add origin https://github.com/<your-user>/<your-repo>.git
git push -u origin main
```

## Notes
- The frontend posts to `/submit` on the Express server; the server forwards the JSON payload to the Flask backend at `http://backend:5000/submit` (service name from Compose).
- `.gitignore` excludes `node_modules`, virtualenvs, and editor folders like `.vscode`.
- You can customize the form fields in `frontend/views/index.ejs` and the processing logic in `backend/app.py`.
