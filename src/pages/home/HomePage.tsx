import { useMemo } from 'react';
import { MoreHorizontal, Plus, XIcon } from 'lucide-react';
import type { DateRange } from 'react-day-picker';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  CustomDateRangeFilter,
  CustomSearchBar,
  CustomTable,
  type CustomTableColumn,
} from '@/components/shared/customs';
import useTableSearchParam from '@/hooks/useTableSearchParam';

type Customer = {
  id: string;
  name: string;
  email: string;
  plan: string;
  status: 'Active' | 'Pending' | 'Suspended';
  amount: string;
  lastSeen: string;
  lastSeenDate: string;
};

const customers: Customer[] = [
  {
    id: 'CUS-1001',
    name: 'Ahmed Mohamed',
    email: 'ahmed@example.com',
    plan: 'Enterprise',
    status: 'Active',
    amount: '$2,400',
    lastSeen: 'Today',
    lastSeenDate: '2026-05-21',
  },
  {
    id: 'CUS-1002',
    name: 'Sara Hassan',
    email: 'sara@example.com',
    plan: 'Business',
    status: 'Pending',
    amount: '$960',
    lastSeen: 'Yesterday',
    lastSeenDate: '2026-05-20',
  },
  {
    id: 'CUS-1003',
    name: 'Omar Ali',
    email: 'omar@example.com',
    plan: 'Starter',
    status: 'Suspended',
    amount: '$180',
    lastSeen: 'May 18',
    lastSeenDate: '2026-05-18',
  },
  {
    id: 'CUS-1004',
    name: 'Mona Adel',
    email: 'mona@example.com',
    plan: 'Business',
    status: 'Active',
    amount: '$1,280',
    lastSeen: 'May 17',
    lastSeenDate: '2026-05-17',
  },
];

const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const endOfDay = (date: Date) =>
  new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59,
    999,
  );

const getFirstParamValue = (value: string | string[] | undefined) => {
  if (Array.isArray(value)) return value[0] ?? '';

  return value ?? '';
};

const parseDateParam = (value: string) => {
  if (!value) return undefined;

  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return undefined;

  return new Date(year, month - 1, day);
};

const formatDateParam = (date: Date | undefined) => {
  if (!date) return undefined;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const matchesSearch = (customer: Customer, query: string) => {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;

  return [
    customer.id,
    customer.name,
    customer.email,
    customer.plan,
    customer.status,
    customer.amount,
    customer.lastSeen,
  ].some((value) => value.toLowerCase().includes(normalizedQuery));
};

const matchesDateRange = (customer: Customer, range: DateRange | undefined) => {
  if (!range?.from && !range?.to) return true;

  const customerDate = startOfDay(new Date(customer.lastSeenDate));
  const fromDate = range?.from ? startOfDay(range.from) : undefined;
  const toDate = range?.to ? endOfDay(range.to) : undefined;

  if (fromDate && customerDate < fromDate) return false;
  if (toDate && customerDate > toDate) return false;

  return true;
};

const statusVariant: Record<
  Customer['status'],
  'default' | 'secondary' | 'destructive'
> = {
  Active: 'default',
  Pending: 'secondary',
  Suspended: 'destructive',
};

const columns: CustomTableColumn<Customer>[] = [
  {
    key: 'customer',
    header: 'Customer',
    cell: (customer) => (
      <div className='grid gap-0.5'>
        <span className='font-medium'>{customer.name}</span>
        <span className='text-xs text-muted-foreground'>{customer.email}</span>
      </div>
    ),
  },
  {
    key: 'plan',
    header: 'Plan',
    cell: (customer) => customer.plan,
  },
  {
    key: 'status',
    header: 'Status',
    cell: (customer) => (
      <Badge variant={statusVariant[customer.status]}>{customer.status}</Badge>
    ),
  },
  {
    key: 'amount',
    header: 'Amount',
    cell: (customer) => customer.amount,
    className: 'font-medium',
  },
  {
    key: 'lastSeen',
    header: 'Last seen',
    cell: (customer) => customer.lastSeen,
  },
  {
    key: 'actions',
    header: '',
    headerClassName: 'w-12 text-right',
    className: 'w-12 text-right',
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-label='Open row actions' size='icon-sm' variant='ghost'>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-36'>
          <DropdownMenuItem>View</DropdownMenuItem>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem variant='destructive'>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

function HomePage() {
  // throw new Error('Test Runtime Exception');
  const { clearTableSearchParams, params, setTableSearchParams } =
    useTableSearchParam();
  const searchQuery = getFirstParamValue(params.search);
  const dateRange = useMemo<DateRange | undefined>(() => {
    const from = parseDateParam(getFirstParamValue(params.fromDate));
    const to = parseDateParam(getFirstParamValue(params.toDate));

    if (!from && !to) return undefined;

    return { from, to };
  }, [params.fromDate, params.toDate]);

  const filteredCustomers = useMemo(
    () =>
      customers.filter(
        (customer) =>
          matchesSearch(customer, searchQuery) &&
          matchesDateRange(customer, dateRange),
      ),
    [dateRange, searchQuery],
  );

  const hasActiveFilters = Boolean(searchQuery.trim() || dateRange?.from);

  const clearFilters = () => {
    clearTableSearchParams(['search', 'fromDate', 'toDate']);
  };

  const updateDateRange = (nextRange: DateRange | undefined) => {
    setTableSearchParams({
      fromDate: formatDateParam(nextRange?.from),
      toDate: formatDateParam(nextRange?.to),
    });
  };

  return (
    <section className='flex w-full flex-col gap-6'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='type-heading-sm'>Customers</h1>
          <p className='text-sm text-muted-foreground'>
            Review customer plans, status, and account activity.
          </p>
        </div>
        <Button className='w-fit'>
          <Plus />
          Add customer
        </Button>
      </div>

      <div className='flex flex-col gap-3 rounded-lg border bg-card p-3 shadow-xs md:flex-row md:items-center md:justify-between'>
        <CustomSearchBar
          debounceMs={0}
          onValueChange={(value) => setTableSearchParams({ search: value })}
          placeholder='Search customers...'
          searchParamName='search'
          value={searchQuery}
          wrapperClassName='md:max-w-sm'
        />

        <div className='flex flex-col gap-2 sm:flex-row sm:items-center'>
          <CustomDateRangeFilter
            fromParamName='fromDate'
            onValueChange={updateDateRange}
            toParamName='toDate'
            value={dateRange}
          />

          {hasActiveFilters ? (
            <Button onClick={clearFilters} type='button' variant='ghost'>
              <XIcon />
              Clear
            </Button>
          ) : null}
        </div>
      </div>

      <CustomTable
        columns={columns}
        data={filteredCustomers}
        emptyMessage='No customers match your filters.'
        getRowKey={(customer) => customer.id}
      />
    </section>
  );
}

export default HomePage;
