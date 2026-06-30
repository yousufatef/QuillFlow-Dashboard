import { CustomSearchBar, CustomTable } from '@/components/shared/customs';
import type { Role } from '@/types/permissions-types';
import type { ColumnDef } from '@tanstack/react-table';
import RoleActions from '../components/RoleActions';
import { useTranslation } from 'react-i18next';
import useRoles from '@/hooks/permissions/useRoles';
import MainLoader from '@/components/shared/loader/MainLoader';
import LoadingError from '@/components/shared/error/LoadingError';
import Pagination from '@/components/shared/customs/CustomPagination';
import { Badge } from '@/components/ui/badge';

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
      id: 'isActive',
      accessorKey: 'isActive',
      header: t('roles.table.isActive'),
      cell: ({ row: { original: role } }) => <Badge color={role.isActive ? 'green' : 'red'}>{role.isActive ? t('roles.actions.active') : t('roles.actions.inactive')}</Badge>,
    },
    {
      id: 'more',
      header: t('table.more'),
      cell: ({ row }) => (
        <RoleActions role={row.original} />
      ),
    },
  ];

  const { isLoading, isError, error, data, refetch, isFetching } = useRoles();

  if (isLoading) return <MainLoader />;

  if (isError)
    return (
      <LoadingError
        errorMsg={error.message}
        onRefetch={refetch}
      />
    );

  const rolesList = data?.result || [];

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

      <Pagination totalCount={10} />
    </div>
  );
};

export default RolesTable;
