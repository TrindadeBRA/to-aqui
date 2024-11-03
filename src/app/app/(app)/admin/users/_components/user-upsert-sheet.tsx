'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useState } from 'react'
import { UserForm } from './user-form'

interface UserUpsertSheetProps {
  children: React.ReactNode
  user?: {
    id: string
    name: string
    email: string
    role: string
  }
}

export function UserUpsertSheet({ children, user }: UserUpsertSheetProps) {
  const [open, setOpen] = useState(false)

  const handleSuccess = () => {
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-full sm:max-w-[480px]">
        <SheetHeader>
          <SheetTitle>{user ? 'Editar Usuário' : 'Novo Usuário'}</SheetTitle>
        </SheetHeader>
        <UserForm onSuccess={handleSuccess} initialData={user} />
      </SheetContent>
    </Sheet>
  )
} 