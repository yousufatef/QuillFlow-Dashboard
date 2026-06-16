import { useUser } from '@/hooks/auth/useUser';
import type { AppPermissions } from '@/types/permissions-types';

export function usePermissions() {
  const { permissionSet, isLoading, isError } = useUser();

  return {
    isError,
    isLoading,
    hasPermission: (p: AppPermissions) => permissionSet.has(p),
    hasAllPermissions: (p: AppPermissions[]) => p.every((p) => permissionSet.has(p)),
    hasSomePermissions: (p: AppPermissions[]) => p.some((p) => permissionSet.has(p)),
  };
}
