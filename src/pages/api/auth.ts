export async function GET({ url, redirect }: { url: URL; redirect: (url: string) => Response }) {
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  
  if (!code) {
    // Redirect to GitHub OAuth
    const clientId = import.meta.env.GITHUB_CLIENT_ID;
    const redirectUri = `${url.origin}/api/auth`;
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo&state=${state || ''}`;
    
    return redirect(githubAuthUrl);
  }
  
  try {
    // Exchange code for token
    const clientId = import.meta.env.GITHUB_CLIENT_ID;
    const clientSecret = import.meta.env.GITHUB_CLIENT_SECRET;
    
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
      }),
    });
    
    const tokenData = await tokenResponse.json();
    
    if (tokenData.error) {
      throw new Error(tokenData.error_description || 'OAuth error');
    }
    
    // Create the response that Decap CMS expects
    const authData = {
      token: tokenData.access_token,
      provider: 'github'
    };
    
    // Return HTML that will post the message to the parent window (CMS)
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Authorization Complete</title>
    </head>
    <body>
      <script>
        (function() {
          function receiveMessage(e) {
            console.log("Received message:", e);
            window.opener.postMessage(
              'authorization:github:success:${JSON.stringify(authData)}',
              e.origin
            );
            window.close();
          }
          
          window.addEventListener("message", receiveMessage, false);
          
          // Also try to post immediately
          if (window.opener) {
            window.opener.postMessage(
              'authorization:github:success:${JSON.stringify(authData)}',
              '*'
            );
            window.close();
          }
        })();
      </script>
      <p>Authorization successful. This window should close automatically.</p>
    </body>
    </html>`;
    
    return new Response(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
    
  } catch (error) {
    console.error('OAuth error:', error);
    
    const errorHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Authorization Error</title>
    </head>
    <body>
      <script>
        if (window.opener) {
          window.opener.postMessage(
            'authorization:github:error:${error.message}',
            '*'
          );
          window.close();
        }
      </script>
      <p>Authorization failed: ${error.message}</p>
    </body>
    </html>`;
    
    return new Response(errorHtml, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  }
}