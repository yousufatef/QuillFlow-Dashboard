import { getAdminsListApi, ADMINS_LIST_QUERY_KEY } from '../services/admins.service';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { Admin } from '../types/admin.types';

type AdminListResponse = {
  admins: Admin[];
  isLoading: boolean;
  isFetching?: boolean;
  error: unknown;
  isPlaceholderData: boolean;
  totalCount: number;
};

export const useAdminsList = (): AdminListResponse => {
  const { data, isLoading, isFetching, isPlaceholderData, error } = useQuery({
    queryKey: [ADMINS_LIST_QUERY_KEY],
    queryFn: () => getAdminsListApi(),
    placeholderData: keepPreviousData,
  });

  return {
    admins: data?.result ?? [],
    isLoading,
    isFetching,
    error,
    isPlaceholderData,
    totalCount: data?.result?.length ?? 0,
  };
};