'use server'

import { prisma } from '@/services/database'
import { createStripeCustomer } from '@/services/stripe'
import { hashSync } from 'bcrypt-ts'
import { redirect } from 'next/navigation'

export async function register(formData: FormData) {
  const { name, email, password } = Object.fromEntries(formData.entries())

  if (!name || !email || !password) {
    throw new Error('Todos os campos são obrigatórios')
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email as string,
    },
  })

  if (existingUser) {
    throw new Error('Este email já está em uso')
  }

  const user = await prisma.user.create({
    data: {
      name: name as string,
      email: email as string,
      password: hashSync(password as string),
    },
  })

  await createStripeCustomer({
    name: user.name as string,
    email: user.email as string,
  })

  redirect('/login')
}
