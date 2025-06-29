import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import axios from 'axios'
import http from 'http'

export default NextAuth({
  session: {
    jwt: true,
    strategy: "jwt"
  },
  providers: [
    Credentials({
      credentials: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD
      },
      async authorize(credentials) {
        return { id: credentials.username}
      }
    }
    )],
  callbacks: {
    async jwt({ token }) {
      return token
    },
    async session({ session, token }) {
      return {
        ...session, token
      }
    },
  },
  pages: {
    signOut: '/'
  }
})