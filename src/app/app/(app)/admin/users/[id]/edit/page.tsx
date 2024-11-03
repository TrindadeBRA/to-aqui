import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from '@/components/dashboard/page'
import { getUserById } from '../../actions'
import { UserForm } from '../../_components/user-form'

export default async function UserEditPage({ params }: { params: { id: string } }) {
  const user = await getUserById(params.id)

  if (!user) {
    return <div>Usuário não encontrado</div>
  }

  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Editar Usuário</DashboardPageHeaderTitle>
      </DashboardPageHeader>
      <DashboardPageMain>
        <UserForm user={user} mode="edit" />
      </DashboardPageMain>
    </DashboardPage>
  )
} 