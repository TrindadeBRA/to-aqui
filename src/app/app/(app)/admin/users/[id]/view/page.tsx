'use client'

import {
    DashboardPage,
    DashboardPageHeader,
    DashboardPageHeaderTitle,
    DashboardPageMain,
} from '@/components/dashboard/page'
import { useQuery } from '@tanstack/react-query'
import { UserForm } from '../../_components/user-form'
import { UserFormSkeleton } from '../../_components/user-form-skeleton'
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
          <UserFormSkeleton />
        ) : (
          <UserForm user={user as any} mode="view" />
        )}
      </DashboardPageMain>
    </DashboardPage>
  )
} 