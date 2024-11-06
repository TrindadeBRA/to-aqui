'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useToast } from '@/components/ui/use-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Eye, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { deleteUser } from '../actions'
import { DeleteUserAlert } from './delete-user-alert'

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface UserDataTableProps {
  data: User[]
}

export function UserDataTable({ data }: UserDataTableProps) {
  const { toast } = useToast()
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)

  const { mutate: deleteUserMutation } = useMutation({
    mutationFn: (userId: string) => deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usersList'] })
      toast({
        title: 'Usuário excluído com sucesso',
        description: 'O usuário foi excluído com sucesso.',
        variant: 'default',
      })
      router.refresh()
    },
    onError: () => {
      toast({
        title: 'Erro ao excluir usuário',
        description: 'Não foi possível excluir o usuário.',
        variant: 'destructive',
      })
    }
  })

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (userToDelete) {
      deleteUserMutation(userToDelete.id)
      setIsDeleteDialogOpen(false)
      setUserToDelete(null)
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Função</TableHead>
              <TableHead className="w-[150px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => {
                            navigator.clipboard.writeText(user.id)
                            toast({
                              title: 'ID copiado com sucesso',
                              description: 'O ID foi copiado para a área de transferência.',
                              variant: 'default',
                            })
                          }}
                        >
                          Copiar ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => router.push(`/app/admin/users/${user.id}/view`)}>
                          <Eye width={16} height={16} className='mr-2' />
                          Visualizar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push(`/app/admin/users/${user.id}/edit`)}>
                          <Pencil width={16} height={16} className='mr-2' />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteUser(user)} className='text-destructive  hover:text-destructive'>
                          <Trash2 width={16} height={16} className='mr-2' />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <DeleteUserAlert
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={confirmDelete}
        user={userToDelete}
      />
    </>
  )
} 