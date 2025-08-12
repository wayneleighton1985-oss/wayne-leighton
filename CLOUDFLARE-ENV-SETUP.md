# Setting Up Environment Variables in Cloudflare Pages Dashboard

If the environment variables in `wrangler.toml` and `cloudflare-pages.toml` are not being recognized, you can set them directly in the Cloudflare Pages dashboard.

## Steps

1. Go to the Cloudflare Pages dashboard
2. Select your project (wayne-leighton)
3. Go to Settings > Environment variables
4. Add the following environment variables:

```
NEXT_PUBLIC_TINA_CLIENT_ID=56844d01-3e31-4c3c-b165-956a1f1e0198
TINA_TOKEN=7a0024bf17443a12d8bf5054e078bd42af60c5e0
TINA_PUBLIC_IS_LOCAL=false
GITHUB_OWNER=CLAYYO
GITHUB_REPO=wayne-leighton
GITHUB_BRANCH=main
GITHUB_PERSONAL_ACCESS_TOKEN=7a0024bf17443a12d8bf5054e078bd42af60c5e0
```

5. Make sure to set these variables for both Production and Preview environments
6. Save the changes
7. Trigger a new deployment

## Alternative: Using GitHub Secrets

If you're using GitHub Actions for deployment, make sure the secrets are properly set in your GitHub repository:

1. Go to your GitHub repository
2. Go to Settings > Secrets and variables > Actions
3. Add the following secrets:

```
NEXT_PUBLIC_TINA_CLIENT_ID
TINA_TOKEN
TINA_GITHUB_OWNER
TINA_GITHUB_REPO
TINA_GITHUB_TOKEN
CLOUDFLARE_API_TOKEN
CLOUDFLARE_ACCOUNT_ID
```

4. Make sure the values match those in your `.env.production` file
5. Trigger a new deployment by pushing to the main branch