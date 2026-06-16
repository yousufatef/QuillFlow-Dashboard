import type { PermissionFormValue, PermissionApiRes } from '@/types/permissions-types';

/** Group a flat permissions array by module name. */
export function groupPermissionsByModule(permissions: PermissionApiRes[]) {
  return permissions.reduce<Record<string, PermissionApiRes[]>>((acc, perm) => {
    (acc[perm.module] ??= []).push(perm);
    return acc;
  }, {});
}

/** Build default form values from the API array (all unchecked). */
export function buildDefaultPermissions(
  permissions: PermissionApiRes[],
): Record<string, PermissionFormValue> {
  return permissions.reduce<Record<string, PermissionFormValue>>((acc, perm) => {
    acc[perm.id] = {
      canRead: false,
      canCreate: false,
      canUpdate: false,
      canDelete: false,
    };
    return acc;
  }, {});
}
