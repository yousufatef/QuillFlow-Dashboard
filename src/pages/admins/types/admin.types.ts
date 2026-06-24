export type Admin = {
  id: number;
  email: string;
  username: string;
  userType: string;
  isAccountVerified: boolean;
  profileImage: string | null;
  roleId: number | null;
  created_at: string;
  updated_at: string;
};

export type NewAdmin = {
  username: string;
  email: string;
  password: string;
  roleId: number;
};

export type UpdateAdmin = {
  username: string;
  email: string;
  password?: string;
  roleId: number;
};

export type AdminsListApiRes = {
  isSuccess: boolean;
  message: string;
  errors: string[] | null;
  statusCode: number;
  result: Admin[];
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
  id: string | number;
  nameEn: string;
  nameAr: string;
  isActive?: boolean;
  assignedPermissions?: AssignedPermission[];
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
