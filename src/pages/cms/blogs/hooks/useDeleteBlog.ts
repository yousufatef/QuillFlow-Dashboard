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
    // onError: (err: any) => {
    //   const message =
    //     err?.response?.data?.message ||
    //     err?.message ||
    //     'Failed to delete blog';
    //   toast.error(message);
    // }
  });
  return { deleteBlog, isLoading: isPending };
};
