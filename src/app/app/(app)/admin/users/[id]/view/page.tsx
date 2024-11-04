'use client'

import {
    DashboardPage,
    DashboardPageHeader,
    DashboardPageHeaderTitle,
    DashboardPageMain,
} from '@/components/dashboard/page'
import { useQuery } from '@tanstack/react-query'
import { UserForm } from '../../_components/user-form'
import { getUserById } from '../../actions'

export default function UserViewPage({ params }: { params: { id: string } }) {

  const { data: user, isLoading } = useQuery({
    queryKey: ['userView', params.id],
    queryFn: () => getUserById(params.id)
  })

  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Visualizar Usuário</DashboardPageHeaderTitle>
      </DashboardPageHeader>
      <DashboardPageMain>
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px] text-yellow-500">
            Carregando...
          </div>
        ) : (
          <UserForm user={user as any} mode="view" />
        )}
      </DashboardPageMain>
    </DashboardPage>
  )
} 