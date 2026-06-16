import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import type { ResetAdminPasswordParams } from '../types/auth.types';
import { resetAdminPasswordApi } from '../service/auth.service';
// import { useTranslation } from 'react-i18next';

export function useResetAdminPassword() {
  const navigate = useNavigate();
  // const { t } = useTranslation();

  const { mutateAsync: resetAdminPassword, isPending: isLoading } = useMutation<
    unknown,
    Error,
    ResetAdminPasswordParams
  >({
    mutationFn: resetAdminPasswordApi,
    onSuccess: (res: any) => {
      toast.success(res?.message);
      void navigate('/login', { replace: true });
    },
    onError: (error: Error) => {
      const errorMessage = error.message;
      toast.error(errorMessage);
    },
  });

  return { resetAdminPassword, isLoading };
}
