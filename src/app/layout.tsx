import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from './_components/theme-provider'
import Script from 'next/script'

import './globals.css'
import { SessionProvider } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ToAqui Online | Cardápio Digital Profissional para seu Estabelecimento',
  description: 'ToAqui Online oferece uma plataforma digital para restaurantes, bares e cafés, facilitando a presença online e a interação com clientes. Cadastre-se e tenha seu cardápio digital em minutos!',
  openGraph: {
    title: 'ToAqui Online | Cardápio Digital Profissional para seu Estabelecimento',
    description: 'ToAqui Online oferece uma plataforma digital para restaurantes, bares e cafés, facilitando a presença online e a interação com clientes. Cadastre-se e tenha seu cardápio digital em minutos!',
    url: 'https://to-aqui.thetrinityweb.com.br',
    siteName: 'ToAqui Online',
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/assets/OGIMAGE.png`],
    locale: 'pt-BR',
    type: 'website',
  },
  icons: {
    icon: [
      { rel: 'icon', url: `${process.env.NEXT_PUBLIC_APP_URL}/assets/favicon.ico`, sizes: 'any' },
    ],
    apple: [
      { rel: 'apple-touch-icon', url: `${process.env.NEXT_PUBLIC_APP_URL}/assets/favicon.ico`, sizes: 'any' },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: '#2166f2',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9804371639852685"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
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
