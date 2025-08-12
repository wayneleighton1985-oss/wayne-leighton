# Cloudflare Pages Deployment Guide

## TinaCMS Production Setup

The build error you encountered is related to TinaCMS configuration for production deployment. Here's how to fix it:

### Environment Variables

TinaCMS requires specific environment variables for production deployment. These are already configured in the `.env.production` file:

```
NEXT_PUBLIC_TINA_CLIENT_ID=56844d01-3e31-4c3c-b165-956a1f1e0198
TINA_TOKEN=7a0024bf17443a12d8bf5054e078bd42af60c5e0
TINA_PUBLIC_IS_LOCAL=false
GITHUB_OWNER=CLAYYO
GITHUB_REPO=wayne-leighton
GITHUB_BRANCH=main
GITHUB_PERSONAL_ACCESS_TOKEN=7a0024bf17443a12d8bf5054e078bd42af60c5e0
```

### Cloudflare Pages Deployment Steps

1. **Set Environment Variables in Cloudflare Pages**

   In your Cloudflare Pages project settings, add these environment variables:
   
   - `NEXT_PUBLIC_TINA_CLIENT_ID`
   - `TINA_TOKEN`
   - `TINA_PUBLIC_IS_LOCAL` (set to "false")
   - `GITHUB_OWNER`
   - `GITHUB_REPO`
   - `GITHUB_BRANCH`
   - `GITHUB_PERSONAL_ACCESS_TOKEN`

2. **Configure Build Settings**

   In your Cloudflare Pages project:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node.js version: 18 (or latest LTS)

3. **Deploy from GitHub**

   Connect your GitHub repository to Cloudflare Pages and set up automatic deployments from the main branch.

### Cloudflare Pages Configuration

A `cloudflare-pages.toml` file has been created in the root of the project with the necessary configuration:

```toml
# Cloudflare Pages Configuration

[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

# Environment variables needed for TinaCMS
[env.production]
  NEXT_PUBLIC_TINA_CLIENT_ID = "56844d01-3e31-4c3c-b165-956a1f1e0198"
  TINA_TOKEN = "7a0024bf17443a12d8bf5054e078bd42af60c5e0"
  TINA_PUBLIC_IS_LOCAL = "false"
  GITHUB_OWNER = "CLAYYO"
  GITHUB_REPO = "wayne-leighton"
  GITHUB_BRANCH = "main"
  GITHUB_PERSONAL_ACCESS_TOKEN = "7a0024bf17443a12d8bf5054e078bd42af60c5e0"
```

### Troubleshooting

If you encounter the error "Client not configured properly. Missing clientId, token", it means the environment variables are not being properly loaded during the build process.

1. Double-check that all environment variables are correctly set in your Cloudflare Pages project settings
2. Ensure the environment variables are accessible during the build process
3. Check the build logs for any errors related to environment variables

### Local Development

For local development, the `.env` file is already configured with:

```
NEXT_PUBLIC_TINA_CLIENT_ID=56844d01-3e31-4c3c-b165-956a1f1e0198
TINA_TOKEN=7a0024bf17443a12d8bf5054e078bd42af60c5e0
TINA_PUBLIC_IS_LOCAL=true
```

This allows you to run TinaCMS locally without connecting to GitHub.