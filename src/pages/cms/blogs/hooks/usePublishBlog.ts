import { createBlogApi } from '@/pages/cms/blogs/service/blogs.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const usePublishBlog = (onSuccess?: () => void) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutateAsync: publishBlog, isPending } = useMutation({
    mutationKey: ['blog'],
    mutationFn: (data: any) => createBlogApi(data, true),
    onSuccess: (res: any) => {
      onSuccess?.();
      navigate(-1);
      queryClient.invalidateQueries({ queryKey: ['blogsList'] });
      setTimeout(() => {
        toast.success(res?.message || 'Published successfully');
      }, 100);
    },
    // onError: (err: any) => {
    //   const message =
    //     err?.response?.data?.message ||
    //     err?.message ||
    //     'Failed to publish blog';
    //   toast.error(message);
    // }
  });

  return { publishBlog, isLoading: isPending };
};
