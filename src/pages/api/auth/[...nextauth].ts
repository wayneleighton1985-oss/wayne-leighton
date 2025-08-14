import NextAuth from 'next-auth';
// Fix for Astro build - use dynamic import for GithubProvider
import type { GithubProfile } from 'next-auth/providers/github';
import type { JWT } from 'next-auth/jwt';

// Extend the types to include our custom properties
declare module 'next-auth' {
  interface Session {
    accessToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
  }
}

export default NextAuth({
  providers: [
    {
      id: 'github',
      name: 'GitHub',
      type: 'oauth',
      authorization: {
        url: 'https://github.com/login/oauth/authorize',
        params: {
          // We need the 'repo' scope for TinaCMS to work with GitHub
          scope: 'repo',
        },
      },
      token: 'https://github.com/login/oauth/access_token',
      userinfo: 'https://api.github.com/user',
      clientId: process.env.GITHUB_CLIENT_ID || 'Ov23lio8ysSo7SIjtUEJ',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      profile(profile: GithubProfile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider
      session.accessToken = token.accessToken;
      return session;
    },
  },
});