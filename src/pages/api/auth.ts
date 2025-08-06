export async function GET({ url, redirect }: { url: URL; redirect: (url: string) => Response }) {
  const code = url.searchParams.get('code');
  
  if (!code) {
    // Redirect to GitHub OAuth
    const clientId = import.meta.env.GITHUB_CLIENT_ID;
    const redirectUri = `${url.origin}/api/auth`;
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo`;
    
    return redirect(githubAuthUrl);
  }
  
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
  
  // Redirect back to admin with token
  const adminUrl = `${url.origin}/admin/#access_token=${tokenData.access_token}&token_type=bearer`;
  return redirect(adminUrl);
}