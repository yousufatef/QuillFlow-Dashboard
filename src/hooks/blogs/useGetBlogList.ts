// useGetBlogList.ts
import { keepPreviousData } from '@tanstack/react-query';
import { getBlogsListApi } from '@/pages/cms/blogs/service/blogs.service';
import useTableSearchParam from '../useTableSearchParam';
import useLanguageQuery from '../useLanguageQuery';

const BLOGS_LIST_QUERY_KEY = 'blogsList';



export const useGetBlogList = () => {
  const { pageNumber, pageSize, searchTerm, status } = useTableSearchParam();

  const query = useLanguageQuery({
    queryKey: [BLOGS_LIST_QUERY_KEY, pageNumber, pageSize, searchTerm, status],
    queryFn: () =>
      getBlogsListApi(

        searchTerm),
    placeholderData: keepPreviousData,
  });

  return query
};