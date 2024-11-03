import { auth } from '@/services/auth'
import { getUserCurrentPlan } from '@/services/stripe'
import { PlanUsageCard } from './components/PlanUsageCard'
import { CancelPlanCard } from './components/CancelPlanCard'
import { createCheckoutSessionAction } from './actions'

export default async function Page() {
  const session = await auth()
  const plan = await getUserCurrentPlan(session?.user.id as string)

  const handleCancelSubscription = () => {
    console.log('Cancelar assinatura')
  }

  return (
    <div className="space-y-6">
      <PlanUsageCard 
        plan={plan} 
        createCheckoutSessionAction={createCheckoutSessionAction} 
      />
      <CancelPlanCard />
    </div>
  )
}
