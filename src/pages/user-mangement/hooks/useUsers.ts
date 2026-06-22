import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useTableSearchParam } from '../../../hooks/useTableSearchParam';
import { getUsersListApi } from '../services/user.service';
import type { UsersListResponse } from '../types/user.types';

export const useUsers = () => {
  const { pageNumber, pageSize, searchTerm, params } = useTableSearchParam();
  const sort = Number(params.sort ?? 0);

  const { data, isLoading, isFetching, isPlaceholderData, error } = useQuery<UsersListResponse>({
    queryKey: ['user', pageNumber, pageSize, searchTerm, sort],
    queryFn: () => getUsersListApi(pageNumber, pageSize, searchTerm, sort),
    placeholderData: keepPreviousData,
  });

  return {
    users: data?.data?.result,
    isLoading,
    isFetching,
    error,
    isPlaceholderData,
    totalCount: data?.data?.totalCount ?? 0,
  };
};
