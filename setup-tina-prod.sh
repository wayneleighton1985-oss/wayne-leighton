#!/bin/bash

# This script sets up TinaCMS for production deployment

# Create .env.production file with production settings
cat > .env.production << EOL
# TinaCMS configuration
NEXT_PUBLIC_TINA_CLIENT_ID=56844d01-3e31-4c3c-b165-956a1f1e0198
TINA_TOKEN=7a0024bf17443a12d8bf5054e078bd42af60c5e0

# GitHub configuration
GITHUB_OWNER=wayneleighton1985-oss
GITHUB_REPO=wayne-leighton
GITHUB_BRANCH=main
GITHUB_PERSONAL_ACCESS_TOKEN=7a0024bf17443a12d8bf5054e078bd42af60c5e0

# Set to false for production
TINA_PUBLIC_IS_LOCAL=false
EOL

echo "Created .env.production file for production deployment"

# Make the script executable
chmod +x setup-tina-prod.sh

echo "TinaCMS production environment setup complete!"
echo "Run 'npm run build:full' to build the project for production"