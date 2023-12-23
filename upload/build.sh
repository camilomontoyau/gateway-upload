#!/bin/bash

#!/bin/bash

# Check if Docker is running
if ! docker info &> /dev/null; then
  echo "Docker is not running."
  exit 1
fi

echo "Docker is running."


# login
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin XXXXXXXXXXX.dkr.ecr.us-east-1.amazonaws.com

# set the app name
APP_NAME="api-gateway"

# build name
BUILD_NAME="$APP_NAME:gateway1"

echo "Building $BUILD_NAME"

# build the Docker image
docker build --platform linux/amd64 -t $BUILD_NAME .;


# tag the image
docker tag $BUILD_NAME xxxxxxxxxx.dkr.ecr.us-east-1.amazonaws.com/$BUILD_NAME

# push the image
docker push xxxxxxxxxxxx.dkr.ecr.us-east-1.amazonaws.com/$BUILD_NAME