import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from './_components/theme-provider'

import './globals.css'
import { SessionProvider } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ToAqui Online - TheTrinityWeb.com.br',
  description: 'ToAqui Online oferece uma plataforma digital para restaurantes, bares e cafés, facilitando a presença online e a interação com clientes. Cadastre-se e tenha seu cardápio digital em minutos!',
  openGraph: {
    title: 'ToAqui Online - TheTrinityWeb.com.br',
    description: 'ToAqui Online oferece uma plataforma digital para restaurantes, bares e cafés, facilitando a presença online e a interação com clientes. Cadastre-se e tenha seu cardápio digital em minutos!',
    url: 'https://to-aqui.thetrinityweb.com.br',
    siteName: 'ToAqui Online',
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/assets/OGIMAGE.png`],
    locale: 'pt-BR',
    type: 'website',
  },
  // themeColor: '#1a6aeb',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  )
}
