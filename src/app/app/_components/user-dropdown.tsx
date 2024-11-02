import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  LockClosedIcon,
  MixerVerticalIcon,
  RocketIcon,
  MoonIcon,
  SunIcon,
} from '@radix-ui/react-icons'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'

type UserDropdownProps = {
  user: Session['user']
}

export function UserDropdown({ user }: UserDropdownProps) {
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  if (!user) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="link"
          className="relative h-8 flex items-center justify-between w-full space-x-2 !px-0 truncate"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image as string} alt={user.name as string} />
            <AvatarFallback className="bg-[#2166f2] text-white">{user.name?.[0] ?? "U"}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col flex-1 space-y-1 text-left w-full">
            {user.name && (
              <p className="text-xs font-medium leading-none">{user.name}</p>
            )}
            <p className="text-[12px] leading-none text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-[12px] leading-none text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => {
            router.push('/app/settings')
          }}>
            <MixerVerticalIcon className="w-3 h-3 mr-3" />
            Configurações
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {
            router.push('/app/settings/billing')
          }}>
            <RocketIcon className="w-3 h-3 mr-3" />
            Planos
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? (
              <>
                <SunIcon className="w-3 h-3 mr-3" />
                Modo Claro
              </>
            ) : (
              <>
                <MoonIcon className="w-3 h-3 mr-3" />
                Modo Escuro
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-500" onClick={() => signOut()}>
          <LockClosedIcon className="w-3 h-3 mr-3 text-red-500 hover:text-red-500" />
          <span className="text-red-500 hover:text-red-500">Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
