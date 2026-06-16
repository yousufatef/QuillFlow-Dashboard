import { getRoles, ROLES_LIST_QUERY_KEY } from '@/services/roles.service';
import useTableSearchParam from '../useTableSearchParam';
import useLanguageQuery from '../useLanguageQuery';
import { keepPreviousData } from '@tanstack/react-query';

export default function useRoles() {
  const { pageNumber, pageSize, sortBy, sortOrder, searchTerm } = useTableSearchParam();

  const query = useLanguageQuery({
    queryKey: [ROLES_LIST_QUERY_KEY, pageNumber, pageSize, searchTerm, sortBy, sortOrder],
    queryFn: () =>
      getRoles({
        pageNumber,
        pageSize,
        sortBy,
        sortOrder,
        searchTerm,
      }),

    
    placeholderData: keepPreviousData,
  });

  return query;
}
