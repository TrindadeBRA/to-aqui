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

const loginFormSchema = z.object({
  email: z.string()
    .min(1, 'O email é obrigatório')
    .email('Formato de email inválido')
    .max(150, 'O email deve ter no máximo 150 caracteres'),
  password: z.string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .max(50, 'A senha deve ter no máximo 50 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      'A senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número'
    )
})

type LoginFormData = z.infer<typeof loginFormSchema>

export function LoginForm() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema)
  })
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

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
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Digite sua senha"
            className="text-black"
            {...form.register('password')}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {!showPassword ? (
              <EyeOff className="size-5 text-black" />
            ) : (
              <Eye className="size-5 text-black" />
            )}
          </Button>
        </div>
        {form.formState.errors.password && (
          <p className="text-sm text-red-500">
            {form.formState.errors.password.message}
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
          {form.formState.isSubmitting ? 'Entrando' : 'Entrar'}
          <span aria-hidden="true" className="pl-2">
            {form.formState.isSubmitting ? '...' : '→'}
          </span>
        </span>
      </ButtonSalient>
    </form>
  )
}
