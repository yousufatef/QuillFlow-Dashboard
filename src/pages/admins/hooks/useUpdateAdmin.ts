import type { NewAdmin } from '@/pages/admins/types/admin.types';
import { updateAdminApi } from '../services/admins.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
export const useUpdateAdmin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutateAsync: updateAdmin, isPending } = useMutation({
    mutationKey: ['suspendAccount'],
    mutationFn: ({ id, data }: { id: string; data: NewAdmin }) => updateAdminApi(id, data),
    onSuccess: (res: any) => {
      const message = res?.message || 'Update admin successfully';
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ['adminsList'] });
      queryClient.invalidateQueries({ queryKey: ['admin'] });
      navigate(-1);
    },
    // onError: (error: any) => {
    //     toast.error(error?.message || "Update admin failed");
    // }
  });
  return { updateAdmin, isLoading: isPending };
};
