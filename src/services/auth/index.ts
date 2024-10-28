import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/nodemailer'

import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '../database'
import { createStripeCustomer } from '../stripe'

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  pages: {
    signIn: '/auth',
    signOut: '/auth',
    error: '/auth',
    verifyRequest: '/auth',
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
  ],
  events: {
    createUser: async (message) => {
      try {
        console.log('Iniciando criação do cliente no Stripe:', {
          email: message.user.email,
          name: message.user.name,
        })

        await createStripeCustomer({
          name: message.user.name as string,
          email: message.user.email as string,
        })

        console.log('Cliente criado com sucesso no Stripe')
      } catch (error) {
        console.error('Erro ao criar cliente no Stripe:', error)
        throw error
      }
    },
  },
})
