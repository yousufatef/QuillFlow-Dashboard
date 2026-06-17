import { getBlogApi } from '@/pages/cms/blogs/service/blogs.service';
import { useQuery } from '@tanstack/react-query';



export const useGetBlog = (blogId?: string) => {
    return useQuery({
        queryKey: ['blog', blogId],
        queryFn: () => getBlogApi(blogId!),
        enabled: !!blogId,
    });
};