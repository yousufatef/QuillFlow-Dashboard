import { deleteRoleApi, ROLES_LIST_QUERY_KEY } from '@/services/roles.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
export const useDeleteRole = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ['role'],
    mutationFn: (id: string) => deleteRoleApi(id),
    onSuccess: (res: any) => {
      const message = res?.message || 'Role deleted successfully';
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: [ROLES_LIST_QUERY_KEY] });
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to delete role');
    },
  });
  return mutation;
};
