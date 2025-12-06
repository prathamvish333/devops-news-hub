# Yashasvi Duniya

**Yashasvi Duniya is a modern news portal inspired by the layout and design of https://www.ndtv.com/, built as a production-style 3-tier microservice application (React, FastAPI, PostgreSQL) with CI/CD through Jenkins and ArgoCD.**

> **Legal Note:** This project is a demo and not affiliated with NDTV. All news content is original.

---

## 🏗️ Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│    Frontend     │────▶│     Backend     │────▶│   PostgreSQL    │
│  (React/Vite)   │     │    (FastAPI)    │     │    Database     │
│   Port: 80      │     │   Port: 8000    │     │   Port: 5432    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

- **Frontend**: React + Vite, served via Nginx
- **Backend**: FastAPI with JWT authentication
- **Database**: PostgreSQL 15

---

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local frontend development)
- Python 3.11+ (for local backend development)

### Local Development with Docker Compose

```bash
# Clone the repository
git clone https://github.com/yourusername/YashasviDuniya.git
cd YashasviDuniya

# Copy environment file
cp .env.example .env

# Start all services
docker-compose up --build

# Access the application
# Frontend: http://localhost
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

### Default Credentials
- **Username**: `admin`
- **Password**: `admin`

---

## 📁 Project Structure

```
YashasviDuniya/
├─ README.md
├─ docker-compose.yml
├─ .env.example
├─ k8s/
│  ├─ namespace.yaml
│  ├─ secrets.yaml
│  ├─ frontend-deploy.yaml
│  ├─ backend-deploy.yaml
│  ├─ postgres-deploy.yaml
│  └─ ingress.yaml
├─ argocd/
│  └─ application.yaml
├─ jenkins/
│  └─ Jenkinsfile
├─ frontend/
│  ├─ Dockerfile
│  ├─ nginx.conf
│  ├─ vite.config.js
│  ├─ package.json
│  └─ src/
├─ backend/
│  ├─ Dockerfile
│  ├─ requirements.txt
│  └─ app/
│     ├─ main.py
│     ├─ db.py
│     ├─ models.py
│     ├─ schemas.py
│     ├─ auth.py
│     ├─ crud.py
│     ├─ seed.py
│     ├─ config.py
│     └─ tests/
└─ scripts/
   ├─ e2e_smoke.sh
   └─ seed_db.sh
```

---

## 🐳 Docker Build & Push

### Build Images

```bash
# Build frontend
docker build -t yashasvi-frontend:latest ./frontend

# Build backend
docker build -t yashasvi-backend:latest ./backend
```

### Push to Registry

```bash
# Tag and push
docker tag yashasvi-frontend:latest $DOCKER_REGISTRY/yashasvi-frontend:latest
docker tag yashasvi-backend:latest $DOCKER_REGISTRY/yashasvi-backend:latest

docker push $DOCKER_REGISTRY/yashasvi-frontend:latest
docker push $DOCKER_REGISTRY/yashasvi-backend:latest
```

---

## ☸️ Kubernetes Deployment

### Prerequisites
- Kubernetes cluster (minikube, kind, or cloud provider)
- kubectl configured
- Ingress controller installed (nginx-ingress recommended)

### Deploy to Kubernetes

```bash
# Create namespace
kubectl apply -f k8s/namespace.yaml

# Create secrets (update with real values first!)
kubectl apply -f k8s/secrets.yaml

# Deploy PostgreSQL
kubectl apply -f k8s/postgres-deploy.yaml

# Wait for PostgreSQL to be ready
kubectl wait --for=condition=ready pod -l app=yashasvi-postgres -n yashasvi-duniya --timeout=120s

# Deploy Backend
kubectl apply -f k8s/backend-deploy.yaml

# Deploy Frontend
kubectl apply -f k8s/frontend-deploy.yaml

# Apply Ingress
kubectl apply -f k8s/ingress.yaml
```

### Verify Deployment

```bash
# Check all pods are running
kubectl get pods -n yashasvi-duniya

# Expected output:
# NAME                                  READY   STATUS    RESTARTS   AGE
# yashasvi-frontend-xxxxx               1/1     Running   0          1m
# yashasvi-backend-xxxxx                1/1     Running   0          1m
# yashasvi-postgres-xxxxx               1/1     Running   0          2m
```

---

## 🔄 CI/CD with Jenkins & ArgoCD

### Jenkins Pipeline

The `jenkins/Jenkinsfile` provides:
1. Build frontend and backend Docker images
2. Run backend tests
3. Push images to container registry
4. Update Kubernetes manifests

### ArgoCD Setup

```bash
# Install ArgoCD (if not already installed)
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Apply the ArgoCD application
kubectl apply -f argocd/application.yaml

# Access ArgoCD UI
kubectl port-forward svc/argocd-server -n argocd 8080:443
```

---

## 🔐 Authentication

### JWT Authentication
- Access tokens expire in 60 minutes (configurable)
- Refresh tokens for session extension

### SSO Support (Stubs)
Configure SSO via environment variables:
- `SSO_PROVIDER`: keycloak, auth0, or generic OIDC
- `SSO_CLIENT_ID`, `SSO_CLIENT_SECRET`
- `SSO_AUTH_URL`, `SSO_TOKEN_URL`, `SSO_USERINFO_URL`

---

## 📰 Features

- **Public News Feed**: Browse articles by category
- **User Registration/Login**: JWT-based authentication
- **Post Creation**: WYSIWYG editor for articles
- **Categories**: India, World, Business, Tech, Sports, Entertainment
- **Admin Dashboard**: Manage all posts and users
- **Responsive Design**: NDTV-inspired dark theme

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
pip install -r requirements.txt
pytest app/tests/ -v
```

### E2E Smoke Test
```bash
./scripts/e2e_smoke.sh
```

---

## 👤 Author

**Pratham Vishwakarma**
- LinkedIn: https://www.linkedin.com/in/prathamvishwakarma/
- GitHub: https://github.com/prathamvish333

---

## 📄 License

This project is for educational and portfolio purposes only.
