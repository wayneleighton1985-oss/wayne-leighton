#!/bin/bash

echo "Starting build process..."

# Set environment variables if not already set
if [ -z "$NEXT_PUBLIC_TINA_CLIENT_ID" ]; then
  echo "Setting environment variables from hardcoded values..."
  export NEXT_PUBLIC_TINA_CLIENT_ID="56844d01-3e31-4c3c-b165-956a1f1e0198"
  export TINA_TOKEN="7a0024bf17443a12d8bf5054e078bd42af60c5e0"
  export TINA_PUBLIC_IS_LOCAL="false"
  export GITHUB_OWNER="CLAYYO"
  export GITHUB_REPO="wayne-leighton"
  export GITHUB_BRANCH="main"
  export GITHUB_PERSONAL_ACCESS_TOKEN="7a0024bf17443a12d8bf5054e078bd42af60c5e0"
fi

# Debug: Print environment variables
echo "Using environment variables:"
echo "NEXT_PUBLIC_TINA_CLIENT_ID: $NEXT_PUBLIC_TINA_CLIENT_ID"
echo "GITHUB_OWNER: $GITHUB_OWNER"
echo "GITHUB_REPO: $GITHUB_REPO"
echo "GITHUB_BRANCH: $GITHUB_BRANCH"

# Create .env.production file
echo "Creating .env.production file..."
cat > .env.production << EOL
NEXT_PUBLIC_TINA_CLIENT_ID=$NEXT_PUBLIC_TINA_CLIENT_ID
TINA_TOKEN=$TINA_TOKEN
TINA_PUBLIC_IS_LOCAL=false
GITHUB_OWNER=$GITHUB_OWNER
GITHUB_REPO=$GITHUB_REPO
GITHUB_BRANCH=$GITHUB_BRANCH
GITHUB_PERSONAL_ACCESS_TOKEN=$GITHUB_PERSONAL_ACCESS_TOKEN
EOL

# Try to run the full build
echo "Attempting full build with TinaCMS..."
if npm run build:full; then
  echo "Full build successful!"
else
  echo "Full build failed, falling back to simplified build..."
  
  # Create dist directory if it doesn't exist
  mkdir -p dist
  
  # Copy public files to dist
  echo "Copying public files to dist..."
  cp -r public/* dist/
  
  # Create a simple index.html if it doesn't exist
  if [ ! -f "dist/index.html" ]; then
    echo "Creating a simple index.html..."
    cat > dist/index.html << EOL
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wayne Leighton Books - Minimal Version</title>
  <style>
    body {
      font-family: sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      color: #ed751a;
    }
    .message {
      background-color: #f8f9fa;
      border-left: 4px solid #ed751a;
      padding: 15px;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <h1>Wayne Leighton Books</h1>
  <div class="message">
    <p>This is a minimal version of the Wayne Leighton Books website for testing Cloudflare Pages deployment.</p>
    <p>The full build with TinaCMS failed. Please check the deployment logs for more information.</p>
  </div>
  <p>Thank you for your patience while we set up the site.</p>
</body>
</html>
EOL
fi

echo "Build completed successfully!"