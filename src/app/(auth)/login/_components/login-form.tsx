'use client'

import { createCheckoutSessionAction } from '@/app/app/settings/billing/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

type LoginFormData = {
  email: string
  password: string
}

export function LoginForm() {
  const form = useForm<LoginFormData>()
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

      window.location.href = '/app'
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
    <form onSubmit={handleSubmit} className="space-y-4 text-black">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="seu@email.com"
          required
          type="email"
          {...form.register('email')}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          required
          placeholder="••••••••"
          {...form.register('password')}
        />
      </div>
      <Button
        className="w-full"
        type="submit"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? 'Entrando...' : 'Entrar'}
      </Button>
    </form>
  )
}
