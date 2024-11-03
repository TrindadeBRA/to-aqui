import { z } from 'zod'

export const upsertUserSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'O nome é obrigatório'),
  email: z.string().email('Email inválido'),
  role: z.enum(['USER', 'ADMIN']),
})

export type UpsertUserSchema = z.infer<typeof upsertUserSchema>

export const deleteUserSchema = z.object({
  id: z.string(),
}) 