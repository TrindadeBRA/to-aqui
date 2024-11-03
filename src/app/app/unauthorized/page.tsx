'use client'
import { DashboardPage, DashboardPageMain } from '@/components/dashboard/page'
import { useState, useEffect } from 'react'
import { LockIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import Link from 'next/link'
import { getUrl } from '@/lib/get-url'

export default function Component() {
    const [isVisible, setIsVisible] = useState(false)
    const { toast } = useToast()

    useEffect(() => {
        setIsVisible(true)
    }, [])

    const handleRedirect = () => {
        toast({
            title: "Redirecting",
            description: "You would be redirected to the homepage in a real application.",
        })
    }

    return (
        <DashboardPage>
            <DashboardPageMain className='h-full'>
                <div className="flex items-center justify-center w-full md:h-full">
                    <Card className={`p-6 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                        <CardHeader>
                            <div className="w-full flex justify-center mb-4">
                                <div className="relative">
                                    <div className='bg-secondary rounded-full p-6'>
                                        <LockIcon className="w-16 h-16 text-primary" />
                                    </div>
                                </div>
                            </div>
                            <CardTitle className="text-2xl font-bold text-center">Acesso não autorizado</CardTitle>
                            <CardDescription className="text-center">
                                Desculpe, você não tem permissão<br />
                                para visualizar esta página.
                            </CardDescription>
                        </CardHeader>
                        <CardFooter className="flex justify-center">
                            <Link href={getUrl('/app')} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent/80 bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                                Ir para Página Inicial
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </DashboardPageMain>
        </DashboardPage>
    )
}