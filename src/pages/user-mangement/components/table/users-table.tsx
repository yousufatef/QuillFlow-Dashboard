import { CustomSearchBar, CustomTable } from '@/components/shared/customs';
import { useMemo } from 'react';
import CustomSelectorFilter from '@/components/shared/customs/CustomFilter';
import { getColumns } from './user-column';
import type { User, UserTableRow } from '../../types/user.types';
import { useTranslation } from 'react-i18next';
import Pagination from '@/components/shared/customs/CustomPagination';
import { useUsers } from '../../hooks/useUsers';
import MainLoader from '@/components/shared/loader/MainLoader';
import ErrorPage from '@/pages/error/ErrorPage';

const UsersTable = () => {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language.startsWith('en');
  const columns = getColumns(t, isEnglish);
  const { users, isLoading, isFetching, error, totalCount } = useUsers();

  const tableRows = useMemo<UserTableRow[]>(
    () =>
      users?.map((user: User, index: number) => ({
        ...user,
        rowNumber: index + 1,
      })) ?? [],
    [users],
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
          placeholder={t('users.searchPlaceholder')}
          searchParamName='searchTerm'
          wrapperClassName='md:max-w-sm shadow-[0px_4px_20px_0px_#0D3B2E12]'
        />
        <CustomSelectorFilter
          fildName='sort'
          placeholder={t('users.filterPlaceholder')}
          label=''
          items={[
            { value: '0', label: 'Ascending', labelEn: 'Name (A-Z)', labelAr: 'الاسم (أ-ي)' },
            { value: '1', label: 'Descending', labelEn: 'Name (Z-A)', labelAr: 'الاسم (ي-أ)' },
          ]}
          wrapperClassName='min-h-12 rounded-sm cursor-pointer type-body-md shadow-[0px_4px_20px_0px_#0D3B2E12]'
          variant='gray'
        />

      </div>

      <CustomTable
        columns={columns}
        data={tableRows}
        emptyMessage={t('users.emptyMessage')}
        isFetching={isFetching}
      />

      <div className='flex flex-col items-center gap-3 py-4 md:flex-row md:justify-between '>
        <Pagination totalCount={totalCount} />
      </div>
    </div>
  );
};

export default UsersTable;
