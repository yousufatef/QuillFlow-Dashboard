import { toast } from 'sonner';

import { useMutation } from '@tanstack/react-query';
import { resendOtpApi } from '@/services/auth.service';

export function useResendOtp() {
  const { mutateAsync: resend, isPending: isLoading } = useMutation({
    mutationFn: resendOtpApi,
    onSuccess: (response: any) => {
      toast.success(response.message);
    },
  });

  return { resend, isLoading };
}
