import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
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
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || 'Ov23lio8ysSo7SIjtUEJ',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      authorization: {
        params: {
          // We need the 'repo' scope for TinaCMS to work with GitHub
          scope: 'repo',
        },
      },
    }),
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