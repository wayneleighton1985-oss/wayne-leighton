# TinaCMS Production Deployment Guide

## Overview

This guide explains how to deploy TinaCMS to production for the Find Your Passion website.

## Configuration

1. The TinaCMS configuration has been updated to use the client ID and token from environment variables.
2. The local/production mode is controlled by the `TINA_PUBLIC_IS_LOCAL` environment variable.
3. The database configuration has been updated to use GitHub as the backend in production mode.
4. A `.env.production` file has been created with the necessary environment variables for production.

## Deployment Steps

1. **Install Dependencies**
   ```
   npm install
   ```

2. **Build for Production**
   ```
   npm run build
   ```
   This will build both TinaCMS and the Astro site.

3. **Environment Variables**
   Ensure the following environment variables are set in your production environment:
   - `NEXT_PUBLIC_TINA_CLIENT_ID`: Your Tina Cloud client ID
   - `TINA_TOKEN`: Your Tina Cloud token
   - `GITHUB_OWNER`: The GitHub username/organization that owns the repository
   - `GITHUB_REPO`: The name of the GitHub repository
   - `GITHUB_BRANCH`: The branch to use (default: main)
   - `GITHUB_PERSONAL_ACCESS_TOKEN`: A GitHub personal access token with repo scope
   - `TINA_PUBLIC_IS_LOCAL`: Set to 'false' for production

4. **Deploy to Your Hosting Provider**
   Upload the built files to your hosting provider. The TinaCMS admin interface will be available at `/admin/` on your domain.

## Authentication

TinaCMS is configured to use GitHub OAuth for authentication. The authentication flow is:

1. User visits `/admin/`
2. User is redirected to GitHub for authentication
3. After authentication, GitHub redirects to `/api/auth`
4. NextAuth handles the OAuth callback and creates a session
5. TinaCMS uses the GitHub access token to interact with the repository

## Troubleshooting

If you encounter issues with TinaCMS in production:

1. Check that all environment variables are correctly set
2. Ensure the GitHub personal access token has the necessary permissions
3. Check the server logs for any errors
4. Verify that the NextAuth configuration is correct