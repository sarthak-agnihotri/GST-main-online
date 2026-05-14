# Jenkins CI/CD Setup

This project includes a Jenkins pipeline for continuous integration and deployment using Docker Compose.

## Starting Jenkins

1. Ensure Docker is running
2. From the project root (`GST-main`), run:
   ```bash
   docker compose up -d jenkins
   ```

3. Jenkins will be available at http://localhost:8080

## Initial Setup

1. Get the initial admin password:
   ```bash
   docker compose exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
   ```

2. Follow the web setup wizard to install suggested plugins and create an admin user.

## Creating the Pipeline

1. In Jenkins web UI, click "New Item"
2. Enter a name (e.g., "GST-App-Pipeline")
3. Select "Pipeline" and click OK
4. In the Pipeline section:
   - Definition: Pipeline script from SCM
   - SCM: Git
   - Repository URL: Your Git repository URL
   - Branch: main (or your default branch)
   - Script Path: Jenkinsfile
5. Save and click "Build Now"

## Pipeline Stages

The `Jenkinsfile` includes the following stages:
- **Checkout**: Pulls the latest code
- **Install Backend**: Installs backend dependencies
- **Build Frontend**: Installs dependencies and builds the React app
- **Deploy**: Runs `docker compose up -d --build`

## Notes

- The frontend is available at http://localhost:3001 after deploy
- The pipeline uses Docker Compose deployment
- `docker system prune -f` runs after every build to clean up unused resources
- MongoDB data persists in the local Docker volume

## Stopping Jenkins

```bash
docker compose down
```
