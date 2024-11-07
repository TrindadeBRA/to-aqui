'use client'

import {
  DashboardSidebar,
  DashboardSidebarFooter,
  DashboardSidebarHeader,
  DashboardSidebarMain,
  DashboardSidebarNav,
  DashboardSidebarNavHeader,
  DashboardSidebarNavHeaderTitle,
  DashboardSidebarNavLink,
  DashboardSidebarNavMain,
} from '@/components/dashboard/sidebar'
import { Logo } from '@/components/logo'
import { HomeIcon, MixerVerticalIcon } from '@radix-ui/react-icons'
import { BookOpenText, ImagesIcon, QrCodeIcon, ShieldIcon, StoreIcon, UsersIcon } from 'lucide-react'
import { Session } from 'next-auth'
import { usePathname } from 'next/navigation'
import { UserDropdown } from './user-dropdown'

type MainSidebarProps = {
  user: Session['user']
}

export function MainSidebar({ user }: MainSidebarProps) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <DashboardSidebar className="h-full">
      <DashboardSidebarHeader>
        <Logo />
      </DashboardSidebarHeader>
      <DashboardSidebarMain className="flex flex-col flex-grow">
        <DashboardSidebarNav>
          <DashboardSidebarNavMain className="flex flex-col gap-1">

            {user.role === 'ADMIN' && (
              <div className='mb-4'>

                <DashboardSidebarNavHeaderTitle className='flex flex-row gap-2 items-center mb-2 text-[#2166f2] font-semibold'>
                  <ShieldIcon className="size-3" />
                  Menu administrativo
                </DashboardSidebarNavHeaderTitle>

                  <div className='flex flex-col gap-1'>
                    <DashboardSidebarNavLink
                      href="/app/admin/users"
                      active={pathname.startsWith('/app/admin/users')}
                    >
                      <UsersIcon className="size-4 mr-3" />
                      Usuários
                    </DashboardSidebarNavLink>

                  </div>
                  <hr className='mt-2'/>
              </div>
            )}

            <DashboardSidebarNavLink href="/app" active={isActive('/app')}>
              <HomeIcon className="size-4 mr-3" />
              Início
            </DashboardSidebarNavLink>
            {/* <DashboardSidebarNavLink href="/app/to-do" active={isActive('/app/to-do')}>
              <CheckCheckIcon className="size-4 mr-3" />
              Tarefas
            </DashboardSidebarNavLink> */}
            <DashboardSidebarNavLink
              href="/app"
              active={isActive('/app/establishments')}
              className="opacity-50 cursor-not-allowed"
            >
              <StoreIcon className="size-4 mr-3" />
              Estabelecimentos
            </DashboardSidebarNavLink>
            <DashboardSidebarNavLink
              href="/app"
              active={isActive('/app/menus')}
              className="opacity-50 cursor-not-allowed"
            >
              <BookOpenText className="size-4 mr-3" />
              Cardápios
            </DashboardSidebarNavLink>
            <DashboardSidebarNavLink
              href="/app"
              active={isActive('/app/establishments')}
              className="opacity-50 cursor-not-allowed"
            >
              <ImagesIcon className="size-4 mr-3" />
              Midias sociais
            </DashboardSidebarNavLink>
            <DashboardSidebarNavLink
              href="/app"
              active={isActive('/app/social-medias')}
              className="opacity-50 cursor-not-allowed"
            >
              <QrCodeIcon className="size-4 mr-3" />
              Qr Codes
            </DashboardSidebarNavLink>
            {/* <DashboardSidebarNavLink
              href="/app/tools-recommendations"
              active={isActive('/app/tools-recommendations')}
            >
              <LightbulbIcon className="size-4 mr-3" />
              Recomendamos
            </DashboardSidebarNavLink> */}
            <DashboardSidebarNavLink
              href="/app/settings"
              active={isActive('/app/settings')}
            >
              <MixerVerticalIcon className="size-4 mr-3" />
              Ajustes
            </DashboardSidebarNavLink>
          </DashboardSidebarNavMain>
        </DashboardSidebarNav>

        <DashboardSidebarNav className="mt-auto">
          <DashboardSidebarNavHeader>
            <DashboardSidebarNavHeaderTitle>
              Links extras
            </DashboardSidebarNavHeaderTitle>
          </DashboardSidebarNavHeader>
          <DashboardSidebarNavMain>
            <DashboardSidebarNavLink href="/" className='text-xs'>
              Precisa de ajuda?
            </DashboardSidebarNavLink>
            <DashboardSidebarNavLink href="/app/settings/billing" className='text-xs'>
              Meu plano
            </DashboardSidebarNavLink>
            <DashboardSidebarNavLink href="/" className='text-xs'>Site</DashboardSidebarNavLink>
          </DashboardSidebarNavMain>
        </DashboardSidebarNav>
      </DashboardSidebarMain>
      <DashboardSidebarFooter>
        <UserDropdown user={user} />
      </DashboardSidebarFooter>
    </DashboardSidebar>
  )
}

