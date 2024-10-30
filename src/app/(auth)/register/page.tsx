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
      {/* <form
        action="#"
        className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2"
      >
        <TextField
          label="Nome"
          name="first_name"
          type="text"
          autoComplete="given-name"
          required
        />
        <TextField
          label="Sobrenome"
          name="last_name"
          type="text"
          autoComplete="family-name"
          required
        />
        <TextField
          className="col-span-full"
          label="Endereço de email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <TextField
          className="col-span-full"
          label="Senha"
          name="password"
          type="password"
          autoComplete="new-password"
          required
        />
        <SelectField
          className="col-span-full"
          label="Como você nos conheceu?"
          name="referral_source"
        >
          <option>Busca AltaVista</option>
          <option>Comercial do Super Bowl</option>
          <option>Nosso anúncio no ônibus da rota 34</option>
          <option>O podcast "Nunca Use Isto"</option>
        </SelectField>
        <div className="col-span-full">
          <Button type="submit" variant="solid" color="blue" className="w-full">
            <span>
              Cadastrar <span aria-hidden="true">&rarr;</span>
            </span>
          </Button>
        </div>
      </form> */}
    </SlimLayout>
  )
}
