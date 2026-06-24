import type { NewAdmin } from '@/pages/admins/types/admin.types';
import { createAdminApi, ADMINS_LIST_QUERY_KEY } from '../services/admins.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const useCreateAdmin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync: createAdmin, isPending } = useMutation({
    mutationKey: ['createAdmin'],
    mutationFn: (data: NewAdmin) => createAdminApi(data),
    onSuccess: (res: any) => {
      const message = res?.message || 'Admin created successfully';
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: [ADMINS_LIST_QUERY_KEY] });
      navigate(-1);
    },
    onError: (error: any) => {
      const message = error?.message || 'Failed to create admin';
      toast.error(message);
    },
  });

  return { createAdmin, isLoading: isPending };
};
