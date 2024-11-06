'use client'

import { Button } from '@/components/ui/button'
import { Button as ButtonSalient } from '@/components/salient/components/Button'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { PasswordInput } from '@/components/ui/password-input'
import { passwordSchema } from '@/components/ui/password-validation'

const loginFormSchema = z.object({
  email: z.string()
    .min(1, 'O email é obrigatório')
    .email('Formato de email inválido')
    .max(150, 'O email deve ter no máximo 150 caracteres'),
  password: passwordSchema,
})

type LoginFormData = z.infer<typeof loginFormSchema>

export function LoginForm() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema)
  })
  const router = useRouter()

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const response = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: '/app',
      })

      if (!response) {
        throw new Error('Falha ao fazer login')
      }

      if (response.error === 'CredentialsSignin') {
        throw new Error('Email ou senha incorretos. Tente novamente.')
      }

      toast({
        title: 'Login realizado com sucesso!',
        description: 'Você será redirecionado em instantes.',
      })

      router.push('/app')
    } catch (error) {
      console.error('Erro no login:', error)

      toast({
        title: 'Erro',
        description: 'Email ou senha incorretos. Tente novamente.',
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
      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <PasswordInput
          id="password"
          placeholder="Digite sua senha"
          {...form.register('password')}
          error={form.formState.errors.password?.message}
        />
      </div>
      <ButtonSalient
        type="submit"
        variant="solid"
        color="blue"
        className="w-full py-3"
        disabled={form.formState.isSubmitting}
      >
        <span>
          {form.formState.isSubmitting ? 'Entrando' : 'Entrar'}
          <span aria-hidden="true" className="pl-2">
            {form.formState.isSubmitting ? '...' : '→'}
          </span>
        </span>
      </ButtonSalient>
    </form>
  )
}
