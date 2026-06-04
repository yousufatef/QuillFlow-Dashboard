import { updateAdminApi } from '../../services/admins.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "sonner";
export const useUpdateAdmin = () => {
    const queryClient = useQueryClient();
    const { mutateAsync: updateAdmin, isPending } = useMutation({
        mutationKey: ["suspendAccount"],
        mutationFn: (id:string, data:any) => updateAdminApi(id, data),
        onSuccess: (res: any) => {
            const message = res?.message || "Update admin successfully";
            toast.success(message);
            queryClient.invalidateQueries({queryKey: ["adminsList"],
            });
            queryClient.invalidateQueries({queryKey: ["admin"],
            });
        },
        // onError: (error: any) => {
        //     toast.error(error?.message || "Update admin failed");
        // }
    });
    return { updateAdmin, isLoading: isPending };
}