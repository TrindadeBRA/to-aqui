'use client'

import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { createUser, updateUser } from '../actions'

interface UserFormProps {
  user?: {
    id?: string
    name?: string
    email?: string
    role?: 'ADMIN' | 'USER'
  }
  mode: 'create' | 'edit' | 'view'
}

export function UserForm({ user, mode }: UserFormProps) {
  const router = useRouter()
  const isViewMode = mode === 'view'
  
  const form = useForm({
    defaultValues: {
      id: user?.id ?? '',
      name: user?.name ?? '',
      email: user?.email ?? '',
      password: '',
      role: user?.role ?? 'USER'
    }
  })

  async function onSubmit(data: any) {
    try {
      if (mode === 'create') {
        await createUser(data)
      } else if (mode === 'edit') {
        await updateUser(data)
      }
      
      router.push('/app/admin/users')
      router.refresh()
    } catch (error) {
      console.error('Erro ao processar usuário:', error)
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
                  <Input {...field} disabled={isViewMode} placeholder="Digite o email" type="email" />
                </FormControl>
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
                    <Input {...field} type="password" placeholder="Digite a senha" />
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
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um perfil" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="USER">Usuário</SelectItem>
                    <SelectItem value="ADMIN">Administrador</SelectItem>
                  </SelectContent>
                </Select>
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
            <Button type="submit">
              {mode === 'create' ? 'Criar' : 'Salvar'}
            </Button>
          </div>
        )}
      </form>
    </Form>
  )
} 