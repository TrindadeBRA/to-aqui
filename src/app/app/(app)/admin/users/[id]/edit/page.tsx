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
import { UserFormSkeleton } from '../../_components/user-form-skeleton'

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
          <UserFormSkeleton />
        ) : (
          <UserForm user={user as any} mode="edit" />
        )}
      </DashboardPageMain>
    </DashboardPage>
  )
} 