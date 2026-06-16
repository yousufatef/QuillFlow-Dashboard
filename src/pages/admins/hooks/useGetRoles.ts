import { useInfiniteQuery } from '@tanstack/react-query';
import { getAdminsRolesListApi } from '../services/admins.service';
import type { AdminRolesResponse } from '../types/admin.types';

export const useAdminsRolesList = () => {
  return useInfiniteQuery<AdminRolesResponse>({
    queryKey: ['adminRoles'],
    queryFn: ({ pageParam }) => getAdminsRolesListApi(pageParam as number, 10),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { pageNumber, pageSize, totalCount } = lastPage.data;
      const loaded = pageNumber * pageSize;
      return loaded < totalCount ? pageNumber + 1 : undefined;
    },
  });
};
