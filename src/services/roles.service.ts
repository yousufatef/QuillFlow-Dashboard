import { apiRequest } from '@/utils/api';
import { generateQueryParams } from '@/utils/params';
import type {
  PermissionApiRes,
  Role,
  RoleApiRes,
  RolePayload,
  RolesListApiRes,
} from '@/types/permissions-types';
import type { ApiResponse, QueryParams } from '@/types/index.t';

export const ROLES_LIST_QUERY_KEY = 'roles-list';
export async function getRoles(params: QueryParams): Promise<RolesListApiRes> {
  return apiRequest(`/identity/admin/roles?${generateQueryParams(params)}`, {
    method: 'GET',
  });
}

export const ROLE_DETAILS_QUERY_KEY = 'role-details';
export const getRoleDetails = async (roleId: string): Promise<ApiResponse<RoleApiRes>> => {
  return apiRequest(`/identity/admin/roles/${roleId}`, {
    method: 'GET',
  });
};

export const PERMISSIONS_QUERY_KEY = 'permissions';
export const getAllPermissions = async (): Promise<ApiResponse<PermissionApiRes[]>> => {
  return apiRequest(`/identity/admin/permissions`, {
    method: 'GET',
  });
};

export const addRoleApi = async (role: RolePayload): Promise<ApiResponse<Role>> => {
  return apiRequest('/identity/admin/roles', {
    method: 'POST',
    body: role,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const updateRoleApi = async (
  roleId: string,
  role: RolePayload,
): Promise<ApiResponse<Role>> => {
  return apiRequest(`/identity/admin/roles/${roleId}`, {
    method: 'PUT',
    body: role,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const deleteRoleApi = async (roleId: string) => {
  return apiRequest(`/identity/admin/roles/${roleId}`, {
    method: 'DELETE',
  });
};
