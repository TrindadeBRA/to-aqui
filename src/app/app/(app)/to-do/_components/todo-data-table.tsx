'use client'

import * as React from 'react'
import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Todo } from '../types'
import { useRouter } from 'next/navigation'
import { deleteTodo, upsertTodo } from '../actions'
import { toast } from '@/components/ui/use-toast'

type TodoDataTable = {
  data: Todo[]
}

export function TodoDataTable({ data }: TodoDataTable) {
  const router = useRouter()

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const handleDeleteTodo = async (todo: Todo) => {
    await deleteTodo({ id: todo.id })
    router.refresh()

    toast({
      title: 'Exclusão bem-sucedida',
      description: 'O item da tarefa foi excluído com sucesso.',
    })
  }

  const handleToggleDoneTodo = async (todo: Todo) => {
    const doneAt = todo.doneAt ? null : new Date().toISOString()

    await upsertTodo({ id: todo.id, doneAt })
    router.refresh()

    toast({
      title: 'Atualização bem-sucedida',
      description: 'O item da tarefa foi atualizado com sucesso.',
    })
  }

  const columns: ColumnDef<Todo>[] = [
    {
      accessorKey: 'doneAt',
      header: ({ column }) => {
        return (
          <div className="text-left">
            <Button
              variant="link"
              onClick={() => {
                column.toggleSorting(column.getIsSorted() === 'asc')
                toast({
                  title: 'Ordenação atualizada',
                  description: `A coluna "Status da tarefa" foi ordenada em ordem ${column.getIsSorted() === 'asc' ? 'decrescente' : 'crescente'}.`,
                })
              }}
            >
              Status da tarefa
              <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )
      },
      cell: ({ row }) => {
        const { doneAt } = row.original
        const status: 'Concluído' | 'Pendente' = doneAt ? 'Concluído' : 'Pendente'
        const variant: 'outline' | 'secondary' = doneAt ? 'outline' : 'secondary'

        return (
          <div className="text-left">
            <Badge variant={variant}>{status}</Badge>
          </div>
        )
      },
    },
    {
      accessorKey: 'title',
      header: ({ column }) => {
        return (
          <div className="text-left">
            <Button
              variant="link"
              onClick={() => {
                column.toggleSorting(column.getIsSorted() === 'asc')
                toast({
                  title: 'Ordenação atualizada',
                  description: `A coluna "Título" foi ordenada em ordem ${column.getIsSorted() === 'asc' ? 'decrescente' : 'crescente'}.`,
                })
              }}
            >
              Título
              <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )
      },
      cell: ({ row }) => <div className="text-left">{row.getValue('title')}</div>,
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <div className="text-left">
          <Button
            variant="link"
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === 'asc')
              toast({
                title: 'Ordenação atualizada',
                description: `A coluna "Criado em" foi ordenada em ordem ${column.getIsSorted() === 'asc' ? 'decrescente' : 'crescente'}.`,
              })
            }}
          >
            Criado em
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="text-left font-medium">
            {new Date(row.original.createdAt).toLocaleDateString()}
          </div>
        )
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const todo = row.original

        return (
          <div className="text-left">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Abrir menu</span>
                  <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(todo.id)}
                >
                  Copiar ID da tarefa
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleToggleDoneTodo(todo)}>
                  Marcar como concluído
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDeleteTodo(todo)}>
                  Excluir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-left"
                >
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  )
}
