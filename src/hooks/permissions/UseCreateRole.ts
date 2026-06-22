import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { addRoleApi, ROLES_LIST_QUERY_KEY } from '@/services/roles.service';
import type { ApiResponse } from '@/types/index.t';
import type { Role } from '@/types/permissions-types';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

export default function UseCreateRole() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutateAsync: addRole, isPending: isAddingRole } = useMutation({
    mutationFn: addRoleApi,
    onSuccess: (res: ApiResponse<Role>) => {
      queryClient.invalidateQueries({ queryKey: [ROLES_LIST_QUERY_KEY] });
      toast.success(res.message);
      navigate('/settings/roles');
    },
    onError: (err) => toast.error(err.message),
  });

  return { addRole, isAddingRole };
}
