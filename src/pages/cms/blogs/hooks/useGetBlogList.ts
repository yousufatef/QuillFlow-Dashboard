// useGetBlogList.ts
import { keepPreviousData } from '@tanstack/react-query';
import { getBlogsListApi } from '@/pages/cms/blogs/service/blogs.service';
import useTableSearchParam from '../../../../hooks/useTableSearchParam';
import useLanguageQuery from '../../../../hooks/useLanguageQuery';

const BLOGS_LIST_QUERY_KEY = 'blogsList';



export const useGetBlogList = () => {
  const { searchTerm } = useTableSearchParam();

  const query = useLanguageQuery({
    queryKey: [BLOGS_LIST_QUERY_KEY, searchTerm],
    queryFn: () => getBlogsListApi(searchTerm),
    placeholderData: keepPreviousData,
  });

  return query
};