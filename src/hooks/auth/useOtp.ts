import { useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';
import { verifyOtpApi } from '@/services/auth.service';

export function useOtp() {
  const navigate = useNavigate();

  const { mutateAsync: otp, isPending: isLoading } = useMutation({
    mutationFn: verifyOtpApi,
    onSuccess: (res: any) => {
      void navigate(`/reset-password?adminId=${res.result}`);
    },
  });

  return { otp, isLoading };
}
