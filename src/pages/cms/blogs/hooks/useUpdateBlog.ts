import { updateBlogApi } from '@/pages/cms/blogs/service/blogs.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useUpdateBlog = (onSuccess?: () => void) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  const { mutateAsync: updateBlog, isPending } = useMutation({
    mutationKey: ['blog'],
    mutationFn: (data: any) => updateBlogApi(data),
    onSuccess: (res: any) => {
      onSuccess?.();
      navigate(-1);
      const message = res?.message || 'Update blog successfully';
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ['blogsList'] });
    },
    onError: (err: any) => {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        'Failed to update blog';
      toast.error(message);
    }
  });
  return { updateBlog, isLoading: isPending };
};
