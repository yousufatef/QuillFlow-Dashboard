import { deleteBlogApi } from '@/pages/cms/blogs/service/blogs.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteBlog, isPending } = useMutation({
    mutationKey: ['blog'],
    mutationFn: (id: string) => deleteBlogApi(id),
    onSuccess: (res: any) => {
      const message = res?.message || 'Delete blog successfully';
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ['blogsList'] });
      queryClient.invalidateQueries({ queryKey: ['blog'] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Delete blog failed");
    }
  });
  return { deleteBlog, isLoading: isPending };
};
