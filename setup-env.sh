#!/bin/bash

# Script to set up environment variables for TinaCMS deployment

echo "Setting up environment variables for TinaCMS deployment..."

# Create .env.production file if it doesn't exist
if [ ! -f ".env.production" ]; then
  echo "Creating .env.production file from environment variables..."
  cat > .env.production << EOL
NEXT_PUBLIC_TINA_CLIENT_ID=${NEXT_PUBLIC_TINA_CLIENT_ID}
TINA_TOKEN=${TINA_TOKEN}
TINA_PUBLIC_IS_LOCAL=${TINA_PUBLIC_IS_LOCAL:-false}
GITHUB_OWNER=${GITHUB_OWNER}
GITHUB_REPO=${GITHUB_REPO}
GITHUB_BRANCH=${GITHUB_BRANCH:-main}
GITHUB_PERSONAL_ACCESS_TOKEN=${GITHUB_PERSONAL_ACCESS_TOKEN}
EOL
  echo ".env.production file created."
fi

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