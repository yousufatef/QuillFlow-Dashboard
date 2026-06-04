import { useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';

import { forgetPasswordApi } from '@/services/auth.service';
import { toast } from 'sonner';
export function useForgetPassword() {
  const navigate = useNavigate();

  const { mutateAsync: forgetPassword, isPending: isLoading } = useMutation({
    mutationFn: forgetPasswordApi,
    onSuccess: (response: any, variables) => {
      toast.success(response.message);
      void navigate(`/otp?email=${variables.email}`);
    },
  });

  return { forgetPassword, isLoading };
}
