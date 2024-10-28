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
        if (!message.user.email) {
          console.error('Email não fornecido durante a criação do usuário')
          throw new Error('Email é obrigatório')
        }

        console.log('Dados completos do usuário:', message.user)
        console.log('Iniciando criação do cliente no Stripe:', {
          email: message.user.email,
          name: message.user.name || 'Usuário Anônimo', // fallback para quando name for null
        })

        await createStripeCustomer({
          name: message.user.name || 'Usuário Anônimo',
          email: message.user.email as string,
        })

        console.log('Cliente criado com sucesso no Stripe')
        console.log('Status da sessão após criação:', await auth())
      } catch (error) {
        console.error('Erro detalhado ao criar cliente:', {
          error,
          userData: message.user,
          timestamp: new Date().toISOString(),
        })
        throw error
      }
    },
  },
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      console.log('Tentativa de login:', { user, account, profile })
      return true
    },
    session: async ({ session, user }) => {
      console.log('Sessão sendo criada:', { session, user })
      return session
    },
    redirect: async ({ url, baseUrl }) => {
      console.log('Redirecionamento:', { url, baseUrl })
      return url.startsWith(baseUrl) ? url : baseUrl
    },
  },
})
