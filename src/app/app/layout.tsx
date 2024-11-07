import { PropsWithChildren } from 'react'
import { MainSidebar } from './_components/main-sidebar'
import { auth } from '@/services/auth'
import { MobileNav } from './_components/mobile-nav'

export default async function Layout({ children }: PropsWithChildren) {
  const session = await auth()

  if (!session?.user) {
    return <div>Loading...</div>
  }

  return (
      <div className="flex flex-col md:grid md:grid-cols-[16rem_1fr]">
        <div className="hidden md:block">
          <MainSidebar user={session?.user} />
        </div>

        <div className="border-b md:hidden p-4">
          <MobileNav user={session?.user} />
        </div>

        <main className="flex-1">{children}</main>
      </div>
  )
}
