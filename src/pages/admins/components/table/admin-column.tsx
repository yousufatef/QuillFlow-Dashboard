import type { Admin } from '@/pages/admins/types/admin.types';
import ActionButton from '../Actions';
import UserInitials from '@/components/shared/customs/UserInitials';
import type { ColumnDef } from '@tanstack/react-table';
// import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/utils/FormatDate';
import ActiveSwitch from '../ActiveSwitch';
import { WithPermissions } from '@/components/shared/permissions/WithPermissions';

export const getColumns = (t: (key: string) => string, direction: 'ltr' | 'rtl'): ColumnDef<Admin>[] => [
  {
    accessorKey: 'admin',
    header: t('table.user'),
    cell: ({ row: { original: admin } }) => <UserInitials name={admin.fullName} roleName={direction === 'ltr' ? admin.roleNameEn : admin.roleNameAr} />,
  },
  {
    accessorKey: 'phoneNumber',
    header: t('table.phoneNumber'),
    cell: ({ row: { original: admin } }) => <p className='type-body-xs-semibold'>{admin.phoneNumber}</p>,
  },
  {
    accessorKey: 'email',
    header: t('table.email'),
    cell: ({ row: { original: admin } }) => <p className='type-body-xs-semibold'>{admin.email}</p>,
  },
  // {
  //   accessorKey: 'status',
  //   header: t('table.status'),
  //   cell: ({ row: { original: admin } }) => <Badge className={`type-body-xs-semibold text-neutral-800 ${admin.isActive ? 'bg-green-100' : 'bg-gray-100'}`}>{admin.isActive ? t('common.active') : t('common.inactive')}</Badge>,
  // },
  {
    accessorKey: 'status',
    header: t('table.status'),
    cell: ({ row: { original: admin } }) => <ActiveSwitch admin={admin} />,
  },

  {
    accessorKey: 'createdOn',
    header: t('table.creationDate'),
    cell: ({ row: { original: admin } }) => (
      <p className='type-body-xs-semibold'>
        {formatDate(admin.createdOn, direction === 'ltr')}
      </p>
    ),
  },
  {
    accessorKey: 'actions',
    header: t('table.more'),
    cell: ({ row: { original: admin } }) => <WithPermissions permissions={['admins.update', 'admins.delete']} require="some"> <ActionButton admin={admin} /></WithPermissions>,
  },
];
