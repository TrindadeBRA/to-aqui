'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Button as ButtonSalient } from '@/components/salient/components/Button'
import { useForm } from 'react-hook-form'
import { toast } from '@/components/ui/use-toast'
import { register } from '../_actions/register'
import { PasswordInput } from '@/components/ui/password-input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { passwordSchema } from '@/app/(auth)/schemas/password-validation'
import { nameSchema } from '../../schemas/name-validation'

const createFormSchema = z.object({
name: nameSchema,
email: z.string()
  .min(1, 'O email é obrigatório')
  .email('Formato de email inválido')
  .max(150, 'O email deve ter no máximo 150 caracteres'),
password: passwordSchema,
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
      <PasswordInput
        id="password"
        placeholder="Digite sua senha"
        {...form.register('password')}
        error={form.formState.errors.password?.message}
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="confirmPassword">Confirmar Senha</Label>
      <PasswordInput
        id="confirmPassword"
        placeholder="Confirme sua senha"
        {...form.register('confirmPassword')}
        error={form.formState.errors.confirmPassword?.message}
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
        {form.formState.isSubmitting ? 'Criando conta' : 'Criar conta'}
        <span aria-hidden="true" className="pl-2">
          {form.formState.isSubmitting ? '...' : '→'}
        </span>
      </span>
    </ButtonSalient>
  </form>
)
}
