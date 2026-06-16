import type { ListApiResponse } from './index.t';

export type AppPermissions =
  | 'blogs.create'
  | 'blogs.read'
  | 'blogs.update'
  | 'blogs.delete'
  | 'blogs.publish'
  | 'faqs.create'
  | 'faqs.read'
  | 'faqs.update'
  | 'faqs.delete'
  | 'admins.create'
  | 'admins.read'
  | 'admins.update'
  | 'admins.delete';

export type Role = {
  id: string;
  nameAr: string;
  nameEn: string;
  isActive: boolean;
  assignedUsersCount: number;
  permissionsCount: number;
  createdBy: string;
  createdByAdmin: string | null;
  assignedPermissions: PermissionApiRes[];
};

export type PermissionFormValue = {
  canRead: boolean;
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
};

export type RoleDetailsApiRes = {
  id: string;
  nameAr: string;
  nameEn: string;
  permissions: AppPermissions[];
};

export type RolesListApiRes = ListApiResponse<Role[]>;

export type PermissionApiRes = {
  id: string;
  code: string;
  permissionName: string;
  module: string;
  isActive: boolean;
};

export type RolePayload = {
  nameAr: string;
  nameEn: string;
  permissions: {
    permissionId: string;
    canRead: boolean;
    canCreate: boolean;
    canUpdate: boolean;
    canDelete: boolean;
  }[];
};
