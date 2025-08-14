# Redirects Configuration for Cloudflare Pages

## Overview

This document explains the configuration of the `_redirects` file for the Wayne Leighton Books website deployed on Cloudflare Pages.

## The `_redirects` File

The `_redirects` file in the `public` directory is used by Cloudflare Pages to configure URL redirects and rewrites. This is particularly important for single-page applications (SPAs) and for serving admin interfaces like TinaCMS.

## Current Configuration

The current configuration in the `_redirects` file is:

```
/admin/* /admin/:splat 200
/* /index.html 200
```

### Explanation

1. `/admin/* /admin/:splat 200`
   - This rule ensures that all requests to paths starting with `/admin/` are correctly served from the corresponding files in the `/admin/` directory.
   - The `:splat` parameter captures the rest of the path after `/admin/` and passes it through.
   - The `200` status code indicates that this is a rewrite (not a redirect), meaning the URL in the browser doesn't change.
   - This is crucial for TinaCMS to work correctly, as it ensures that asset files like JavaScript and CSS are properly loaded.

2. `/* /index.html 200`
   - This is a catch-all rule that serves the main `index.html` file for all other routes.
   - This is necessary for single-page applications to handle client-side routing.
   - The `200` status code indicates that this is a rewrite.

## Why This Configuration Is Important

Without the specific `/admin/*` rule, all requests (including those for TinaCMS assets) would be redirected to the main `index.html` file, causing the "Failed loading TinaCMS assets" error. The admin interface needs its assets to be served correctly from the `/admin/assets/` directory.

## Modifying the Configuration

If you need to add additional redirects or rewrites:

1. Edit the `public/_redirects` file.
2. Add new rules **before** the catch-all rule (`/* /index.html 200`).
3. Rebuild and redeploy the site.

## Testing Redirects Locally

When testing locally with `npm run preview`, the `_redirects` file is used to simulate the behavior of Cloudflare Pages. This allows you to verify that your redirects work correctly before deploying.

## Additional Resources

- [Cloudflare Pages Redirects Documentation](https://developers.cloudflare.com/pages/platform/redirects/)
- [Netlify Redirects Documentation](https://docs.netlify.com/routing/redirects/) (Cloudflare Pages uses a similar format)