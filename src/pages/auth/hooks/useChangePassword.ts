import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useMutation } from '@tanstack/react-query';

import { removeAuthCookies } from '@/utils/cookies';
import { changePasswordApi } from '@/pages/auth/service/auth.service';
import { useTranslation } from 'react-i18next';

export function useChangePassword() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { mutateAsync: changePassword, isPending: isLoading } = useMutation({
    mutationFn: changePasswordApi,
    onSuccess: () => {
      toast.success(t('passwordChangeSuccess'));

      removeAuthCookies();
      void navigate('/login', { replace: true });
    },
    onError: (error: Error) => {
      const errorMsg = error.message;
      toast.error(errorMsg);
    },
  });

  return { changePassword, isLoading };
}
