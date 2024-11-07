import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { PrismaAdapter } from '@auth/prisma-adapter'
import { compareSync } from 'bcrypt-ts'
import { prisma } from '../database'
import { createStripeCustomer } from '../stripe'


export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  pages: {
    signIn: '/login',
    signOut: '/logout',
    newUser: '/app',
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email as string,
          },
        })

        if (!user) {
          return null
        }

        const passwordMatch = compareSync(
          credentials.password as string,
          user.password ?? '',
        )

        return passwordMatch ? user : null
      },
    }),
  ],
  events: {
    createUser: async (message) => {
      await createStripeCustomer({
        name: message.user.name as string,
        email: message.user.email as string,
      })
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.userId = user.id
        token.email = user.email
        token.role = (user as any).role
      }

      if (trigger === 'update' && session) {
        return { ...token, ...session }
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        const user = await prisma.user.findUnique({
          where: { id: token.userId as string },
          select: {
            id: true,
            stripeCustomerId: true,
            stripeSubscriptionId: true,
            stripePriceId: true,
            stripeSubscriptionStatus: true,
            role: true,
            name: true,
          },
        })

        session.user.id = token.userId as string
        session.user.stripeSubscriptionId = user?.stripeSubscriptionId || null
        session.user.stripePriceId = user?.stripePriceId || null
        session.user.stripeCustomerId = user?.stripeCustomerId || null
        session.user.role = user?.role || 'USER'
        session.user.name = user?.name || ''
        // console.log("session", session)
      }
      return session
    },
    authorized: ({ auth }) => auth?.user?.role === "ADMIN",
  },
})
