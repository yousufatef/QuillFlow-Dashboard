import type { UpdateAdmin } from '@/pages/admins/types/admin.types';
import { updateAdminApi, ADMINS_LIST_QUERY_KEY } from '../services/admins.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const useUpdateAdmin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync: updateAdmin, isPending } = useMutation({
    mutationKey: ['updateAdmin'],
    mutationFn: ({ id, data }: { id: string; data: UpdateAdmin }) => updateAdminApi(id, data),
    onSuccess: (res: any) => {
      const message = res?.message || 'Admin updated successfully';
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: [ADMINS_LIST_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: ['admin'] });
      navigate(-1);
    },
    onError: (error: any) => {
      const message = error?.message || 'Failed to update admin';
      toast.error(message);
    },
  });

  return { updateAdmin, isLoading: isPending };
};
