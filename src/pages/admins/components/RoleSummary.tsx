import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { AssignedRole } from '../types/admin.types';
import { useDirection } from '@/i18n/useDirection';
interface Props {
  fullName?: string;
  email?: string;
  phone?: string;
  role?: AssignedRole | null;
}

export default function RoleSummary({ fullName, email, phone, role }: Props) {
  const { t } = useTranslation();
  const direction = useDirection()
  return (
    <div className='bg-card rounded-xl border p-6'>
      <h2 className='type-heading-sm mb-5'>{t('admin.roleSummary')}</h2>

      <div className='text-muted-foreground space-y-2'>
        <p>{t('table.name')}: {fullName || 'N/A'}</p>
        <p>{t('table.email')}: {email || 'N/A'}</p>
        <p>{t('table.phone')}: {phone || 'N/A'}</p>
      </div>

      <div className='my-5 border-t' />

      <h3 className='type-heading-sm mb-4'>{t('admin.adminAbleTo')}</h3>

      {role ? (
        <>
          <p className='type-body-md mb-3 text-neutral-400'>{t('admin.role')}: {role.nameEn}</p>
          <ul className='space-y-3'>
            {role.assignedPermissions?.length > 0 ? (
              role.assignedPermissions.map((p) => (
                <li
                  key={p.permissionId}
                  className='type-body-md flex items-center gap-2 text-neutral-400'
                >
                  <Check className='text-primary size-4' />
                  {direction === 'ltr'
                    ? (p.permissionNameEn || p.permissionName)
                    : (p.permissionNameAr || p.permissionName)}
                </li>
              ))
            ) : (
              <p className='text-muted-foreground'>
                No permissions assigned
              </p>
            )}
          </ul>
        </>
      ) : (
        <p className='text-muted-foreground'>{t('admin.selectRoleToPreviewPermissions')}</p>
      )}
    </div>
  );
}
