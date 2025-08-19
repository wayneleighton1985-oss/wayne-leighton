#!/bin/bash

# Script to set up environment variables for TinaCMS deployment

echo "Setting up environment variables for TinaCMS deployment..."
echo "Current directory: $(pwd)"
echo "Listing files in current directory:"
ls -la

# Create .env.production file if it doesn't exist
if [ ! -f ".env.production" ]; then
  echo "Creating .env.production file from environment variables..."
  
  # Debug: Print environment variables (hiding sensitive values)
  echo "Available environment variables:"
  echo "NEXT_PUBLIC_TINA_CLIENT_ID: ${NEXT_PUBLIC_TINA_CLIENT_ID:0:5}..."
  echo "TINA_TOKEN: ${TINA_TOKEN:0:5}..."
  echo "TINA_PUBLIC_IS_LOCAL: ${TINA_PUBLIC_IS_LOCAL}"
  echo "GITHUB_OWNER: ${GITHUB_OWNER}"
  echo "GITHUB_REPO: ${GITHUB_REPO}"
  echo "GITHUB_BRANCH: ${GITHUB_BRANCH}"
  echo "GITHUB_PERSONAL_ACCESS_TOKEN: ${GITHUB_PERSONAL_ACCESS_TOKEN:0:5}..."
  
  # Create the file with hardcoded values for Cloudflare Pages deployment
  cat > .env.production << EOL
NEXT_PUBLIC_TINA_CLIENT_ID=56844d01-3e31-4c3c-b165-956a1f1e0198
TINA_TOKEN=7a0024bf17443a12d8bf5054e078bd42af60c5e0
TINA_PUBLIC_IS_LOCAL=false
GITHUB_OWNER=wayneleighton1985-oss
GITHUB_REPO=wayne-leighton
GITHUB_BRANCH=main
GITHUB_PERSONAL_ACCESS_TOKEN=7a0024bf17443a12d8bf5054e078bd42af60c5e0
EOL
  echo ".env.production file created."
  cat .env.production | sed 's/TOKEN.*/TOKEN=HIDDEN/' | sed 's/ACCESS_TOKEN.*/ACCESS_TOKEN=HIDDEN/'
fi

# Verify .env.production file was created
echo "Verifying .env.production file exists:"
if [ -f ".env.production" ]; then
  echo ".env.production exists with content:"
  cat .env.production | sed 's/TOKEN.*/TOKEN=HIDDEN/' | sed 's/ACCESS_TOKEN.*/ACCESS_TOKEN=HIDDEN/'
else
  echo "ERROR: .env.production file was not created!"
  exit 1
fi

# Export variables from .env.production
echo "Sourcing .env.production file..."
set -a
source .env.production
set +a

echo "Environment variables after sourcing:"
echo "NEXT_PUBLIC_TINA_CLIENT_ID: $NEXT_PUBLIC_TINA_CLIENT_ID"
echo "TINA_TOKEN: [HIDDEN]"
echo "TINA_PUBLIC_IS_LOCAL: $TINA_PUBLIC_IS_LOCAL"
echo "GITHUB_OWNER: $GITHUB_OWNER"
echo "GITHUB_REPO: $GITHUB_REPO"
echo "GITHUB_BRANCH: $GITHUB_BRANCH"
echo "GITHUB_PERSONAL_ACCESS_TOKEN: [HIDDEN]"

echo "You can now run 'npm run build' to build the project."