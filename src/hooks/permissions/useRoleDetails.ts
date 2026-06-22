import { getRoleDetails, ROLE_DETAILS_QUERY_KEY } from '@/services/roles.service';
import { useQuery } from '@tanstack/react-query';

export default function useRoleDetails(roleId: string) {
  const {
    data,
    isLoading: isLoadingRole,
    isFetched: isRoleFetched,
    error: roleError,
    refetch: refetchRole,
  } = useQuery({
    queryKey: [ROLE_DETAILS_QUERY_KEY, roleId],
    queryFn: () => getRoleDetails(roleId),
    enabled: !!roleId,
  });

  return { data, isLoadingRole, isRoleFetched, roleError, refetchRole };
}
