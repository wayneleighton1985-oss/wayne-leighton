#!/bin/bash

echo "Starting simplified build process..."

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
    <p>Created by the build script.</p>
  </div>
  <p>Thank you for your patience while we set up the site.</p>
</body>
</html>
EOL
fi

echo "Build completed successfully!"