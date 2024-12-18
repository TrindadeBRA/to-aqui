import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

    
interface PlanUsageCardProps {
  plan: any,
  createCheckoutSessionAction: () => void
}

export function PlanUsageCard({ plan, createCheckoutSessionAction }: PlanUsageCardProps) {
  return (
    <form action={createCheckoutSessionAction}>
      <Card>
        <CardHeader className="border-b border-border">
          <CardTitle>Uso do Plano</CardTitle>
          <CardDescription>
            Você está atualmente no{' '}
            <span className="font-bold uppercase">{plan.name}</span>.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <header className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">
                {plan.quota.TASKS.current}/{plan.quota.TASKS.available}
              </span>
              <span className="text-muted-foreground text-sm">
                {plan.quota.TASKS.usage}%
              </span>
            </header>
            <main>
              <Progress value={plan.quota.TASKS.usage} />
            </main>
          </div>
        </CardContent>
        {plan?.name?.toLowerCase() === 'free' && (
          <CardFooter className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-border pt-6">
            <span>Para um maior limite, assine o PRO</span>
            <Button type="submit">Assine por R$24,99/ mês</Button>
          </CardFooter>
        )}
      </Card>
    </form>
  )
} 