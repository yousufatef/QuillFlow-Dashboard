import { cn } from '@/lib/utils';

const isEmptyValue = (value: unknown): boolean =>
  value === null || value === undefined || (typeof value === 'string' && value.trim() === '');

type TableCellValueProps = {
  value?: string | number | null;
  className?: string;
  emptyLabel?: string;
};

const TableCellValue = ({
  value,
  className = 'type-body-xs-semibold',
  emptyLabel = '-',
}: TableCellValueProps) => {
  if (isEmptyValue(value)) {
    return <p className={cn('type-body-xs-semibold text-neutral-300', className)}>{emptyLabel}</p>;
  }

  return <p className={className}>{value}</p>;
};

export default TableCellValue;
