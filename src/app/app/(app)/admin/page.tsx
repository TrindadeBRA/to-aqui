import { DashboardPage, DashboardPageMain } from '@/components/dashboard/page'

export default async function Page() {
  return (
    <DashboardPage>
      <DashboardPageMain>
        <h1 className="text-2xl font-bold">Olá, Admin!</h1>
      </DashboardPageMain>
    </DashboardPage>
  )
}
