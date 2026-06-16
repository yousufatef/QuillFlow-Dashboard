import { CustomSearchBar, CustomTable } from '@/components/shared/customs';
import type { Role } from '@/types/permissions-types';
import type { ColumnDef } from '@tanstack/react-table';
import UserInitials from '@/components/shared/customs/UserInitials';
import RoleActions from '../components/RoleActions';
import { useTranslation } from 'react-i18next';
import useRoles from '@/hooks/permissions/useRoles';
import MainLoader from '@/components/shared/loader/MainLoader';
import LoadingError from '@/components/shared/error/LoadingError';
import Pagination from '@/components/shared/customs/CustomPagination';

const RolesTable = () => {
  const { t } = useTranslation();
  const isEnglish = useTranslation().i18n.language.startsWith('en');

  const columns: ColumnDef<Role>[] = [
    {
      id: 'roleName',
      accessorKey: isEnglish ? 'nameEn' : 'nameAr',
      header: t('roles.table.roleName'),
    },
    {
      id: 'users',
      accessorKey: 'assignedUsersCount',
      header: t('roles.table.users'),
    },
    {
      id: 'permissionsNumber',
      accessorKey: 'permissionsCount',
      header: t('roles.table.permissionsNumber'),
    },
    {
      id: 'createdBy',
      accessorKey: 'createdByAdmin',
      header: t('roles.table.createdBy'),
      cell: ({ row: { original: role } }) => <UserInitials name={role.createdBy} />,
    },
    {
      id: 'more',
      header: t('table.more'),
      cell: ({ row }) => <RoleActions roleId={row.original.id} />,
    },
  ];

  const { isLoading, isError, data, refetch, isFetching } = useRoles();

  if (isLoading) return <MainLoader />;

  if (isError) return <LoadingError onRefetch={refetch} />;

  const rolesList = data?.data.result || [];
  const totlaCount = data?.data.totalCount || 0;

  return (
    <div className='mt-6 flex flex-col gap-6'>
      <div className='flex flex-col justify-start gap-3 md:flex-row md:items-center'>
        <CustomSearchBar
          placeholder={t('roles.table.searchPlaceholder')}
          searchParamName='searchTerm'
          wrapperClassName='md:max-w-sm shadow-[0px_4px_20px_0px_#0D3B2E12]'
        />
      </div>

      <div className='relative'>
        <CustomTable
          columns={columns}
          data={rolesList}
          emptyMessage={t('roles.table.emptyMessage')}
          isFetching={isFetching}
        />
      </div>

      <Pagination totalCount={totlaCount} />
    </div>
  );
};

export default RolesTable;
