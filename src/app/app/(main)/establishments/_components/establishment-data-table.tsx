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
import { Establishment } from '../types'
import { useRouter } from 'next/navigation'
import { deleteEstablishment } from '../actions'
import { toast } from '@/components/ui/use-toast'

type EstablishmentDataTableProps = {
  data: Establishment[]
}

export function EstablishmentDataTable({ data }: EstablishmentDataTableProps) {
  const router = useRouter()

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const handleDeleteEstablishment = async (establishment: Establishment) => {
    await deleteEstablishment({ id: establishment.id })
    router.refresh()

    toast({
      title: 'Exclusão bem-sucedida',
      description: 'O estabelecimento foi excluído com sucesso.',
    })
  }

  const columns: ColumnDef<Establishment>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <div className="text-left">
            <Button
              variant="link"
              onClick={() => {
                column.toggleSorting(column.getIsSorted() === 'asc')
              }}
            >
              Nome
              <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )
      },
      cell: ({ row }) => <div className="text-left">{row.getValue('name')}</div>,
    },
    {
      accessorKey: 'category',
      header: ({ column }) => {
        return (
          <div className="text-left">
            <Button
              variant="link"
              onClick={() => {
                column.toggleSorting(column.getIsSorted() === 'asc')
              }}
            >
              Categoria
              <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )
      },
      cell: ({ row }) => {
        const category = row.getValue('category') as string
        return (
          <div className="text-left">
            <Badge variant="outline">{category}</Badge>
          </div>
        )
      },
    },
    {
      accessorKey: 'rating',
      header: ({ column }) => (
        <div className="text-left">
          <Button
            variant="link"
            onClick={() => {
              column.toggleSorting(column.getIsSorted() === 'asc')
            }}
          >
            Avaliação
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => {
        const rating = row.getValue('rating') as number
        return <div className="text-left">{rating ? `${rating}/5` : 'N/A'}</div>
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const establishment = row.original

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
                  onClick={() => navigator.clipboard.writeText(establishment.id)}
                >
                  Copiar ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleDeleteEstablishment(establishment)}>
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