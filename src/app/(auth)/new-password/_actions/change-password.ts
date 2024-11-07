'use server'

import { prisma } from '@/services/database'
import { hashSync } from 'bcrypt-ts'

export async function changePassword({ email, token, newPassword }: { email: string, token: string, newPassword: string }) {
  try {
    // Verificar se o token existe e é válido
    const passwordReset = await prisma.passwordReset.findUnique({
      where: { token },
    })

    if (!passwordReset) {
      throw new Error('Token inválido ou expirado.')
    }

    // Verificar se o token pertence ao email fornecido
    if (passwordReset.email !== email) {
      throw new Error('Token não corresponde ao email fornecido.')
    }

    // Verificar se o token ainda é válido
    if (new Date() > passwordReset.expiresAt) {
      throw new Error('Token expirado.')
    }

    // Hash da nova senha
    const hashedPassword = hashSync(newPassword)

    // Atualizar a senha do usuário
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    })

    // Remover o token de redefinição de senha
    await prisma.passwordReset.delete({
      where: { token },
    })

    return { success: true, message: 'Senha alterada com sucesso.' }
  } catch (error:any) {
    console.error('Erro ao alterar a senha:', error)
    throw new Error(error.message)
  }
}

