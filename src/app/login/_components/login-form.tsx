'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { toast } from '@/components/ui/use-toast'

type LoginFormData = {
  email: string
  password: string
}

export function LoginForm() {
  const form = useForm<LoginFormData>()

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Falha ao fazer login')
      }

      toast({
        title: 'Login realizado com sucesso!',
        description: 'Você será redirecionado em instantes.',
      })
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Email ou senha incorretos. Tente novamente.',
        variant: 'destructive',
      })
    }
  })

  return (
    <div className="mx-auto max-w-sm space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Entrar</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Digite suas credenciais para acessar sua conta
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
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
    </div>
  )
}
