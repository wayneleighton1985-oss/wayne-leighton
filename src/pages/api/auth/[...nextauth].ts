// Import types only to avoid build errors
import type { GithubProfile } from 'next-auth/providers/github';
import type { JWT } from 'next-auth/jwt';
import type { NextAuthOptions } from 'next-auth';
import type { Session } from 'next-auth';

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

// Define auth options with proper types
const authOptions: NextAuthOptions = {
  providers: [
    {
      id: 'github',
      name: 'GitHub',
      type: 'oauth' as const, // Use const assertion to fix type error
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
    async jwt({ token, account }: { token: JWT; account: any }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // Send properties to the client, like an access_token from a provider
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

// For static builds, we need to implement getStaticPaths for dynamic routes

// This function is required for dynamic routes in static mode
export function getStaticPaths() {
  // Return an empty array since we don't actually want to generate any paths
  // This is just to satisfy Astro's requirement for dynamic routes
  return [];
}

// Import NextAuth dynamically to prevent build errors
async function getNextAuth() {
  try {
    const { default: NextAuth } = await import('next-auth');
    return NextAuth(authOptions);
  } catch (error) {
    console.error('Failed to load NextAuth:', error);
    return null;
  }
}

// Export GET handler
export async function GET(request: Request) {
  try {
    const handler = await getNextAuth();
    if (!handler) {
      return new Response('Auth not available', { status: 404 });
    }
    return handler.GET(request);
  } catch (error) {
    console.error('Auth GET error:', error);
    return new Response('Auth error', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const handler = await getNextAuth();
    if (!handler) {
      return new Response('Auth not available', { status: 404 });
    }
    return handler.POST(request);
  } catch (error) {
    console.error('Auth POST error:', error);
    return new Response('Auth error', { status: 500 });
  }
}