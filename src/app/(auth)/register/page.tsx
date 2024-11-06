import { type Metadata } from 'next'
import Link from 'next/link'

import { CreateForm } from './_components/create-form'
import { SlimLayout } from '@/components/salient/components/SlimLayout'
import { Logo } from '@/components/salient/components/Logo'

export const metadata: Metadata = {
  title: 'Cadastro',
}

export default function Register() {
  return (
    <SlimLayout>
      <div className="flex">
        <Link href="/" aria-label="Home">
          <Logo className="h-10 w-auto" />
        </Link>
      </div>
      <h2 className="mt-20 text-lg font-semibold text-gray-900">
        Comece gratuitamente
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        Já tem uma conta?{' '}
        <Link
          href="/login"
          className="font-medium text-blue-600 hover:underline"
        >
          Entre
        </Link>{' '}
        na sua conta.
      </p>
      <CreateForm />
    </SlimLayout>
  )
}
