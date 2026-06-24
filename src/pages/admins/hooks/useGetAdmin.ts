import { getAdminApi } from '../services/admins.service';
import { useQuery } from '@tanstack/react-query';
import type { Admin } from '../types/admin.types';

export const useAdmin = (id: string, enabled = true) => {
  const { data, isLoading, error } = useQuery<any>({
    queryKey: ['admin', id],
    queryFn: () => getAdminApi(id),
    enabled: enabled && !!id,
  });

  // Support both response shapes: { result: Admin } or { data: Admin }
  const adminData: Admin | undefined = data?.result ?? data?.data;

  return { adminData, isLoading, error };
};
