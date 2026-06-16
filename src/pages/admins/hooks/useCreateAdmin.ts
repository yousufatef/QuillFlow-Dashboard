import type { NewAdmin } from '@/pages/admins/types/admin.types';
import { createAdminApi } from '../services/admins.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const useCreateAdmin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutateAsync: createAdmin, isPending } = useMutation({
    mutationKey: ['admin'],
    mutationFn: (data: NewAdmin) => createAdminApi(data),
    onSuccess: (res: any) => {
      const message = res?.message || 'Create admin successfully';
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ['adminsList'] });
      navigate(-1);
    },
    // onError: (error: any) => {
    //     toast.error(error?.message || "Create admin failed");
    // }
  });
  return { createAdmin, isLoading: isPending };
};
