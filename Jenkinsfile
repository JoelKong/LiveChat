pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout the source code from the repository
                checkout scm
            }
        }

        stage('Test') {
            steps {
                // Run tests (adjust as per your testing framework)
                sh 'cd website && npm install && npm test'
            }
        }

        stage('Build') {
            steps {
                // Build Docker images
                sh 'docker-compose -f docker-compose.yml build'
            }
        }

        stage('Deploy') {
            steps {
                // Start Docker containers
                sh 'docker-compose -f docker-compose.yml up -d'
            }
        }
    }

    post {
        success {
            echo 'Successfully built!'

            // Additional actions on success, e.g., notifications
        }
        failure {
            echo 'Something went wrong.'

            // Additional actions on failure, e.g., notifications
        }
    }
}
