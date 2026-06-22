import Cookies from 'js-cookie';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';

import { REFRESH_TOKEN, TOKEN, USER_VERIFIED } from '@/constants';
import type { LoginParams, LoginResponse } from '@/pages/auth/types/auth.types';
import { loginApi } from '@/pages/auth/service/auth.service';
import { toast } from 'sonner';

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
      const payload: any = user ?? {};
      const data = payload.data ?? payload;
      const isVerified = data.isVerified ?? payload.isVerified;

      if (data.accessToken) {
        Cookies.set(TOKEN, data.accessToken, {
          ...cookieBase,
          expires: data.accessTokenExpiresAt ? new Date(data.accessTokenExpiresAt) : undefined,
        });
      }

      if (data.refreshToken) {
        Cookies.set(REFRESH_TOKEN, data.refreshToken, {
          ...cookieBase,
          expires: data.refreshTokenExpiresAt ? new Date(data.refreshTokenExpiresAt) : undefined,
        });
      }

      Cookies.set(USER_VERIFIED, String(Boolean(isVerified)), {
        ...cookieBase,
        expires: data.accessTokenExpiresAt ? new Date(data.accessTokenExpiresAt) : undefined,
      });

      const redirectTo = callbackUrl || '/';
      void navigate(redirectTo, { replace: true });
    },
    onError: (error: Error) => {
      const errorMessage = error.message;
      toast.error(errorMessage);
    },
  });

  return { login, isLoading };
}
