'use server'

import { prisma } from "@/services/database"
import { Role } from "@prisma/client"
import * as bcrypt from 'bcrypt-ts'
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

export async function getUsers(): Promise<User[]> {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            }
        })
        return users as User[]
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
    password: z.string()
        .min(6, 'A senha deve ter pelo menos 6 caracteres')
        .max(50, 'A senha deve ter no máximo 50 caracteres')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
            'A senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número'
        ),
    role: z.enum(['ADMIN', 'USER'], {
        errorMap: () => ({ message: 'Papel de usuário inválido' })
    })
})

export async function createUser(data: CreateUserData) {
    try {
        // Valida os dados usando o schema
        const validatedData = createUserSchema.parse(data)

        // Verifica se já existe um usuário com este email
        const existingUser = await prisma.user.findUnique({
            where: {
                email: validatedData.email,
            },
        })

        if (existingUser) {
            throw new Error('Este email já está em uso')
        }

        const hashedPassword = await bcrypt.hash(validatedData.password, 10)

        const user = await prisma.user.create({
            data: {
                name: validatedData.name,
                email: validatedData.email,
                role: validatedData.role as Role,
                password: hashedPassword,
            },
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