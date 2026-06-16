import { useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';
import { otpApi } from '@/pages/auth/service/auth.service';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

export function useOtp() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mutateAsync: otp, isPending: isLoading } = useMutation({
    mutationFn: otpApi,
    onSuccess: (res: any) => {
      const token = res?.data?.resetToken || res?.resetToken || res?.token || res?.data?.token;
      if (token) {
        void navigate(`/new-password?token=${token}`);
        toast.success(res?.message);
      } else {
        toast.error(t('errors.unexpectedHint'));
      }
    },
    onError: (error: Error) => {
      const errorMessage = error.message || t('errors.unexpectedHint');
      toast.error(errorMessage);
    },
  });

  return { otp, isLoading };
}
