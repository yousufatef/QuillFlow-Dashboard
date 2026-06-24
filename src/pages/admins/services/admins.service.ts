import type { NewAdmin, UpdateAdmin, AdminsListApiRes } from '@/pages/admins/types/admin.types';
import { apiRequest } from '@/utils/api';
import type { AdminRolesResponse } from '../types/admin.types';

export const ADMINS_LIST_QUERY_KEY = 'adminsList';

export async function getAdminsListApi(): Promise<AdminsListApiRes> {
  const res = await apiRequest(`admins`, { method: 'GET' });
  return res as AdminsListApiRes;
}

export async function getAdminApi(id: string) {
  const res = await apiRequest(`admins/${id}`, { method: 'GET' });
  return res;
}

export async function createAdminApi(data: NewAdmin) {
  const res = await apiRequest(`admins`, {
    method: 'POST',
    body: data,
    headers: { 'Content-Type': 'application/json' },
  });
  return res;
}

export async function deleteAdminApi(id: string) {
  const res = await apiRequest(`admins/${id}`, { method: 'DELETE' });
  return res;
}

export async function updateAdminApi(id: string, data: UpdateAdmin) {
  const res = await apiRequest(`admins/${id}`, {
    method: 'PUT',
    body: data,
    headers: { 'Content-Type': 'application/json' },
  });
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
    `/identity/admin/roles?${searchValue ? `SearchTerm=${searchValue}&` : ''
    }PageNumber=${pageNumber}&PageSize=${pageSize}&SortBy=0&SortOrder=${sort}${status ? `&StatusFilter=${status}` : ''
    }`,
    { method: 'GET' },
  );

  return res as AdminRolesResponse;
}

export async function getAdminRolesPermissionsListApi() {
  const res = await apiRequest(`roles`, { method: 'GET' });
  return res;
}

export async function changeAdminStatusApi(id: string, isActive: boolean) {
  const res = await apiRequest(
    `/identity/admin/management/${id}/toggle-active?isActive=${isActive}`,
    { method: 'POST' },
  );
  return res;
}