#!/bin/bash

# Define the path to the .env files
ENV_PATH="./"

# Check if env.example file exists
if [ ! -f "${ENV_PATH}.env.example" ]; then
  echo ".env.example file not found in ${ENV_PATH}!"
  exit 1
fi

# Check if  the .env file already exist
if [ -f "${ENV_PATH}.env" ]; then
  echo "Warning: .env file already exist and will be overridden!"
  read -r -p "Do you want to continue? (y/n): " confirm
  if [ "$confirm" != "y" ]; then
    echo "Operation aborted by the user."
    exit 0
  fi
fi

# Copy the content of .env.example into the desired file
cp "${ENV_PATH}.env.example" "${ENV_PATH}.env"

echo "Environment files created successfully in root directory!"