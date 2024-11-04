'use client'

import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from '@/components/dashboard/page'
import { getUserById } from '../../actions'
import { UserForm } from '../../_components/user-form'
import { useQuery } from '@tanstack/react-query'

export default function UserEditPage({ params }: { params: { id: string } }) {

  const { data: user, isLoading } = useQuery({
    queryKey: ['userEdit', params.id],
    queryFn: () => getUserById(params.id)
  })

  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Editar Usuário</DashboardPageHeaderTitle>
      </DashboardPageHeader>
      <DashboardPageMain>
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px] text-yellow-500">
            Carregando...
          </div>
        ) : (
          <UserForm user={user as any} mode="edit" />
        )}
      </DashboardPageMain>
    </DashboardPage>
  )
} 