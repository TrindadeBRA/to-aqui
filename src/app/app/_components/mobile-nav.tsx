'use client'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { MainSidebar } from './main-sidebar'
import { Session } from 'next-auth'

type MobileNavProps = {
  user: Session['user']
}

export function MobileNav({ user }: MobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden">
          <HamburgerMenuIcon className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72">
        <MainSidebar user={user} />
      </SheetContent>
    </Sheet>
  )
}
