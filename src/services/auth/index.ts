import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/nodemailer'
import CredentialsProvider from 'next-auth/providers/credentials'

import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '../database'
import { createStripeCustomer } from '../stripe'

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  pages: {
    signIn: '/auth?v=signIn',
    signOut: '/auth?v=signOut',
    error: '/auth?v=error',
    verifyRequest: '/auth?v=verifyRequest',
    newUser: '/app?v=newUser',
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
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
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
})
