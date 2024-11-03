'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useForm } from 'react-hook-form'
import { createUser } from '../actions'

interface UserFormProps {
  onSuccess: () => void
}

interface FormData {
  name: string
  email: string
  role: string
  password: string
}

export function UserForm({ onSuccess }: UserFormProps) {
  const form = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      role: 'USER',
      password: ''
    }
  })

  const onSubmit = async (data: FormData) => {
    try {
      await createUser(data)
      onSuccess()
    } catch (error) {
      console.error('Erro ao criar usuário:', error)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
      <div className="space-y-2">
        <Input placeholder="Nome" {...form.register('name')} />
        <Input placeholder="Email" type="email" {...form.register('email')} />
        <Input placeholder="Senha" type="password" {...form.register('password')} />
        <Select {...form.register('role')}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma função" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ADMIN">Administrador</SelectItem>
            <SelectItem value="USER">Usuário</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full">Salvar</Button>
    </form>
  )
} 