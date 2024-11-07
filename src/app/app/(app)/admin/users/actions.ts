'use server'

import { passwordSchema } from "@/app/(auth)/schemas/password-validation"
import { prisma } from "@/services/database"
import { createStripeCustomer } from "@/services/stripe"
import { Role } from "@prisma/client"
import { hashSync } from "bcrypt-ts"
import { z } from 'zod'

type User = {
    id: string
    name: string | null
    email: string
    role: string
}

type CreateUserData = {
    name: string
    email: string
    role: string
    password: string
}

type UpdateUserData = {
    id: string
    name: string
    email: string
    role: string
    password?: string
}

export async function getUsers(
  page: number = 1,
  limit: number = 10,
  filters: { name?: string; email?: string; role?: string } = {}
): Promise<{ users: User[]; total: number }> {
  try {
    const skip = (page - 1) * limit

    const whereClause: any = {}
    if (filters.name) {
      whereClause.name = {
        contains: filters.name,
        mode: 'insensitive',
      }
    }
    if (filters.email) {
      whereClause.email = {
        contains: filters.email,
        mode: 'insensitive',
      }
    }
    if (filters.role) {
      whereClause.role = filters.role
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        where: whereClause,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      }),
      prisma.user.count({
        where: whereClause,
      }),
    ])

    return { users: users as User[], total }
  } catch (error) {
    console.error('Erro ao buscar usuários:', error)
    throw new Error('Não foi possível carregar os usuários')
  }
}

export async function deleteUser(id: string) {
    try {
        await prisma.user.delete({
            where: {
                id,
            },
        })
        return { success: true }
    } catch (error) {
        console.error('Erro ao deletar usuário:', error)
        throw new Error('Não foi possível deletar o usuário')
    }
}

const createUserSchema = z.object({
    name: z.string()
        .min(1, 'O nome é obrigatório')
        .min(3, 'O nome deve ter pelo menos 3 caracteres')
        .max(100, 'O nome deve ter no máximo 100 caracteres')
        .regex(/^[a-zA-ZÀ-ÿ\s]*$/, 'O nome deve conter apenas letras'),
    email: z.string()
        .min(1, 'O email é obrigatório')
        .email('Formato de email inválido')
        .max(150, 'O email deve ter no máximo 150 caracteres'),
    password: passwordSchema,
    role: z.enum(['ADMIN', 'USER'], {
        errorMap: () => ({ message: 'Papel de usuário inválido' })
    })
})

export async function createUser(data: CreateUserData) {
    try {
        const validatedData = createUserSchema.parse(data)

        const existingUser = await prisma.user.findUnique({
            where: {
                email: validatedData.email,
            },
        })

        if (existingUser) {
            throw new Error('Este email já está em uso')
        }

        const hashedPassword = hashSync(validatedData.password);

        const user = await prisma.user.create({
            data: {
                name: validatedData.name,
                email: validatedData.email,
                role: validatedData.role as Role,
                password: hashedPassword,
            },
        })

        await createStripeCustomer({
            name: validatedData.name ?? undefined,
            email: validatedData.email ?? '',
        })

        return { success: true, user }

    } catch (error) {
        if (error instanceof z.ZodError) {
            throw new Error(error.errors[0].message)
        }
        console.error('Erro ao criar usuário:', error)
        throw error
    }
}

const updateUserSchema = z.object({
    name: z.string()
        .min(1, 'O nome é obrigatório')
        .min(3, 'O nome deve ter pelo menos 3 caracteres')
        .max(100, 'O nome deve ter no máximo 100 caracteres')
        .regex(/^[a-zA-ZÀ-ÿ\s]*$/, 'O nome deve conter apenas letras'),
    email: z.string()
        .min(1, 'O email é obrigatório')
        .email('Formato de email inválido')
        .max(150, 'O email deve ter no máximo 150 caracteres'),
    role: z.enum(['ADMIN', 'USER'], {
        errorMap: () => ({ message: 'Papel de usuário inválido' })
    })
})

export async function updateUser(data: UpdateUserData) {
    try {
        const { id, ...updateData } = data
        const validatedData = updateUserSchema.parse(updateData)

        const existingUser = await prisma.user.findUnique({
            where: { email: validatedData.email, NOT: { id } },
        })

        if (existingUser) {
            throw new Error('Este email já está em uso')
        }

        const userData: any = {
            name: validatedData.name,
            email: validatedData.email,
            role: validatedData.role as Role,
        }

        if (data.password) {
            userData.password = hashSync(data.password)
        }

        const user = await prisma.user.update({
            where: { id },
            data: userData
        })

        return { success: true, user }
    } catch (error) {
        if (error instanceof z.ZodError) {
            throw new Error(error.errors[0].message)
        }
        console.error('Erro ao atualizar usuário:', error)
        throw error
    }
}

export async function getUserById(id: string) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })
        return user
    } catch (error) {
        console.error('Erro ao buscar usuário:', error)
        return null
    }
} 