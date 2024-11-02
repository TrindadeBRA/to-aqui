import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderNav,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from '@/components/dashboard/page'
import { Button } from '@/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import { getEstablishments } from './actions'
import { EstablishmentUpsertSheet } from './_components/establishment-upsert-sheet'
import { EstablishmentDataTable } from './_components/establishment-data-table'

export default async function Page() {
  const establishments = await getEstablishments()

  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Estabelecimentos</DashboardPageHeaderTitle>
        <DashboardPageHeaderNav>
          <EstablishmentUpsertSheet>
            <Button variant="outline" size="sm">
              <PlusIcon className="w-4 h-4 mr-3" />
              Adicionar estabelecimento
            </Button>
          </EstablishmentUpsertSheet>
        </DashboardPageHeaderNav>
      </DashboardPageHeader>
      <DashboardPageMain>
        <EstablishmentDataTable data={establishments} />
      </DashboardPageMain>
    </DashboardPage>
  )
} 