#!/bin/bash

# Define volume names
REDIS_VOLUME="smite-redis-data"
MONGODB_VOLUME="smite-mongodb-data"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Oops, Docker is not installed. Please install Docker before executing the script."
    exit 1
fi

# Create Docker volumes if they don't exist
for volume in "$REDIS_VOLUME" "$MONGODB_VOLUME"; do
    if ! docker volume ls --quiet | grep -q "$volume"; then
        echo "Creating Docker volume: $volume"
        docker volume create "$volume"
    fi
done

# Start Redis container
echo "Starts Redis container with volume for data persistence..."
docker run -d --name smite-redis -p 6379:6379 -v "$REDIS_VOLUME":/data redis

# Start MongoDB container
echo "Starts MongoDB container with volume for data persistence..."
docker run -d --name smite-mongodb \
    -p 27017:27017 \
    -v "$MONGODB_VOLUME":/data/db \
    -e MONGO_INITDB_DATABASE=smite \
    mongo

# List running containers
echo "Running containers:"
docker ps
