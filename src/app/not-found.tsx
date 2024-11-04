import { Button } from '@/components/salient/components/Button'
import { Logo } from '@/components/salient/components/Logo'
import { SlimLayout } from '@/components/salient/components/SlimLayout'
import Link from 'next/link'

export default function NotFound() {
  return (
    <SlimLayout>
      <div className="flex">
        <Link href="/" aria-label="Início">
          <Logo className="h-10 w-auto" />
        </Link>
      </div>
      <p className="mt-20 text-sm font-bold text-gray-900">404</p>
      <h1 className="mt-3 text-lg font-semibold text-gray-900">
        Página não encontrada
      </h1>
      <p className="mt-3 text-sm text-gray-700">
        Desculpe, não conseguimos encontrar a página que você está procurando.
      </p>
      <Button href="/" className="mt-10" variant="solid" color="blue">
        Voltar
      </Button>
    </SlimLayout>
  )
}
