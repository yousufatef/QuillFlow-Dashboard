import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { AssignedRole } from '../types/admin.types';
import { useDirection } from '@/i18n/useDirection';
import CustomCard from '@/components/shared/customs/CustomCard';
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
    <CustomCard className='flex flex-col items-start gap-2'>
      <h2 className='type-heading-sm mb-2'>{t('admin.roleSummary')}</h2>
      <div className='text-muted-foreground space-y-2 break-all'>
        <p>{t('table.name')}: {fullName || 'N/A'}</p>
        <p>{t('table.email')}: {email || 'N/A'}</p>
        <p>{t('table.phone')}: {phone || 'N/A'}</p>
      </div>

      <div className='my-2 border-t border-neutral-50 w-full' />

      <h3 className='type-heading-sm mb-2'>{t('admin.adminAbleTo')}</h3>
      {role ? (
        <>
          <p className='type-body-md mb-2 text-neutral-400'>{t('admin.role')}: {role.nameEn}</p>
          <ul className='space-y-3'>
            {role.assignedPermissions?.length > 0 ? (
              role.assignedPermissions.map((p) => (
                <li
                  key={p.permissionId}
                  className='type-body-md flex items-center gap-2 text-neutral-400 break-all truncate'
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
    </CustomCard>
  );
}
