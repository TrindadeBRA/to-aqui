'use server'

import { prisma } from '@/services/database'
import { createStripeCustomer } from '@/services/stripe'
import { hashSync } from 'bcrypt-ts'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const registerSchema = z.object({
  name: z.string()
    .min(1, 'O nome é obrigatório')
    .min(3, 'O nome deve ter pelo menos 3 caracteres')
    .max(100, 'O nome deve ter no máximo 100 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\s]*$/, 'O nome deve conter apenas letras'),
  email: z.string()
    .min(1, 'O email é obrigatório')
    .email('Formato de email inválido')
    .max(150, 'O email deve ter no máximo 150 caracteres'),
  password: z.string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .max(50, 'A senha deve ter no máximo 50 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      'A senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número'
    )
})

export async function register(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries())
  
  try {
    // Valida os dados usando o schema
    const validatedData = registerSchema.parse({
      name: rawData.name,
      email: rawData.email,
      password: rawData.password
    })

    const existingUser = await prisma.user.findUnique({
      where: {
        email: validatedData.email,
      },
    })

    if (existingUser) {
      throw new Error('Este email já está em uso')
    }

    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashSync(validatedData.password),
      },
    })
    
    await createStripeCustomer({
      name: user.name ?? undefined,
      email: user.email ?? '',
    })

    redirect('/login')
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Pega o primeiro erro de validação
      throw new Error(error.errors[0].message)
    }
    throw error
  }
}
