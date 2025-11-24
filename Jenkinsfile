pipeline {
    agent any

    tools {
        // misma instalación de Node que usaste en el back
        nodejs 'node20'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install deps') {
            steps {
                sh 'npm ci'
            }
        }

        // stage('Unit tests') {
        //     when {
        //         expression { false }
        //     }
        //     steps {
        //         sh 'npm run test -- --watch=false --browsers=ChromeHeadless'
        //     }
        // }

        // stage('E2E (Cucumber)') {
        //     when {
        //         expression { false }
        //     }
        //     steps {
        //         sh 'npm run e2e'
        //     }
        // }

        stage('Build') {
            steps {
                sh 'npm run build -- --configuration=production'
            }
        }
    }
}
