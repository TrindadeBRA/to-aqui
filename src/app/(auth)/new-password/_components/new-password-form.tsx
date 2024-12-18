'use client'

import { Button as ButtonSalient } from '@/components/salient/components/Button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PasswordInput } from '@/components/ui/password-input'
import { toast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { signOut } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { passwordSchema } from '../../schemas/password-validation'
import { changePassword } from '../_actions/change-password'
import { useMutation } from '@tanstack/react-query'

const newPasswordFormSchema = z.object({
  email: z.string()
    .min(1, 'O email é obrigatório')
    .email('Formato de email inválido')
    .max(150, 'O email deve ter no máximo 150 caracteres'),
  token: z.string().min(1, 'O token é obrigatório'),
  newPassword: passwordSchema,
  confirmPassword: z.string().min(1, 'A confirmação de senha é obrigatória')
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"]
})

type NewPasswordFormData = z.infer<typeof newPasswordFormSchema>

export function NewPasswordForm() {
  const searchParams = useSearchParams()
  const emailFromUrl = searchParams.get('email') || ''
  const tokenFromUrl = searchParams.get('token') || ''
  const router = useRouter()

  const form = useForm<NewPasswordFormData>({
    resolver: zodResolver(newPasswordFormSchema),
    defaultValues: {
      email: emailFromUrl,
      token: tokenFromUrl,
    }
  })

  const mutation = useMutation({
    mutationFn: async (data: NewPasswordFormData) => {
      await changePassword(data)
      await signOut({ redirect: false })
      router.push('/login')
      toast({
        title: 'Senha alterada com sucesso!',
        description: 'Você será redirecionado para a página de login.',
      })
    },
    onError: (error: unknown) => {
      console.error('Erro ao enviar email:', error)
      toast({
        title: 'Erro',
        description: error instanceof Error ? error.message : 'Ocorreu um erro ao alterar a senha. Tente novamente.',
        variant: 'destructive',
      })
    }
  })

  const handleSubmit = form.handleSubmit((data) => {
    mutation.mutate(data)
  })

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-black mt-6">
      {!emailFromUrl && (
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="seu@email.com"
            type="email"
            className="text-black"
            {...form.register('email')}
          />
          {form.formState.errors.email && (
            <p className="text-sm text-red-500">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>
      )}
      {!tokenFromUrl && (
        <div className="space-y-2">
          <Label htmlFor="token">Token</Label>
          <Input
            id="token"
            placeholder="Token de redefinição"
            {...form.register('token')}
          />
          {form.formState.errors.token && (
            <p className="text-sm text-red-500">
              {form.formState.errors.token.message}
            </p>
          )}
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="newPassword">Nova Senha</Label>
        <PasswordInput
          id="newPassword"
          placeholder="Digite sua nova senha"
          {...form.register('newPassword')}
          error={form.formState.errors.newPassword?.message}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
        <PasswordInput
          id="confirmPassword"
          placeholder="Confirme sua nova senha"
          {...form.register('confirmPassword')}
          error={form.formState.errors.confirmPassword?.message}
        />
      </div>
      <ButtonSalient
        type="submit"
        variant="solid"
        color="blue"
        className="w-full py-3"
        disabled={mutation.isPending}
      >
        <span>
          {mutation.isPending ? 'Enviando' : 'Enviar'}
          <span aria-hidden="true" className="pl-2">
            {mutation.isPending ? '...' : '→'}
          </span>
        </span>
      </ButtonSalient>
    </form>
  )
}
