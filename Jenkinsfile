pipeline {
    agent any

    tools {
        nodejs 'NodeJS' 
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Docker Operations') {
            steps {
                withCredentials([usernamePassword(credentialsId: '1', passwordVariable: 'DOCKERHUB_PSW', usernameVariable: 'DOCKERHUB_USER')]) {
                    sh 'echo "$DOCKERHUB_PSW" | docker login -u "$DOCKERHUB_USER" --password-stdin'
                    
                    script {
                        def gitCommitHash = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                        env.DOCKER_TAG = gitCommitHash
                        sh "docker build -t $DOCKERHUB_USER/node_app:${env.DOCKER_TAG} ."
                    }
                    
                    sh "docker push $DOCKERHUB_USER/node_app:${env.DOCKER_TAG}"
                }
            }
        }

        stage('Update Kubernetes Deployment') {
            steps {
                withCredentials([file(credentialsId: '2', variable: 'KUBECONFIG')]) {
                    withCredentials([usernamePassword(credentialsId: '1', passwordVariable: 'DOCKERHUB_PSW', usernameVariable: 'DOCKERHUB_USER')]) {
                        script {
                            def gitCommit = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                            def newImage = "$DOCKERHUB_USER/node_app:${gitCommit}"

                            sh "kubectl set image deployment/node-app nodeapp=${newImage} --kubeconfig=$KUBECONFIG --namespace=ambassador"
                        }
                    }
                }
            }
        }
    }
}