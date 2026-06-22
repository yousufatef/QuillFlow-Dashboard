import { CustomSearchBar, CustomTable } from '@/components/shared/customs';
import useTableSearchParam from '@/hooks/useTableSearchParam';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useMemo } from 'react';
import CustomSelectorFilter from '@/components/shared/customs/CustomFilter';
import { getColumns } from './admin-column';
import type { Admin } from '@/pages/admins/types/admin.types';
import { useTranslation } from 'react-i18next';
import { useDirection } from '@/i18n/useDirection';
import Pagination from '@/components/shared/customs/CustomPagination';
import { useAdminsList } from '../../hooks/useGetAdminsList';
import MainLoader from '@/components/shared/loader/MainLoader';
import ErrorPage from '@/pages/error/ErrorPage';

const AdminTable = () => {
  const { t } = useTranslation();
  const direction = useDirection();
  const columns = getColumns(t, direction);
  const { clearTableSearchParams, params } = useTableSearchParam();
  const hasFilters = !!params.sort;
  const { admins, isLoading, isFetching, error, totalCount } = useAdminsList();
  const filteredAdmins = useMemo(
    () =>
      admins?.map((admin: Admin, index: number) => ({
        ...admin,
        rowNumber: index + 1,
      })) || [],
    [admins],
  );

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
        <CustomSelectorFilter
          fildName='sort'
          placeholder={t('admin.filterPlaceholder')}
          label=''
          items={[
            { value: '0', label: 'Ascending', labelEn: 'Name (A-Z)', labelAr: 'الاسم (أ-ي)' },
            { value: '1', label: 'Descending', labelEn: 'Name (Z-A)', labelAr: 'الاسم (ي-أ)' },
          ]}
          wrapperClassName='min-h-12 rounded-sm cursor-pointer type-body-md shadow-[0px_4px_20px_0px_#0D3B2E12]'
          variant='gray'
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
        emptyMessage='No admins match your filters.'
        isFetching={isFetching}
      />

      <div className='flex flex-col items-center gap-3 py-4 md:flex-row md:justify-between '>
        <Pagination totalCount={totalCount} />
      </div>

    </div>
  );
};

export default AdminTable;
