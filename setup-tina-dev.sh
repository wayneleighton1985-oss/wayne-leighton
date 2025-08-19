#!/bin/bash

# This script sets up TinaCMS for local development

# Create .env.development file with local development settings
cat > .env.development << EOL
# TinaCMS configuration
NEXT_PUBLIC_TINA_CLIENT_ID=56844d01-3e31-4c3c-b165-956a1f1e0198
TINA_TOKEN=7a0024bf17443a12d8bf5054e078bd42af60c5e0

# GitHub configuration
GITHUB_OWNER=wayneleighton1985-oss
GITHUB_REPO=wayne-leighton
GITHUB_BRANCH=main
GITHUB_PERSONAL_ACCESS_TOKEN=7a0024bf17443a12d8bf5054e078bd42af60c5e0

# Set to true for local development
TINA_PUBLIC_IS_LOCAL=true
EOL

echo "Created .env.development file for local development"

# Make the script executable
chmod +x setup-tina-dev.sh

echo "TinaCMS development environment setup complete!"
echo "Run 'npm run dev' to start the development server"