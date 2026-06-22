import { useQuery } from '@tanstack/react-query';
import { getAllPermissions, PERMISSIONS_QUERY_KEY } from '@/services/roles.service';

export default function useGetPermissions(roleId?: string) {
  const {
    data: permissionsRes,
    isLoading: isLoadingPermissions,
    isFetched: isPermissionsFetched,
    error: permissionError,
    refetch: refetchPermissions,
  } = useQuery({
    queryKey: [PERMISSIONS_QUERY_KEY],
    queryFn: () => getAllPermissions(),
    enabled: !roleId,
  });

  return {
    permissionsRes,
    isLoadingPermissions,
    isPermissionsFetched,
    permissionError,
    refetchPermissions,
  };
}
