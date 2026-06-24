import { useQuery } from '@tanstack/react-query';
import { getAdminRolesPermissionsListApi } from '../services/admins.service';

export const useGetAdminRoles = () => {
  const { data, isLoading, error } = useQuery<any>({
    queryKey: ['allRoles'],
    queryFn: () => getAdminRolesPermissionsListApi(),
  });

  return { allRoles: data?.result ?? data?.data, isLoading, error };
};

