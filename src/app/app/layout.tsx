import { PropsWithChildren } from 'react'
import { MainSidebar } from './_components/main-sidebar'
import { auth } from '@/services/auth'
import { MobileNav } from './_components/mobile-nav'

export default async function Layout({ children }: PropsWithChildren) {
  const session = await auth()

  return (
    // Mudamos para flex por padrão (mobile) e grid apenas em telas maiores
    <div className="flex flex-col md:grid md:grid-cols-[16rem_1fr]">
      {/* Sidebar desktop */}
      <div className="hidden md:block">
        <MainSidebar user={session!.user} />
      </div>

      {/* Header mobile com menu */}
      <div className="border-b md:hidden p-4">
        <MobileNav user={session!.user} />
      </div>

      <main className="flex-1">{children}</main>
    </div>
  )
}
