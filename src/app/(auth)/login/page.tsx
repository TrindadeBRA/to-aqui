import { type Metadata } from 'next'
import Link from 'next/link'

import { Logo } from '@/components/salient/components/Logo'
import { SlimLayout } from '@/components/salient/components/SlimLayout'
import { LoginForm } from './_components/login-form'

export const metadata: Metadata = {
  title: 'Entrar',
}

export default function Login() {
  return (
    <SlimLayout>
      <div className="flex">
        <Link href="/" aria-label="Home">
          <Logo className="h-10 w-auto" />
        </Link>
      </div>
      <h2 className="mt-20 text-lg font-semibold text-gray-900">
        Entre na sua conta
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        Não tem uma conta?{' '}
        <Link
          href="/register"
          className="font-medium text-blue-600 hover:underline"
        >
          Cadastre-se
        </Link>{' '}
        para um teste gratuito.
      </p>
      <LoginForm />
      <p className="mt-8 text-sm text-gray-700">
        <Link
          href="/forgot-password"
          className="font-medium text-blue-600 hover:underline"
        >
          Esqueceu a senha?
        </Link>
      </p>
    </SlimLayout>
  )
}
