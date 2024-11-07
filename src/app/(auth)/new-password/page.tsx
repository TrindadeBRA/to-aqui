import { Logo } from '@/components/salient/components/Logo'
import { SlimLayout } from '@/components/salient/components/SlimLayout'
import { type Metadata } from 'next'
import Link from 'next/link'
import { NewPasswordForm } from './_components/new-password-form'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Defina sua nova senha',
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
        Nova Senha
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        Digite sua nova senha abaixo para redefinir o acesso à sua conta.
      </p>
      <Suspense fallback={<div>Carregando...</div>}>
        <NewPasswordForm />
      </Suspense>
    </SlimLayout>
  )
}
