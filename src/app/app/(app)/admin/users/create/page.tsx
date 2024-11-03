import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from '@/components/dashboard/page'
import { UserForm } from '../_components/user-form'

export default function UserCreatePage() {
  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Criar Usuário</DashboardPageHeaderTitle>
      </DashboardPageHeader>
      <DashboardPageMain>
        <UserForm mode="create" />
      </DashboardPageMain>
    </DashboardPage>
  )
} 