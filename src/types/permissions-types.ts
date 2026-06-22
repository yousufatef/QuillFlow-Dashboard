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
  | 'admins.delete'
  | 'roles.create'
  | 'roles.read'
  | 'roles.update'
  | 'roles.delete'
  | 'users.create'
  | 'users.read'
  | 'users.update'
  | 'users.delete'
  | 'transactions.create'
  | 'transactions.read'
  | 'transactions.update'
  | 'transactions.delete';

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
  permissionCode: string;
  permissionName: string;
  module: string;
  canRead: boolean;
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
};

export type RolePayload = {
  nameAr: string;
  nameEn: string;
  permissions: {
    id: string;
    canRead: boolean;
    canCreate: boolean;
    canUpdate: boolean;
    canDelete: boolean;
  }[];
};

export type RoleApiRes = {
  id: string;
  nameAr: string;
  nameEn: string;
  isActive: boolean;
  permissions: {
    id: string;
    permissionCode: string;
    permissionName: string;
    module: string;
    canRead: boolean;
    canCreate: boolean;
    canUpdate: boolean;
    canDelete: boolean;
  }[];
};
