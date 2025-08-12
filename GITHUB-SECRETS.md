# GitHub Secrets Setup Guide for Cloudflare Pages Deployment

To deploy this project to Cloudflare Pages using GitHub Actions, you need to set up the following secrets in your GitHub repository:

## Required Secrets

1. **NEXT_PUBLIC_TINA_CLIENT_ID**
   - Value: `56844d01-3e31-4c3c-b165-956a1f1e0198`
   - Description: The TinaCMS client ID

2. **TINA_TOKEN**
   - Value: `7a0024bf17443a12d8bf5054e078bd42af60c5e0`
   - Description: The TinaCMS token

3. **TINA_GITHUB_OWNER**
   - Value: `CLAYYO`
   - Description: The GitHub username or organization that owns the repository

4. **TINA_GITHUB_REPO**
   - Value: `wayne-leighton`
   - Description: The name of the GitHub repository

5. **TINA_GITHUB_TOKEN**
   - Value: `7a0024bf17443a12d8bf5054e078bd42af60c5e0`
   - Description: A GitHub personal access token with repo scope

6. **CLOUDFLARE_API_TOKEN**
   - Value: Your Cloudflare API token with Pages permissions
   - Description: API token for Cloudflare Pages deployment

7. **CLOUDFLARE_ACCOUNT_ID**
   - Value: Your Cloudflare account ID
   - Description: The ID of your Cloudflare account

## Setting Up Secrets

1. Go to your GitHub repository
2. Click on "Settings"
3. In the left sidebar, click on "Secrets and variables" > "Actions"
4. Click on "New repository secret"
5. Add each of the secrets listed above

## Verifying Secrets

After setting up the secrets, you can verify them by:

1. Going to the "Actions" tab in your repository
2. Clicking on the "Deploy" workflow
3. Clicking on "Run workflow"
4. Selecting the branch you want to deploy from
5. Clicking on "Run workflow"

The workflow will use these secrets to build and deploy your site.