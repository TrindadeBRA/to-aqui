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
import { UserUpsertSheet } from './_components/user-upsert-sheet'
import { UserDataTable } from './_components/user-data-table'

export default async function Page() {
  const users = await getUsers()

  if (!users) {
    return <div>Nenhum usuário encontrado</div>
  }

  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Usuários</DashboardPageHeaderTitle>
        <DashboardPageHeaderNav>
          <UserUpsertSheet>
            <Button variant="outline" size="sm">
              <PlusIcon className="w-4 h-4 mr-3" />
              Usuário
            </Button>
          </UserUpsertSheet>
        </DashboardPageHeaderNav>
      </DashboardPageHeader>
      <DashboardPageMain>
        <UserDataTable data={users as any[]} />
      </DashboardPageMain>
    </DashboardPage>
  )
}
