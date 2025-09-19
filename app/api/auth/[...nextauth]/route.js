import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session, user }) {
      // Add user ID and registration status to session
      session.user.id = user.id
      session.user.isRegistered = user.isRegistered || false
      console.log('🔄 NextAuth: Session created:', {
        email: session.user.email,
        isRegistered: session.user.isRegistered
      })
      return session
    },
    async signIn({ user, account, profile }) {
      console.log('🔄 NextAuth: Sign in attempt for:', user.email)
      // Allow sign in
      return true
    },
    async redirect({ url, baseUrl }) {
      console.log('🔄 NextAuth: Redirect callback:', { url, baseUrl })
      // Handle post-login redirect
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return `${baseUrl}/api/auth/callback`
    }
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }