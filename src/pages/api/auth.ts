export async function GET({ url, request }: { url: URL; request: Request }) {
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  
  if (!code) {
    // Initial OAuth request - redirect to GitHub
    const clientId = import.meta.env.GITHUB_CLIENT_ID;
    const redirectUri = `${url.origin}/api/auth`;
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo&state=${state || ''}`;
    
    return Response.redirect(githubAuthUrl, 302);
  }
  
  try {
    // Exchange code for token
    const clientId = import.meta.env.GITHUB_CLIENT_ID;
    const clientSecret = import.meta.env.GITHUB_CLIENT_SECRET;
    
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
      }),
    });
    
    const tokenData = await tokenResponse.json();
    
    if (tokenData.error) {
      throw new Error(tokenData.error_description || 'OAuth error');
    }
    
    // Return the success page that communicates with the CMS
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Authorizing...</title>
  <script>
    (function() {
      const authData = {
        token: "${tokenData.access_token}",
        provider: "github"
      };
      
      const message = "authorization:github:success:" + JSON.stringify(authData);
      
      if (window.opener) {
        window.opener.postMessage(message, "*");
        window.close();
      } else {
        // Fallback - redirect to admin with token in hash
        window.location.href = "/admin/#access_token=${tokenData.access_token}&token_type=bearer";
      }
    })();
  </script>
</head>
<body>
  <p>Authorizing... This window should close automatically.</p>
</body>
</html>`;
    
    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
    
  } catch (error) {
    console.error('OAuth error:', error);
    return new Response(`OAuth Error: ${error.message}`, {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}