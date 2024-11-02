import { z } from 'zod'

export const upsertEstablishmentSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Nome é obrigatório'),
  slug: z.string().min(1, 'Slug é obrigatório'),
  email: z.string().email().optional().nullable(),
  phone: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  whatsapp: z.string().optional().nullable(),
  ifoodUrl: z.string().url().optional().nullable(),
  aboutUs: z.string().optional().nullable(),
  websiteUrl: z.string().url().optional().nullable(),
  openingHours: z.any().optional().nullable(),
  rating: z.number().min(0).max(5).optional().nullable(),
  category: z.enum(['RESTAURANT', 'BAR', 'CAFE']),
})

export const deleteEstablishmentSchema = z.object({
  id: z.string(),
}) 