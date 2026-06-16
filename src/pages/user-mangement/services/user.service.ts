import type { UsersListResponse } from '../types/user.types';
import { apiRequest } from '@/utils/api';
import { generateQueryParams } from '@/utils/params';

export async function getUsersListApi(
  pageNumber = 1,
  pageSize = 10,
  searchTerm = '',
  sort = 0,
): Promise<UsersListResponse> {
  return apiRequest<UsersListResponse>(
    `admin/users?${generateQueryParams({ pageNumber, pageSize, searchTerm, sort })}`,
    { method: 'GET' },
  );
}
