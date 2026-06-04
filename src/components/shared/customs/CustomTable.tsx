import type { ReactNode } from 'react';
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

export type CustomTableColumn<TData> = {
  key: string;
  header: ReactNode;
  cell: (row: TData) => ReactNode;
  className?: string;
  headerClassName?: string;
};

type CustomTableProps<TData> = {
  columns: CustomTableColumn<TData>[];
  data: TData[];
  getRowKey: (row: TData, index: number) => string;
  emptyMessage?: string;
  className?: string;
  dir?: Direction;
  rowClassName?: (row: TData) => string;
};

function CustomTable<TData>({
  columns,
  data,
  getRowKey,
  emptyMessage = 'No records found.',
  className,
  dir,
  rowClassName,
}: CustomTableProps<TData>) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded border border-neutral-100 bg-white',
        className
      )}
      dir={dir}
    >
      <Table>
        <TableHeader className='bg-primary-50'>
          <TableRow className='border-b border-[#EAEBEB] hover:bg-transparent'>
            {columns.map((column) => (
              <TableHead
                className={cn(
                  'h-12 overflow-clip p-2 text-start type-body-xs text-neutral-400',
                  column.headerClassName
                )}
                key={column.key}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <TableRow
                className={cn(
                  'h-16 border-b border-[#EAEBEB] bg-white hover:bg-white',
                  rowClassName?.(row)
                )}
                key={getRowKey(row, index)}
              >
                {columns.map((column) => (
                  <TableCell
                    className={cn(
                      'items-center justify-center overflow-clip p-2 text-start type-body-xs',
                      column.className
                    )}
                    key={column.key}
                  >
                    {column.cell(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className='hover:bg-white'>
              <TableCell
                className='h-28 p-2 text-center type-body-xs text-neutral-400'
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
