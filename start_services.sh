#!/bin/bash

# Define volume names
REDIS_VOLUME="smite-redis-data"
MYSQL_VOLUME="smite-mysql-data"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Oops, Docker is not installed. Please install Docker before executing the script."
    exit 1
fi

# Create Docker volumes if they don't exist
for volume in "$REDIS_VOLUME" "$MYSQL_VOLUME"; do
    if ! docker volume ls --quiet | grep -q "$volume"; then
        echo "Creating Docker volume: $volume"
        docker volume create "$volume"
    fi
done

# Start Redis container
echo "Starting Redis container with volume for data persistence..."
docker run -d --name smite-redis -p 6379:6379 -v "$REDIS_VOLUME":/data redis

# Start MySQL container
echo "Starting MySQL container with volume for data persistence..."
docker run -d --name smite-mysql \
    -p 3306:3306 \
    -v "$MYSQL_VOLUME":/var/lib/mysql \
    -e MYSQL_ROOT_PASSWORD=password \
    -e MYSQL_DATABASE=smite \
    mysql

# List running containers
echo "Running containers:"
docker ps
