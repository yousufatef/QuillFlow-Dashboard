import { CustomSearchBar, CustomTable } from '@/components/shared/customs';
import useTableSearchParam from '@/hooks/useTableSearchParam';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useMemo } from 'react';
import { getColumns } from './admin-column';
import type { Admin } from '@/pages/admins/types/admin.types';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/i18n/useDirection';
import { useAdminsList } from '../../hooks/useGetAdminsList';
import MainLoader from '@/components/shared/loader/MainLoader';
import ErrorPage from '@/pages/error/ErrorPage';

const AdminTable = () => {
  const { t } = useTranslation();
  const direction = useDirection();
  const columns = getColumns(t, direction);
  const { clearTableSearchParams, params, searchTerm } = useTableSearchParam();
  const hasFilters = !!params.searchTerm || !!params.sort;

  const { admins, isLoading, isFetching, error } = useAdminsList();

  // Client-side search filter against the flat list from the API
  const filteredAdmins = useMemo(() => {
    const search = (typeof searchTerm === 'string' ? searchTerm : '').toLowerCase();
    const list = admins ?? [];
    const searched = search
      ? list.filter(
          (admin: Admin) =>
            admin.username?.toLowerCase().includes(search) ||
            admin.email?.toLowerCase().includes(search),
        )
      : list;

    return searched.map((admin: Admin, index: number) => ({
      ...admin,
      rowNumber: index + 1,
    }));
  }, [admins, searchTerm]);

  if (isLoading) {
    return <MainLoader />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <div>
      <div className='flex flex-col justify-start gap-3 py-4 shadow-xs md:flex-row md:items-center'>
        <CustomSearchBar
          placeholder={t('admin.searchPlaceholder')}
          searchParamName='searchTerm'
          wrapperClassName='md:max-w-sm shadow-[0px_4px_20px_0px_#0D3B2E12]'
        />
        {hasFilters && (
          <Button
            type='button'
            variant='outline'
            size='sm'
            className='min-h-12 shrink-0'
            onClick={() => clearTableSearchParams()}
          >
            <X />
            {t('admin.buttons.clear')}
          </Button>
        )}
      </div>

      <CustomTable
        columns={columns}
        data={filteredAdmins}
        emptyMessage={t('admin.noAdmins') ?? 'No admins found.'}
        isFetching={isFetching}
      />
    </div>
  );
};

export default AdminTable;
