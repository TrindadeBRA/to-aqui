'use client'

import {
  DashboardSidebar,
  DashboardSidebarHeader,
  DashboardSidebarMain,
  DashboardSidebarNav,
  DashboardSidebarNavMain,
  DashboardSidebarNavLink,
  DashboardSidebarNavHeader,
  DashboardSidebarNavHeaderTitle,
  DashboardSidebarFooter,
} from '@/components/dashboard/sidebar'
import { usePathname } from 'next/navigation'
import { HomeIcon, MixerVerticalIcon } from '@radix-ui/react-icons'
import { UserDropdown } from './user-dropdown'
import { Logo } from '@/components/logo'
import { Session } from 'next-auth'
import { CheckCheckIcon, StoreIcon, ShieldIcon, UsersIcon, AppWindow, ImagesIcon } from 'lucide-react'

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

                    <DashboardSidebarNavLink
                      href="/app/admin/platforms"
                      active={pathname.startsWith('/app/admin/platforms')}
                    >
                      <AppWindow className="size-4 mr-3" />
                      Plataformas
                    </DashboardSidebarNavLink>

                    <DashboardSidebarNavLink
                      href="/app/admin/platforms"
                      active={pathname.startsWith('/app/admin/platforms')}
                    >
                      <ImagesIcon className="size-4 mr-3" />
                      Mídias
                    </DashboardSidebarNavLink>


                  </div>
                  <hr className='mt-2'/>
              </div>
            )}

            <DashboardSidebarNavLink href="/app" active={isActive('/app')}>
              <HomeIcon className="size-4 mr-3" />
              Dashboard
            </DashboardSidebarNavLink>
            <DashboardSidebarNavLink href="/app/to-do" active={isActive('/app/to-do')}>
              <CheckCheckIcon className="size-4 mr-3" />
              Tarefas
            </DashboardSidebarNavLink>
            <DashboardSidebarNavLink
              href="/app/establishments"
              active={isActive('/app/establishments')}
            >
              <StoreIcon className="size-4 mr-3" />
              Estabelecimentos
            </DashboardSidebarNavLink>
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

