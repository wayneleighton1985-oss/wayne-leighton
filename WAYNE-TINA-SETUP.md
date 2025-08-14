# TinaCMS Setup for Wayne Leighton

## Overview

This document explains how TinaCMS has been configured for Wayne Leighton's website. TinaCMS is a headless content management system that allows you to edit your website content directly through a visual interface.

## Configuration Details

### GitHub Integration

TinaCMS has been configured to use Wayne's GitHub account for content management:

- **GitHub Username**: `wayneleighton1985-oss`
- **Repository**: `wayne-leighton`
- **Branch**: `main`

### Environment Variables

The following environment variables have been configured:

- `NEXT_PUBLIC_TINA_CLIENT_ID`: The TinaCMS client ID
- `TINA_TOKEN`: The TinaCMS token
- `TINA_PUBLIC_IS_LOCAL`: Set to `false` for production
- `GITHUB_OWNER`: Set to `wayneleighton1985-oss`
- `GITHUB_REPO`: Set to `wayne-leighton`
- `GITHUB_BRANCH`: Set to `main`
- `GITHUB_PERSONAL_ACCESS_TOKEN`: The GitHub personal access token

## Accessing TinaCMS

1. In production, the TinaCMS admin interface is available at:
   ```
   https://findyourpassion.co.uk/admin/
   ```

2. You will need to authenticate with GitHub to access the admin interface.

3. Once authenticated, you can edit your website content directly through the TinaCMS interface.

## Local Development

For local development:

1. Run the local development setup script:
   ```bash
   ./setup-tina-dev.sh
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Access the TinaCMS admin interface at:
   ```
   http://localhost:4321/admin/
   ```

## Deployment

The website is automatically deployed to Cloudflare Pages when changes are pushed to the `main` branch of the GitHub repository. The GitHub Actions workflow has been updated to use Wayne's GitHub username.

## Troubleshooting

If you encounter any issues with TinaCMS:

1. Check that the environment variables are correctly set.
2. Ensure that the GitHub personal access token has the correct permissions.
3. Check the browser console for any error messages.
4. Refer to the [TinaCMS documentation](https://tina.io/docs/) for more information.