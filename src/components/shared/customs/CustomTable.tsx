import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import type { Direction } from '@/i18n/useDirection';
import LoadingOverlay from '../loader/LoadingOverlay';

export type CustomTableMeta = {
  className?: string;
  headerClassName?: string;
};

type CustomTableProps<TData> = {
  columns: ColumnDef<TData>[];
  data: TData[];
  emptyMessage?: string;
  className?: string;
  dir?: Direction;
  rowClassName?: (row: TData) => string;
  isFetching?: boolean;
};

function CustomTable<TData>({
  columns,
  data,
  emptyMessage = 'No records found.',
  className,
  dir,
  rowClassName,
  isFetching = false,
}: CustomTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded border border-neutral-100 bg-white',
        className,
      )}
      dir={dir}
    >
      {isFetching && <LoadingOverlay />}
      <Table>
        <TableHeader className='bg-primary-50'>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className='border-b border-[#EAEBEB] hover:bg-transparent'
            >
              {headerGroup.headers.map((header) => {
                const meta = header.column.columnDef.meta as CustomTableMeta | undefined;
                return (
                  <TableHead
                    key={header.id}
                    className={cn(
                      'type-body-xs h-12 overflow-clip p-2 text-start text-neutral-400',
                      meta?.headerClassName,
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className={cn(
                  'h-16 border-b border-[#EAEBEB] bg-white hover:bg-white',
                  rowClassName?.(row.original),
                )}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => {
                  const meta = cell.column.columnDef.meta as CustomTableMeta | undefined;
                  return (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        'type-body-xs-semibold items-center justify-center overflow-clip p-2 text-start',
                        meta?.className,
                      )}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow className='hover:bg-white'>
              <TableCell
                className='type-body-xs h-28 p-2 text-center text-neutral-400'
                colSpan={columns.length}
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default CustomTable;
