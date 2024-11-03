'use client'

import { useEffect, useState } from 'react'
import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderNav,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from '@/components/dashboard/page'
import { Button } from '@/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import { getUsers } from './actions'
// import { UserUpsertSheet } from './_components/user-upsert-sheet'
import { UserDataTable } from './_components/user-data-table'
import { useRouter } from 'next/navigation'

export default function Page() {
  const [users, setUsers] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const loadUsers = async () => {
      const data = await getUsers()
      if (data) setUsers(data)
    }
    loadUsers()
  }, [])

  if (!users.length) {
    return <div>Nenhum usuário encontrado</div>
  }

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
        <UserDataTable data={users} />
      </DashboardPageMain>
    </DashboardPage>
  )
}
