import { z } from 'zod'

export const passwordSchema = z.string()
  .min(6, 'A senha deve ter pelo menos 6 caracteres')
  .max(50, 'A senha deve ter no máximo 50 caracteres')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
    'A senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número'
  ) 