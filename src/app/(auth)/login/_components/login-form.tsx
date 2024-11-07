'use client'

import { Button as ButtonSalient } from '@/components/salient/components/Button'

import { passwordSchema } from '@/app/(auth)/schemas/password-validation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PasswordInput } from '@/components/ui/password-input'
import { toast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'

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

  const mutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: '/app',
      })

      if (!response || response.error === 'CredentialsSignin') {
        throw new Error('Email ou senha incorretos. Tente novamente.')
      }

      return response
    },
    onSuccess: () => {
      toast({
        title: 'Login realizado com sucesso!',
        description: 'Você será redirecionado em instantes.',
      })
      router.push('/app')
    },
    onError: (error: unknown) => {
      console.error('Erro no login:', error)
      toast({
        title: 'Erro',
        description: error instanceof Error ? error.message : 'Erro ao fazer login. Tente novamente.',
        variant: 'destructive',
      })
    }
  })

  const handleSubmit = form.handleSubmit((data) => {
    mutation.mutate(data)
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
        disabled={mutation.isPending}
      >
        <span>
          {mutation.isPending ? 'Entrando' : 'Entrar'}
          <span aria-hidden="true" className="pl-2">
            {mutation.isPending ? '...' : '→'}
          </span>
        </span>
      </ButtonSalient>
    </form>
  )
}
