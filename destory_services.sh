#!/bin/bash

# Define container names and volume names
REDIS_CONTAINER="smite-redis"
MONGODB_CONTAINER="smite-mongodb"
REDIS_VOLUME="smite-redis-data"
MONGODB_VOLUME="smite-mongodb-data"

# Stop and remove containers
echo "Stops and removes MongoDB and Redis container..."
docker stop "$MONGODB_CONTAINER"
docker rm "$MONGODB_CONTAINER"
docker stop "$REDIS_CONTAINER"
docker rm "$REDIS_CONTAINER"

# Check running containers
echo "Running containers:"
docker ps

# Remove Docker volumes
echo "Removes MongoDB and Redis volume..."
docker volume rm "$MONGODB_VOLUME"
docker volume rm "$REDIS_VOLUME"

# Verify that volumes are removed
echo "Docker volumes:"
docker volume ls