'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { createUser, updateUser } from '../actions'

interface UserFormProps {
  user?: any // Substitua 'any' pelo seu tipo de usuário
  mode: 'create' | 'edit' | 'view'
}

export function UserForm({ user, mode }: UserFormProps) {
  const router = useRouter()
  const isViewMode = mode === 'view'
  
  const form = useForm({
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      // adicione outros campos conforme necessário
    }
  })

  async function onSubmit(data: any) {
    try {
      if (mode === 'create') {
        await createUser(data)
      } else if (mode === 'edit') {
        await updateUser(data)
      }
      
      router.push('/admin/users')
      router.refresh()
    } catch (error) {
      console.error('Erro ao processar usuário:', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="name">Nome</label>
            <Input
              {...form.register('name')}
              disabled={isViewMode}
              placeholder="Digite o nome"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email">Email</label>
            <Input
              {...form.register('email')}
              disabled={isViewMode}
              placeholder="Digite o email"
            />
          </div>
          
          {/* Adicione outros campos conforme necessário */}
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