import { z } from 'zod'

export const nameSchema = z.string()
  .min(1, 'O nome é obrigatório')
  .min(3, 'O nome deve ter pelo menos 3 caracteres')
  .max(100, 'O nome deve ter no máximo 100 caracteres')
  .regex(/^[a-zA-ZÀ-ÿ\s]*$/, 'O nome deve conter apenas letras') 