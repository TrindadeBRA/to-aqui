'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'


export function CancelPlanCard() {


  return (
    <Card>
      <CardHeader className="border-b border-border">
        <CardTitle>Cancelar Plano</CardTitle>
        <CardDescription>
          Você pode cancelar seu plano PRO a qualquer momento.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="text-muted-foreground text-sm">
          Ao cancelar, você continuará tendo acesso ao plano PRO até o final do período atual.
          Após isso, sua conta será convertida para o plano gratuito.
        </p>
      </CardContent>
      <CardFooter className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-border pt-6">
        <span className="text-red-500 text-xs">Lorem ipsum. </span>
        <Button
          variant="destructive"
          onClick={() => console.log('Cancelar assinatura')}
          type='button'
        >
          Cancelar Assinatura
        </Button>
      </CardFooter>
    </Card>
  )
} 