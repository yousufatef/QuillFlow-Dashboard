import Cookies from 'js-cookie';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';

import { REFRESH_TOKEN, TOKEN, USER_VERIFIED } from '@/constants';
import type { LoginParams, LoginResponse } from '@/types/auth-types';
import { loginApi } from '@/services/auth.service';

function safeCallbackUrl(url: string | null) {
  if (!url) return null;
  if (url.startsWith('/') && !url.startsWith('//')) return url;
  return null;
}

export function useLogin() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const callbackUrl = safeCallbackUrl(searchParams.get('callbackUrl'));

  const cookieBase = {
    path: '/',
    sameSite: 'lax' as const,
    secure: import.meta.env.PROD,
  };

  const { mutateAsync: login, isPending: isLoading } = useMutation<
    LoginResponse,
    Error,
    LoginParams
  >({
    mutationFn: loginApi,
    onSuccess: (user) => {

      Cookies.set(TOKEN, user.accessToken, {
        ...cookieBase,
        expires: new Date(user.accessTokenExpiresAt),
      });

      Cookies.set(REFRESH_TOKEN, user.refreshToken, {
        ...cookieBase,
        expires: new Date(user.refreshTokenExpiresAt),
      });

      Cookies.set(USER_VERIFIED, String(user.isVerified), {
        ...cookieBase,
        expires: new Date(user.accessTokenExpiresAt),
      });

      const redirectTo = user.isVerified
        ? callbackUrl || '/'
        : '/change-password';
      void navigate(redirectTo, { replace: true });
    },
  });

  return { login, isLoading };
}
