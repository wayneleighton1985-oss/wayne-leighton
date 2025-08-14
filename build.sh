#!/bin/bash

echo "Starting simplified build process..."

# Create dist directory if it doesn't exist
mkdir -p dist

# Copy public files to dist
echo "Copying public files to dist..."
cp -r public/* dist/

echo "Build completed successfully!"