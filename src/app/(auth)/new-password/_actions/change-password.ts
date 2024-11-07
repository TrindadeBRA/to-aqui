'use server'

import { prisma } from '@/services/database'
import { hashSync } from 'bcrypt-ts'
import { passwordSchema } from '../../schemas/password-validation'

export async function changePassword({ email, token, newPassword }: { email: string, token: string, newPassword: string }) {
  try {
    passwordSchema.parse(newPassword)

    const passwordReset = await prisma.passwordReset.findUnique({
      where: { token },
    })

    if (!passwordReset) {
      throw new Error('Token inválido ou expirado.')
    }

    if (passwordReset.email !== email) {
      throw new Error('Token não corresponde ao email fornecido.')
    }

    if (new Date() > passwordReset.expiresAt) {
      throw new Error('Token expirado.')
    }

    const hashedPassword = hashSync(newPassword)

    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    })

    await prisma.passwordReset.delete({
      where: { token },
    })

    return { success: true, message: 'Senha alterada com sucesso.' }
  } catch (error:any) {
    console.error('Erro ao alterar a senha:', error)
    throw new Error(error.message)
  }
}

