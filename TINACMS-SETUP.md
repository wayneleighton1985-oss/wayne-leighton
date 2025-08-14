# TinaCMS Setup and Troubleshooting Guide

This guide explains how to set up and troubleshoot TinaCMS for both local development and production environments.

## Understanding TinaCMS Modes

TinaCMS operates in two modes:

### 1. Local Mode

In local mode (`TINA_PUBLIC_IS_LOCAL=true`), TinaCMS:
- Loads/saves content from your local filesystem
- Does not require login to enter edit mode
- Tries to connect to `http://localhost:4001` for its API
- Is meant for local development only

### 2. Production Mode

In production mode (`TINA_PUBLIC_IS_LOCAL=false`), TinaCMS:
- Authenticates directly with GitHub
- Requires login to edit content
- Commits changes to your configured GitHub repository
- Uses the TinaCMS Cloud API or your self-hosted backend

## Setup Instructions

### Local Development Setup

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
   http://localhost:4321/admin/index.html
   ```

### Production Setup

1. Run the production setup script:
   ```bash
   ./setup-tina-prod.sh
   ```

2. Build the project for production:
   ```bash
   npm run build:full
   ```

3. Preview the production build locally:
   ```bash
   npm run preview
   ```
   This will serve the production build at http://localhost:4322/

4. Access the TinaCMS admin interface at:
   ```
   http://localhost:4322/admin/index.html
   ```

5. Deploy the `dist` directory to your hosting provider

## Configuration Details

The TinaCMS configuration is defined in `tina/config.ts` and includes:

- **Branch**: Determines which GitHub branch to use for content
- **Client ID and Token**: Authentication credentials for TinaCMS Cloud
- **API URL**: The endpoint for the TinaCMS API
- **Build Settings**: Output folder, public folder, and base path
- **Media Settings**: Configuration for media uploads
- **Schema**: Content model definitions

## Troubleshooting

### Failed Loading TinaCMS Assets

If you see "Failed loading TinaCMS assets" error:

1. **Check Local vs Production Mode**:
   - For local development, ensure `TINA_PUBLIC_IS_LOCAL=true`
   - For production, ensure `TINA_PUBLIC_IS_LOCAL=false`

2. **Verify API URL Configuration**:
   - The `apiURL` in `tina/config.ts` should match your environment
   - For local: `http://localhost:4001/graphql`
   - For production: `https://content.tinajs.io/content/{client_id}/github/{branch}`

3. **Check Asset Loading**:
   - Ensure the `basePath` is correctly set in the build configuration
   - For sub-path deployments, set `basePath` to the sub-path value

### Connection Refused Errors

If you see `net::ERR_CONNECTION_REFUSED` errors:

1. **For Local Development**:
   - Ensure the TinaCMS server is running (started with `npm run dev`)
   - Check that port 4001 is not blocked by a firewall
   - Verify that `TINA_PUBLIC_IS_LOCAL=true` in your environment

2. **For Production**:
   - Ensure `TINA_PUBLIC_IS_LOCAL=false`
   - Verify that your GitHub token has the correct permissions
   - Check that your client ID and token are valid

## Environment Variables

The following environment variables are used to configure TinaCMS:

- `NEXT_PUBLIC_TINA_CLIENT_ID`: Your TinaCMS client ID
- `TINA_TOKEN`: Your TinaCMS token
- `TINA_PUBLIC_IS_LOCAL`: Set to `true` for local development, `false` for production
- `GITHUB_OWNER`: The GitHub username or organization that owns the repository
- `GITHUB_REPO`: The name of the GitHub repository
- `GITHUB_BRANCH`: The branch to use for content (default: `main`)
- `GITHUB_PERSONAL_ACCESS_TOKEN`: Your GitHub personal access token