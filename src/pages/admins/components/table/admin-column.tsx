import type { Admin } from '@/pages/admins/types/admin.types';
import ActionButton from '../Actions';
import UserInitials from '@/components/shared/customs/UserInitials';
import type { ColumnDef } from '@tanstack/react-table';
import { formatDate } from '@/utils/FormatDate';

export const getColumns = (
  t: (key: string) => string,
  direction: 'ltr' | 'rtl',
): ColumnDef<Admin>[] => [
    {
      accessorKey: 'admin',
      header: t('table.user'),
      cell: ({ row: { original: admin } }) => (
        <UserInitials name={admin.username} roleName={admin.userType} />
      ),
    },
    {
      accessorKey: 'email',
      header: t('table.email'),
      cell: ({ row: { original: admin } }) => (
        <p className='type-body-xs-semibold'>{admin.email}</p>
      ),
    },
    // {
    //   accessorKey: 'isAccountVerified',
    //   header: t('table.status'),
    //   cell: ({ row: { original: admin } }) => (
    //     <Badge
    //       className={`type-body-xs-semibold text-neutral-800 ${
    //         admin.isAccountVerified ? 'bg-green-100' : 'bg-gray-100'
    //       }`}
    //     >
    //       {admin.isAccountVerified ? t('common.verified') : t('common.unverified')}
    //     </Badge>
    //   ),
    // },
    {
      accessorKey: 'created_at',
      header: t('table.creationDate'),
      cell: ({ row: { original: admin } }) => (
        <p className='type-body-xs-semibold'>
          {formatDate(admin.created_at, direction === 'ltr')}
        </p>
      ),
    },
    {
      accessorKey: 'actions',
      header: t('table.more'),
      cell: ({ row: { original: admin } }) => (
        <ActionButton admin={admin} />
      ),
    },
  ];
