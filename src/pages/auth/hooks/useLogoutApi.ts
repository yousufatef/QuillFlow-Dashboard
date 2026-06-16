import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useMutation } from '@tanstack/react-query';

import { removeAuthCookies } from '@/utils/cookies';
import { logOutApi } from '@/pages/auth/service/auth.service';
// import { useTranslation } from 'react-i18next';

export function useLogoutApi() {
  const navigate = useNavigate();
  // const { t } = useTranslation();

  const { mutateAsync: logOut, isPending: isLoading } = useMutation({
    mutationFn: logOutApi,
    onSuccess: () => {
      removeAuthCookies();
      void navigate('/login', { replace: true });
    },
    onError: (error: Error) => {
      const errorMsg = error.message;
      toast.error(errorMsg);
    },
  });

  return { logOut, isLoading };
}
