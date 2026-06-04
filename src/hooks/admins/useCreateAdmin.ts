import { createAdminApi } from '../../services/admins.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from "sonner";

export const useCreateAdmin = () => {
    const queryClient = useQueryClient();
    const { mutateAsync: createAdmin, isPending } = useMutation({
        mutationKey: ["admin"],
        mutationFn: (data: any) => createAdminApi(data),
        onSuccess: (res: any) => {
            const message = res?.message || "Create admin successfully";
            toast.success(message);
            queryClient.invalidateQueries({queryKey: ["adminsList"],
            });
        },
        // onError: (error: any) => {
        //     toast.error(error?.message || "Create admin failed");
        // }
    });
    return { createAdmin, isLoading: isPending };
};