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
import { useState, useCallback } from 'react'
import { UserFilterSheet } from './_components/user-filter-sheet'

export default function Page() {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState({ name: '', email: '', role: '' })
  const limit = 15

  const { data, isLoading } = useQuery({
    queryKey: ['usersList', page, filters],
    queryFn: () => getUsers(page, limit, filters)
  })

  const totalPages = data ? Math.ceil(data.total / limit) : 1

  const handleClick = () => {
    router.push('/app/admin/users/create')
  }

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1)
    }
  }

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1)
    }
  }

  const handleApplyFilters = useCallback((newFilters: any) => {
    setFilters(newFilters)
    setPage(1)
  }, [])

  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Usuários</DashboardPageHeaderTitle>
        <DashboardPageHeaderNav>
          <div className="flex gap-2">
            <Button variant={'outline'} onClick={handleClick}>
              <PlusIcon className="w-4 h-4 mr-3" />
              Usuário
            </Button>
            <UserFilterSheet onApplyFilters={handleApplyFilters}>
              <Button variant={'outline'}>Filtrar</Button>
            </UserFilterSheet>
          </div>
        </DashboardPageHeaderNav>
      </DashboardPageHeader>
      <DashboardPageMain>
        {isLoading ? (
          <UserDataTableSkeleton />
        ) : (
          <UserDataTable data={data?.users as any || []} />
        )}

        <div className="flex justify-center mt-4 gap-2">
          {
            page > 1 && (
              <Button onClick={handlePreviousPage} disabled={page === 1} variant={'outline'}>
                Anterior
              </Button>
            )
          }

          {
            page < totalPages && (
              <Button onClick={handleNextPage} disabled={page === totalPages} variant={'outline'}>
                Próximo
              </Button>
            )
          }
        </div>

      </DashboardPageMain>
    </DashboardPage>
  )
}
