import { createBlogApi } from '@/pages/cms/blogs/service/blogs.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useDraftBlog = (onSuccess?: () => void) => {
  const navigate = useNavigate()

  const queryClient = useQueryClient();
  const { mutateAsync: draftBlog, isPending } = useMutation({
    mutationKey: ['blog'],
    mutationFn: (data: any) => createBlogApi(data, false),
    onSuccess: (res: any) => {
      onSuccess?.();
      navigate(-1);
      const message = res?.message || 'Save blog as draft successfully';
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ['blogsList'] });
    },
    // onError: (err: any) => {
    //   const message =
    //     err?.response?.data?.message ||
    //     err?.message ||
    //     'Failed to save as draft';
    //   toast.error(message);
    // }
  });
  return { draftBlog, isLoading: isPending };
};
