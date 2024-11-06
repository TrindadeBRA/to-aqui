'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { useRef } from 'react'
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { filterSchema } from '../schema' // Defina o schema de validação para os filtros
import { useRouter } from 'next/navigation'
import { toast } from '@/components/ui/use-toast'

type UserFilterSheetProps = {
    children?: React.ReactNode,
    onApplyFilters: (filters: { name?: string; email?: string; role?: string }) => void
}

export function UserFilterSheet({ children, onApplyFilters }: UserFilterSheetProps) {
    const ref = useRef<HTMLDivElement>(null)
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(filterSchema),
    })

    const onSubmit = form.handleSubmit(async (data) => {        
        onApplyFilters(data)
        ref.current?.click()
        toast({
            title: 'Filtros Aplicados',
            description: 'Os filtros foram aplicados com sucesso.',
        })
    })

    return (
        <Sheet>
            <SheetTrigger asChild>
                <div ref={ref}>{children}</div>
            </SheetTrigger>
            <SheetContent>
                <Form {...form}>
                    <form onSubmit={onSubmit} className="space-y-8 h-screen">
                        <SheetHeader>
                            <SheetTitle>Filtrar Usuários</SheetTitle>
                            <SheetDescription>
                                Aplique filtros para refinar a lista de usuários. Clique em aplicar quando terminar.
                            </SheetDescription>
                        </SheetHeader>

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite o nome do usuário" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Filtre usuários pelo nome.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite o email do usuário" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Filtre usuários pelo email.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cargo</FormLabel>
                                    <FormControl>
                                        <select
                                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 text-xs"
                                            {...field}
                                        >
                                            <option value="">Selecione um papel</option>
                                            <option value="USER">Usuário</option>
                                            <option value="ADMIN">Administrador</option>
                                        </select>
                                    </FormControl>
                                    <FormDescription>
                                        Filtre usuários pelo papel.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <SheetFooter className="mt-auto">
                            <Button type="submit">Aplicar Filtros</Button>
                        </SheetFooter>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    )
} 