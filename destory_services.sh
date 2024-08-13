#!/bin/bash

# Define container names and volume names
REDIS_CONTAINER="smite-redis"
POSTGRES_CONTAINER="smite-postgres"
REDIS_VOLUME="smite-redis-data"
POSTGRES_VOLUME="smite-postgres-data"

# Stop and remove containers
echo "Stopping and removing Redis and PostgreSQL containers..."
docker stop "$POSTGRES_CONTAINER"
docker rm "$POSTGRES_CONTAINER"
docker stop "$REDIS_CONTAINER"
docker rm "$REDIS_CONTAINER"

# Check running containers
echo "Running containers:"
docker ps

# Remove Docker volumes
echo "Removing PostgreSQL and Redis volumes..."
docker volume rm "$POSTGRES_VOLUME"
docker volume rm "$REDIS_VOLUME"

# Verify that volumes are removed
echo "Docker volumes:"
docker volume ls
