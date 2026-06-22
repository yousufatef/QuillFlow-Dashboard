import { toggleBlogStatusApi } from '@/pages/cms/blogs/service/blogs.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useToggleBlogStatus = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: toggleStatus, isPending } = useMutation({
    mutationKey: ['blog'],
    mutationFn: (id: string) => toggleBlogStatusApi(id),
    onSuccess: (res: any) => {
      const message = res?.message || 'Blog status changed successfully';
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ['blogsList'] });
      queryClient.invalidateQueries({ queryKey: ['blog'] });
    },
    // onError: (err: any) => {
    //   const message =
    //     err?.response?.data?.message ||
    //     err?.message ||
    //     'Failed to change blog status';
    //   toast.error(message);
    // }
  });
  return { toggleStatus, isLoading: isPending };
};