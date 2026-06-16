import { getBlogApi } from '@/services/blogs.service';
import { useQuery } from '@tanstack/react-query';



export const useGetBlog = (blogId?: string) => {
    return useQuery({
        queryKey: ['blog', blogId],
        queryFn: () => getBlogApi(blogId!),
        enabled: !!blogId,
    });
};