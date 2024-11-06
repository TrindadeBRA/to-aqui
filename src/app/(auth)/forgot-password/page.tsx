import { type Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Esqueceu a Senha',
}

export default function ForgotPassword() {
  return (
    <SlimLayout>
      <div className="flex">
        <Link href="/" aria-label="Home">
          <Logo className="h-10 w-auto" />
        </Link>
      </div>
      <h2 className="mt-20 text-lg font-semibold text-gray-900">
        Esqueceu sua senha?
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        Lembra da sua senha?{' '}
        <Link
          href="/login"
          className="font-medium text-blue-600 hover:underline"
        >
          Entrar
        </Link>{' '}
        na sua conta.
      </p>
    </SlimLayout>
  )
}
