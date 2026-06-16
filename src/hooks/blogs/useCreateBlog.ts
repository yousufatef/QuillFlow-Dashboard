import { createBlogApi } from '@/services/blogs.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: createBlog, isPending } = useMutation({
    mutationKey: ['blog'],
    mutationFn: (data: any) => createBlogApi(data, false),
    onSuccess: (res: any) => {
      const message = res?.message || 'Create blog successfully';
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ['blogsList'] });
    },
  });
  return { createBlog, isLoading: isPending };
};
