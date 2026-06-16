import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useMutation } from '@tanstack/react-query';

import { removeAuthCookies } from '@/utils/cookies';

export function useLogout() {
  const navigate = useNavigate();

  const { mutateAsync: logOut, isPending: isLoading } = useMutation({
    mutationFn: async () => {
      removeAuthCookies();
    },
    onSuccess: () => {
      void navigate('/login', { replace: true });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return { logOut, isLoading };
}