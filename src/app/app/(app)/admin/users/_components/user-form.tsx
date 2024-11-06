'use client'

import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { createUser, updateUser } from '../actions'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { passwordSchema } from '@/app/(auth)/validation/password-validation'
import { useMutation } from '@tanstack/react-query'
import { toast } from '@/components/ui/use-toast'
import { PasswordInput } from '@/components/ui/password-input'
import { nameSchema } from '@/app/(auth)/validation/name-validation'

interface UserFormProps {
  user?: {
    id?: string
    name?: string
    email?: string
    role?: 'ADMIN' | 'USER'
  }
  mode: 'create' | 'edit' | 'view'
}

const userSchema = z.object({
  id: z.string().optional(),
  name: nameSchema,
  email: z.string().email("Email inválido"),
  password: passwordSchema,
  role: z.enum(['ADMIN', 'USER'])
})

export function UserForm({ user, mode }: UserFormProps) {
  const router = useRouter()
  const isViewMode = mode === 'view'
  
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      id: user?.id ?? '',
      name: user?.name ?? '',
      email: user?.email ?? '',
      password: '',
      role: user?.role ?? 'USER'
    }
  })

  const { errors } = form.formState

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      router.push('/app/admin/users')
      router.refresh()
      toast({
        title: 'Usuário criado com sucesso',
        description: 'O usuário foi criado com sucesso',
      })
    },
    onError: (error: any) => {
      console.error('Erro ao criar usuário:', error)
    }
  })

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      router.push('/app/admin/users')
      router.refresh()
      toast({
        title: 'Usuário atualizado com sucesso',
        description: 'O usuário foi atualizado com sucesso',
      })
    },
    onError: (error: any) => {
      console.error('Erro ao atualizar usuário:', error)
    }
  })

  async function onSubmit(data: any) {
    if (mode === 'create') {
      createUserMutation.mutate(data)
    } else if (mode === 'edit') {
      updateUserMutation.mutate(data)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          {(mode === 'edit' || mode === 'view') && (
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID</FormLabel>
                  <FormControl>
                    <Input {...field} disabled placeholder="ID do usuário" />
                  </FormControl>
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isViewMode} placeholder="Digite o nome" />
                </FormControl>
                {errors.name && (
                  <p className="text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isViewMode || mode === 'edit'} placeholder="Digite o email" type="email" />
                </FormControl>
                {errors.email && (
                  <p className="text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </FormItem>
            )}
          />

          {(mode === 'create' || mode === 'edit') && (
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} placeholder="Digite a senha" error={errors.password?.message} />
                  </FormControl>
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Perfil</FormLabel>
                <Select 
                  disabled={isViewMode} 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl className="text-xs">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um perfil" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="USER" className="text-xs">Usuário</SelectItem>
                    <SelectItem value="ADMIN" className="text-xs">Administrador</SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && (
                  <p className="text-sm text-red-500">
                    {errors.role.message}
                  </p>
                )}
              </FormItem>
            )}
          />
        </div>

        {!isViewMode && (
          <div className="flex justify-end gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => router.back()}
            >
              Cancelar
            </Button>
            <Button
              type="submit" 
              disabled={createUserMutation.isPending || updateUserMutation.isPending} 
              className="disabled:cursor-not-allowed"
            >
              {mode === 'create' ? 'Criar' : 'Salvar'}
            </Button>
          </div>
        )}
      </form>
    </Form>
  )
} 