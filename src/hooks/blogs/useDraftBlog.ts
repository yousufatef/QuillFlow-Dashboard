import { createBlogApi } from '@/services/blogs.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useDraftBlog = () => {
  const navigate = useNavigate()

  const queryClient = useQueryClient();
  const { mutateAsync: draftBlog, isPending } = useMutation({
    mutationKey: ['blog'],
    mutationFn: (data: any) => createBlogApi(data, false),
    onSuccess: (res: any) => {
      navigate(-1)
      const message = res?.message || 'Save blog as draft successfully';
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ['blogsList'] });
    },
  });
  return { draftBlog, isLoading: isPending };
};
