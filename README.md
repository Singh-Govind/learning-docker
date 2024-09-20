# Learning Docker With Nginx

# Dockerized Express Application with NGINX and MongoDB

This repository contains a Dockerized setup for an Express.js application, an NGINX server, and a MongoDB database. It uses Docker Compose to manage multi-container applications efficiently.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Directory Structure](#directory-structure)
- [Environment Variables](#environment-variables)
- [Docker Commands](#docker-commands)

## Prerequisites
- [Docker](https://www.docker.com/get-started) installed on your machine.
- [Docker Compose](https://docs.docker.com/compose/install/) installed.

### Generate Self-Signed Certificates
To enable HTTPS, you need to generate a self-signed SSL certificate. You can do this using OpenSSL with the following command:

`openssl req -nodes -new -x509 -keyout cert/server.key -out cert/server.cert -days 365`

### Update Hosts File
To access the application using the subdomain `api.localhost`, add the following entry to your hosts file:
#### For Windows
  1. Open Notepad as Administrator.
  2. Open the file located at `C:\Windows\System32\drivers\etc\hosts`.
  3. Add the following line: `127.0.0.1 api.localhost`

#### For macOS/Linux
  1. Open a terminal.
  2. Run the following command: `sudo nano /etc/hosts`
  3. Add the following line: `127.0.0.1 api.localhost`

## Getting Started

1. Clone the repository:
   
   `git clone https://github.com/singh-govind/learning-docker.git`
   
   `cd learning-docker`

2. Create a .env file in the root directory to set environment variables. Example:

   `TZ=Asia/Kolkata`

   `MONGO_URL=mongodb://mongodb:27017/your-database`

   `HOST='0.0.0.0'`

3. Build and run the containers:
   `docker-compose up --build`
   
5. Access the application:
  - HTTP: http://localhost
  - HTTPS: https://localhost
  - API: https://api.localhost

# Directory Structure
    learning-docker/
    │
    ├── cert/                  # SSL certificates
    │   ├── server.cert        # Self-signed SSL certificate
    │   └── server.key         # Private key for the SSL certificate
    |
    ├── index.html             # Static HTML file served by NGINX
    ├── index.js               # Main entry point for the Express application
    ├── package.json           # Node.js dependencies and scripts
    ├── package-lock.json      # Locked versions of dependencies
    |
    ├── nginx/
    │   ├── nginx.conf         # NGINX configuration file
    │   └── logs/              # Logs directory for NGINX
    |
    ├── Dockerfile              # Dockerfile for the Express app
    ├── docker-compose.yml      # Docker Compose configuration file
    └── .env                    # Environment variables

# Environment Variables
    
  - TZ: Set the timezone for your application, Asia/Kolkata.
  - MONGO_URL: Connection string for MongoDB, because in docker-compose its container name is mongodb thats why mongodb://mongodb:27017/database-name.
  - HOST: keep it '0.0.0.0'.

# Docker Commands
  - Build the images and start the containers: `docker-compose up --build`
  - Stop the containers: `docker-compose down`
  - View logs: `docker-compose logs`
  - Remove dangling images and volumes: `docker image prune -f` `docker volume prune -f`
    
