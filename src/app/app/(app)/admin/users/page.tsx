'use client'

import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderNav,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from '@/components/dashboard/page'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { UserDataTable } from './_components/user-data-table'
import { UserDataTableSkeleton } from './_components/user-data-table-skeleton'
import { getUsers } from './actions'

export default function Page() {
  const router = useRouter()
  
  const { data: users, isLoading } = useQuery({
    queryKey: ['usersList'],
    queryFn: () => getUsers()
  })

  const handleClick = () => {
    router.push('/app/admin/users/create')
  }

  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Usuários</DashboardPageHeaderTitle>
        <DashboardPageHeaderNav>
          <Button variant={'outline'} onClick={handleClick}>
            <PlusIcon className="w-4 h-4 mr-3" />
            Usuário
          </Button>
        </DashboardPageHeaderNav>
      </DashboardPageHeader>
      <DashboardPageMain>
        {isLoading ? (
          <UserDataTableSkeleton />
        ) : (
          <UserDataTable data={users as any[]} />
        )}
      </DashboardPageMain>
    </DashboardPage>
  )
}
