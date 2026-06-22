import type { NewAdmin } from '@/pages/admins/types/admin.types';
import { apiRequest } from '@/utils/api';
import type { AdminRolesResponse } from '../types/admin.types';

export async function getAdminsListApi(
  pageNumber = 1,
  pageSize = 50,
  searchTerm = '',
  sort = 0,
  status = '',
) {
  const res = await apiRequest(
    `/identity/admin/management?${searchTerm ? `SearchTerm=${searchTerm}&` : ''}PageNumber=${pageNumber}&PageSize=${pageSize}&SortBy=0&SortOrder=${sort}${status ? `&StatusFilter=${status}` : ''}`,
    { method: 'GET' },
  );

  return res;
}

export async function getAdminApi(id: string) {
  const res = await apiRequest(`identity/admin/management/${id}`, { method: 'GET' });
  return res;
}

export async function createAdminApi(data: NewAdmin) {
  const res = await apiRequest(`identity/admin/management`, { method: 'POST', body: data });
  return res;
}

export async function deleteAdminApi(id: string) {
  const res = await apiRequest(`identity/admin/management/${id}`, { method: 'DELETE' });
  return res;
}

export async function updateAdminApi(id: string, data: NewAdmin) {
  const res = await apiRequest(`identity/admin/management/${id}`, { method: 'PUT', body: data });
  return res;
}

export async function getAdminsRolesListApi(
  pageNumber = 1,
  pageSize = 50,
  searchValue = '',
  sort = 0,
  status = '',
): Promise<AdminRolesResponse> {
  const res = await apiRequest(
    `/identity/admin/roles?${
      searchValue ? `SearchTerm=${searchValue}&` : ''
    }PageNumber=${pageNumber}&PageSize=${pageSize}&SortBy=0&SortOrder=${sort}${
      status ? `&StatusFilter=${status}` : ''
    }`,
    { method: 'GET' },
  );

  return res as AdminRolesResponse;
}
export async function getAdminRolesPermissionsListApi(
) {
  const res = await apiRequest(
    `/identity/admin/roles/all`,
    { method: 'GET' },
  );

  return res
}

export async function changeAdminStatusApi(id: string, isActive: boolean) {
  const res = await apiRequest(
    `/identity/admin/management/${id}/toggle-active?isActive=${isActive}`, { method: 'POST' },
  );

  return res;
}