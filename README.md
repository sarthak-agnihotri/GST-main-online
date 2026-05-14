# GST Software
This project consists of a Node.js/Express backend and a React frontend. It also includes Docker Compose and Jenkins pipeline support for automated builds and deployment.

## Prerequisites
- Node.js installed
- Docker installed and running
- Git installed
- (Optional) Jenkins installed for CI/CD automation

## Local Setup with Docker Compose
From the project root:

```bash
docker compose up --build -d
```

This will start:
- backend: http://localhost:5000
- frontend: http://localhost:3001
- mongo: mongodb://localhost:27017

> Jenkins pipeline deployment uses alternate ports to avoid collisions with a local running stack. The pipeline deploys backend on `6000`, frontend on `3002`, and MongoDB on `27018`.

To stop the stack:

```bash
docker compose down
```

## Backend Only
1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Ensure `.env` file exists in `backend/` with the following content:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/gst_software
JWT_SECRET=your_jwt_secret_key_here
```

4. Start the server:

```bash
npm start
```

The server will run on [http://localhost:5000](http://localhost:5000).

## Frontend Only
1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the application:

```bash
npm start
```

The application will open in your browser at [http://localhost:3001](http://localhost:3001).

## Jenkins Pipeline
This repository includes a `Jenkinsfile` at the project root. The pipeline does the following:
- Checks out code from GitHub
- Installs backend dependencies
- Builds the frontend application
- Deploys the full stack using Docker Compose

To configure Jenkins:
1. Create a new Pipeline job
2. Use SCM: Git
3. Specify the repository URL
4. Set `Script Path` to `Jenkinsfile`

## Project Structure
- `backend/`: Express server, API routes, controllers, and database models
- `frontend/`: React application
- `docker-compose.yml`: Docker service definitions for backend, frontend, MongoDB, and Jenkins
- `Jenkinsfile`: CI/CD pipeline definition
- `jenkins/`: Jenkins Docker configuration
