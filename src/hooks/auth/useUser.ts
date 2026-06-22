import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useMemo } from 'react';

import { REFRESH_TOKEN, TOKEN } from '@/constants';
import { USER_DETAILS_QUERY_KEY } from '@/constants/auth/queryKeys';
import { getUserDetails } from '@/pages/auth/service/auth.service';
import type { UserApiResponse } from '@/pages/auth/types/auth.types';
import type { AppPermissions } from '@/types/permissions-types';

export function useUser() {
  const token = Cookies.get(TOKEN);
  const refreshToken = Cookies.get(REFRESH_TOKEN);

  const isAuthenticated = !!token || !!refreshToken;

  const { data, isLoading, isError } = useQuery<UserApiResponse, Error>({
    queryKey: [USER_DETAILS_QUERY_KEY],
    queryFn: getUserDetails,
    enabled: isAuthenticated,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const user = data?.data;

  const permissionSet: Set<AppPermissions> = useMemo(
    () => new Set(user?.permission || []),
    [user?.permission],
  );

  return {
    isError,
    isLoading,
    user,
    isVerified: user?.isVerified,
    isAuthenticated,
    permissionSet,
  };
}
