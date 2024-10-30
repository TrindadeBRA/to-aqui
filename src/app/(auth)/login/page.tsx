import { type Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/salient/components/Button'
import { TextField } from '@/components/salient/components/Fields'
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
      {/* <form action="#" className="mt-10 grid grid-cols-1 gap-y-8">
        <TextField
          label="Endereço de email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <TextField
          label="Senha"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
        <div>
          <Button type="submit" variant="solid" color="blue" className="w-full">
            <span>
              Entrar <span aria-hidden="true">&rarr;</span>
            </span>
          </Button>
        </div>
      </form> */}
    </SlimLayout>
  )
}
