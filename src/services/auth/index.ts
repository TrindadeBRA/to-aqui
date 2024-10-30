import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/nodemailer'
import CredentialsProvider from 'next-auth/providers/credentials'

import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '../database'
import { createStripeCustomer } from '../stripe'
import { compareSync } from 'bcrypt-ts'

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  pages: {
    signIn: '/login',
    signOut: '/logout',
    // error: '/auth?v=error',
    // verifyRequest: '/auth?v=verifyRequest',
    newUser: '/app',
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: 'sandbox.smtp.mailtrap.io',
        port: 587,
        auth: {
          user: '074245c3a9070d',
          pass: 'ad803e39bef73e',
        },
      },
      from: process.env.EMAIL_FROM,
      maxAge: 24 * 60 * 60,
    }),
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
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.userId = user.id
        token.email = user.email
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
          },
        })

        session.user.id = token.userId as string
        session.user.stripeSubscriptionId = user?.stripeSubscriptionId || null
        session.user.stripePriceId = user?.stripePriceId || null
        session.user.stripeCustomerId = user?.stripeCustomerId || null
      }
      return session
    },
  },
})
