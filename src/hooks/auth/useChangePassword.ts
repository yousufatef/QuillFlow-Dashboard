import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useMutation } from '@tanstack/react-query';

import { removeAuthCookies } from '@/utils/cookies';
import { changePasswordApi } from '@/services/auth.service';

//import useTranslations from '@/i18n/useTranslations';

export function useChangePassword() {
  const navigate = useNavigate();
  // const { t } = useTranslations('forms.toasts');

  const { mutateAsync: changePassword, isPending: isLoading } = useMutation({
    mutationFn: changePasswordApi,
    onSuccess: () => {
      toast.success(
        'Your password has been reset successfully. Please log in again.',
      );

      removeAuthCookies();
      void navigate('/signin', { replace: true });
    },
  });

  return { changePassword, isLoading };
}
