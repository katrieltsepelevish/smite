#!/bin/bash

# Define volume names
REDIS_VOLUME="smite-redis-data"
POSTGRES_VOLUME="smite-postgres-data"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Oops, Docker is not installed. Please install Docker before executing the script."
    exit 1
fi

# Create Docker volumes if they don't exist
for volume in "$REDIS_VOLUME" "$POSTGRES_VOLUME"; do
    if ! docker volume ls --quiet | grep -q "$volume"; then
        echo "Creating Docker volume: $volume"
        docker volume create "$volume"
    fi
done

# Start Redis container
echo "Starting Redis container with volume for data persistence..."
docker run -d --name smite-redis -p 6379:6379 -v "$REDIS_VOLUME":/data redis

# Start PostgreSQL container
echo "Starting PostgreSQL container with volume for data persistence..."
docker run -d --name smite-postgres \
    -p 5432:5432 \
    -v "$POSTGRES_VOLUME":/var/lib/postgresql/data \
    -e POSTGRES_USER=root \
    -e POSTGRES_PASSWORD=password \
    -e POSTGRES_DB=smite \
    postgres

# List running containers
echo "Running containers:"
docker ps
