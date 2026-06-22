export type Admin = {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  roleId: string;
  isActive: boolean;
  createdOn?: string;
  roleNameEn: string;
  roleNameAr: string;
};
export type NewAdmin = {
  fullName: string;
  phoneNumber: string;
  email: string;
  roleId: string;
};

export interface AdminRole {
  id: string;
  nameAr: string;
  nameEn: string;
  isActive: boolean;
  assignedUsersCount: number;
  permissionsCount: number;
}
export interface AdminRolesResponse {
  isSuccess: boolean;
  data: {
    totalCount: number;
    pageSize: number;
    pageNumber: number;
    result: AdminRole[];
  };
  message: string;
  errors: string[];
  statusCode: number;
}

export type AssignedRole = {
  id: string;
  nameEn: string;
  nameAr: string;
  isActive?: boolean;
  assignedPermissions: AssignedPermission[];
};
export type AssignedPermission = {
  permissionId: string;
  permissionCode: string;
  permissionNameAr: string;
  permissionNameEn: string;
  permissionName: string;
  moduleEn: string;
  moduleAr: string;
  canRead: boolean;
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
};
