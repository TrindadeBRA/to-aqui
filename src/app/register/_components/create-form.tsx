'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { toast } from '@/components/ui/use-toast'

type CreateFormData = {
  name: string
  email: string
  password: string
}

export function CreateForm() {
  const form = useForm<CreateFormData>()

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      // Aqui você implementaria a chamada API para criar o usuário
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Falha ao criar conta')
      }

      toast({
        title: 'Conta criada com sucesso!',
        description: 'Você já pode fazer login com suas credenciais.',
      })
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao criar sua conta. Tente novamente.',
        variant: 'destructive',
      })
    }
  })

  return (
    <div className="mx-auto max-w-sm space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Criar Conta</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Preencha os dados abaixo para criar sua conta
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            placeholder="Seu nome completo"
            required
            {...form.register('name')}
          />
        </div>
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
          {form.formState.isSubmitting ? 'Criando conta...' : 'Criar conta'}
        </Button>
      </form>
    </div>
  )
}
