#!/bin/bash

# Script to build and deploy the production version of the website

echo "=== Starting production deployment workflow ==="

# Step 1: Set up the production environment
echo "\n=== Setting up production environment ==="
npm run setup-tina:prod

# Step 2: Build the project for production
echo "\n=== Building project for production ==="
npm run build:full

# Step 3: Preview the production build (optional)
echo "\n=== Would you like to preview the production build? (y/n) ==="
read -r preview_choice

if [[ $preview_choice == "y" || $preview_choice == "Y" ]]; then
  echo "\n=== Starting preview server ==="
  echo "Access the site at: http://localhost:4322/"
  echo "Access the TinaCMS admin at: http://localhost:4322/admin/index.html"
  echo "Press Ctrl+C to stop the preview when done"
  npm run preview
fi

# Step 4: Deploy to production
echo "\n=== Ready to deploy to production ==="
echo "To deploy, upload the 'dist' directory to your hosting provider"
echo "Or use your configured deployment workflow"

echo "\n=== Production deployment workflow complete ==="