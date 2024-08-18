#!/bin/bash

# Define container names and volume names
REDIS_CONTAINER="smite-redis"
MYSQL_CONTAINER="smite-mysql"
REDIS_VOLUME="smite-redis-data"
MYSQL_VOLUME="smite-mysql-data"

# Stop and remove containers
echo "Stopping and removing Redis and MySQL containers..."
docker stop "$MYSQL_CONTAINER"
docker rm "$MYSQL_CONTAINER"
docker stop "$REDIS_CONTAINER"
docker rm "$REDIS_CONTAINER"

# Check running containers
echo "Running containers:"
docker ps

# Remove Docker volumes
echo "Removing MySQL and Redis volumes..."
docker volume rm "$MYSQL_VOLUME"
docker volume rm "$REDIS_VOLUME"

# Verify that volumes are removed
echo "Docker volumes:"
docker volume ls
