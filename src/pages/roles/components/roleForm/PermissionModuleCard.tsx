import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import CustomCard from '@/components/shared/customs/CustomCard';
import { CustomCheckbox } from '@/components/forms';
import { Checkbox } from '@/components/ui/checkbox';
import { useFormContext, useWatch } from 'react-hook-form';
  
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import type { PermissionApiRes, PermissionFormValue } from '@/types/permissions-types';

type PermissionModuleCardProps = {
  permissions: PermissionApiRes[];
  moduleName: string;
};

const PERMISSION_ACTIONS = ['canRead', 'canCreate', 'canUpdate', 'canDelete'] as const;

const ACTION_LABELS = (t: TFunction): Record<(typeof PERMISSION_ACTIONS)[number], string> => ({
  canRead: t('roles.permissionModule.view'),
  canCreate: t('roles.permissionModule.create'),
  canUpdate: t('roles.permissionModule.update'),
  canDelete: t('roles.permissionModule.delete'),
});

export default function PermissionModuleCard({
  permissions,
  moduleName,
}: PermissionModuleCardProps) {
  const form = useFormContext();
  const { t } = useTranslation();
  const actionLabels = ACTION_LABELS(t);

  // Watch only this module's permissions to derive "select all" state
  const permissionIds = permissions.map((p) => p.id);
  const watchedPermissions = useWatch({
    control: form.control,
    name: permissionIds.map((id) => `permissions.${id}`),
  }) as PermissionFormValue[];

  const allChecked =
    watchedPermissions.length > 0 &&
    watchedPermissions.every((perm) => PERMISSION_ACTIONS.every((action) => perm?.[action]));

  const handleSelectAll = (checked: boolean) => {
    permissionIds.forEach((id) => {
      PERMISSION_ACTIONS.forEach((action) => {
        form.setValue(`permissions.${id}.${action}`, checked, {
          shouldDirty: true,
        });
      });
    });
  };

  const handleActionChange = (
    permissionId: string,
    action: (typeof PERMISSION_ACTIONS)[number],
    checked: boolean,
  ) => {
    if (action === 'canRead' && !checked) {
      // Unchecking View → uncheck Create, Update, Delete
      form.setValue(`permissions.${permissionId}.canCreate`, false, { shouldDirty: true });
      form.setValue(`permissions.${permissionId}.canUpdate`, false, { shouldDirty: true });
      form.setValue(`permissions.${permissionId}.canDelete`, false, { shouldDirty: true });
    } else if (action !== 'canRead' && checked) {
      // Checking Create/Update/Delete → auto-check View
      form.setValue(`permissions.${permissionId}.canRead`, true, { shouldDirty: true });
    }
  };

  return (
    <AccordionItem
      value={moduleName}
      className='border-none'
    >
      <CustomCard className='p-0'>
        <AccordionTrigger
          iconPosition='start'
          className='px-4 pt-4 pb-2 hover:no-underline'
        >
          <span className='type-body-sm-semibold'>{moduleName}</span>
        </AccordionTrigger>
        <div className='flex items-center gap-2 ps-11 pe-4 pt-0 pb-4'>
          <Checkbox
            id={`selectAll-${moduleName}`}
            checked={allChecked}
            onCheckedChange={(checked) => handleSelectAll(checked === true)}
          />
          <label
            htmlFor={`selectAll-${moduleName}`}
            className='cursor-pointer text-sm'
          >
            {t('roles.permissionModule.selectAll')}
          </label>
        </div>
        <AccordionContent className='mt-2 flex h-fit flex-col gap-4 ps-11! pb-6'>
          {permissions.map((permission) => (
            <div
              key={permission.id}
              className='flex flex-col gap-2'
            >
              <span className='type-body-sm-semibold'>{permission.permissionName}</span>
              <div className='flex flex-col gap-4'>
                {PERMISSION_ACTIONS.map((action) => (
                  <CustomCheckbox
                    key={action}
                    name={`permissions.${permission.id}.${action}`}
                    control={form.control}
                    label={actionLabels[action]}
                    onCheckedChange={(checked) =>
                      handleActionChange(permission.id, action, checked === true)
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </AccordionContent>
      </CustomCard>
    </AccordionItem>
  );
}
