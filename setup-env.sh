#!/bin/bash

# Script to set up environment variables for TinaCMS deployment

echo "Setting up environment variables for TinaCMS deployment..."

# Check if .env.production exists
if [ -f ".env.production" ]; then
  echo "Found .env.production file"
  
  # Export variables from .env.production
  set -a
  source .env.production
  set +a
  
  echo "Environment variables set:"
  echo "NEXT_PUBLIC_TINA_CLIENT_ID: $NEXT_PUBLIC_TINA_CLIENT_ID"
  echo "TINA_TOKEN: [HIDDEN]"
  echo "TINA_PUBLIC_IS_LOCAL: $TINA_PUBLIC_IS_LOCAL"
  echo "GITHUB_OWNER: $GITHUB_OWNER"
  echo "GITHUB_REPO: $GITHUB_REPO"
  echo "GITHUB_BRANCH: $GITHUB_BRANCH"
  echo "GITHUB_PERSONAL_ACCESS_TOKEN: [HIDDEN]"
  
  echo "You can now run 'npm run build' to build the project."
else
  echo "Error: .env.production file not found."
  echo "Please create a .env.production file with the required environment variables."
  exit 1
fi