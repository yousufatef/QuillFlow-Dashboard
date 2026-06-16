import { toggleBlogStatusApi } from '@/services/blogs.service';
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
  });
  return { toggleStatus, isLoading: isPending };
};
