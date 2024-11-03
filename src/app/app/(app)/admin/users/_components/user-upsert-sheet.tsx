'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useState } from 'react'
import { UserForm } from './user-form'

interface UserUpsertSheetProps {
  children: React.ReactNode
}

export function UserUpsertSheet({ children }: UserUpsertSheetProps) {
  const [open, setOpen] = useState(false)

  const handleSuccess = () => {
    console.log('Tentando fechar o sheet...') // Debug
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-full sm:max-w-[480px]">
        <SheetHeader>
          <SheetTitle>Novo Usuário</SheetTitle>
        </SheetHeader>
        <UserForm onSuccess={handleSuccess} />
      </SheetContent>
    </Sheet>
  )
} 