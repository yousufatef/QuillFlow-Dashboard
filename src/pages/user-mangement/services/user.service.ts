import type { UsersListResponse } from '../types/user.types';
import { apiRequest } from '@/utils/api';
import { generateQueryParams } from '@/utils/params';

export async function getUsersListApi(
  pageNumber = 1,
  pageSize = 10,
  searchTerm = '',
  SortBy = 0,
  SortOrder = 0,
): Promise<UsersListResponse> {
  return apiRequest<UsersListResponse>(
    `identity/admin/users?${generateQueryParams({ pageNumber, pageSize, searchTerm, SortBy, SortOrder })}`,
    { method: 'GET' },
  );
}
