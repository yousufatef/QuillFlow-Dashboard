import { useQuery } from '@tanstack/react-query';
import { getAdminRolesPermissionsListApi } from '../services/admins.service';

export const useGetAdminRolesPermissions = () => {
  const { data, isLoading, error } = useQuery<any>({
    queryKey: ['adminRoles'],
    queryFn: () => getAdminRolesPermissionsListApi(),
  });

  return { adminData: data?.data, isLoading, error };
};

