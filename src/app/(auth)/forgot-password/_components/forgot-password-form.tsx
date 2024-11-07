'use client'

import { Button } from '@/components/ui/button'
import { Button as ButtonSalient } from '@/components/salient/components/Button'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { requestPasswordReset } from '../_actions/request-password-reset'

const forgotPasswordFormSchema = z.object({
  email: z.string()
    .min(1, 'O email é obrigatório')
    .email('Formato de email inválido')
    .max(150, 'O email deve ter no máximo 150 caracteres')
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordFormSchema>

export function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordFormSchema)
  })

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await requestPasswordReset(data.email)
      toast({
        title: 'Email enviado!',
        description: 'Verifique sua caixa de entrada para redefinir sua senha.',
      })
    } catch (error) {
      console.error('Erro ao enviar email:', error)

      toast({
        title: 'Erro',
        description: 'Não foi possível enviar o email. Tente novamente.',
        variant: 'destructive',
      })
    }
  })

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-black mt-6">
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
      <ButtonSalient
        type="submit"
        variant="solid"
        color="blue"
        className="w-full py-3"
        disabled={form.formState.isSubmitting}
      >
        <span>
          {form.formState.isSubmitting ? 'Enviando' : 'Enviar'}
          <span aria-hidden="true" className="pl-2">
            {form.formState.isSubmitting ? '...' : '→'}
          </span>
        </span>
      </ButtonSalient>
    </form>
  )
}
