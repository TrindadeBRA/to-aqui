'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Button as ButtonSalient } from '@/components/salient/components/Button'
import { useForm } from 'react-hook-form'
import { toast } from '@/components/ui/use-toast'
import { register } from '../_actions/register'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const createFormSchema = z.object({
  name: z.string()
    .min(1, 'O nome é obrigatório')
    .min(3, 'O nome deve ter pelo menos 3 caracteres')
    .max(100, 'O nome deve ter no máximo 100 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\s]*$/, 'O nome deve conter apenas letras'),
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
    ),
  confirmPassword: z.string()
    .min(1, 'A confirmação de senha é obrigatória')
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"]
})

type CreateFormData = z.infer<typeof createFormSchema>

export function CreateForm() {
  const form = useForm<CreateFormData>({
    resolver: zodResolver(createFormSchema)
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value)
      })
      await register(formData)

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
    <form onSubmit={handleSubmit} className="space-y-4 text-black mt-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          placeholder="Seu nome completo"
          {...form.register('name')}
        />
        {form.formState.errors.name && (
          <p className="text-sm text-red-500">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="seu@email.com"
          type="email"
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
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar Senha</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirme sua senha"
            {...form.register('confirmPassword')}
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
        {form.formState.errors.confirmPassword && (
          <p className="text-sm text-red-500">
            {form.formState.errors.confirmPassword.message}
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
          {form.formState.isSubmitting ? 'Criando conta' : 'Criar conta'}
          <span aria-hidden="true" className="pl-2">
            {form.formState.isSubmitting ? '...' : '→'}
          </span>
        </span>
      </ButtonSalient>
    </form>
  )
}
