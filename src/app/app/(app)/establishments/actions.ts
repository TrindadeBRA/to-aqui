'use server'

import { auth } from '@/services/auth'
import { prisma } from '@/services/database'
import { z } from 'zod'
import { deleteEstablishmentSchema, upsertEstablishmentSchema } from './schema'

export async function getEstablishments() {
  const session = await auth()

  const establishments = await prisma.establishment.findMany({
    where: {
      userId: session?.user?.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return establishments
}

export async function upsertEstablishment(input: z.infer<typeof upsertEstablishmentSchema>) {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: 'Não autorizado',
      data: null,
    }
  }

  if (input.id) {
    const establishment = await prisma.establishment.findUnique({
      where: {
        id: input.id,
        userId: session?.user?.id,
      },
    })

    if (!establishment) {
      return {
        error: 'Estabelecimento não encontrado',
        data: null,
      }
    }

    const updatedEstablishment = await prisma.establishment.update({
      where: {
        id: input.id,
        userId: session?.user?.id,
      },
      data: input,
    })

    return {
      error: null,
      data: updatedEstablishment,
    }
  }

  const establishment = await prisma.establishment.create({
    data: {
      ...input,
      userId: session?.user?.id,
    },
  })

  return {
    error: null,
    data: establishment,
  }
}

export async function deleteEstablishment(input: z.infer<typeof deleteEstablishmentSchema>) {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: 'Não autorizado',
      data: null,
    }
  }

  const establishment = await prisma.establishment.findUnique({
    where: {
      id: input.id,
      userId: session?.user?.id,
    },
  })

  if (!establishment) {
    return {
      error: 'Estabelecimento não encontrado',
      data: null,
    }
  }

  await prisma.establishment.delete({
    where: {
      id: input.id,
      userId: session?.user?.id,
    },
  })

  return {
    error: null,
    data: 'Estabelecimento excluído com sucesso',
  }
} 