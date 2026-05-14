pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Backend') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'CI=false npm run build'
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'DOCKER_API_VERSION=1.53 /usr/bin/docker compose down --remove-orphans || true'
                sh 'DOCKER_API_VERSION=1.53 /usr/bin/docker compose up -d --build'
            }
        }
    }

    post {
        always {
            sh 'DOCKER_API_VERSION=1.53 /usr/bin/docker system prune -f'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
