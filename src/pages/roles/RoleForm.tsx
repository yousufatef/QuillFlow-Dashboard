import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import CustomInput from '@/components/forms';
import { useEffect, useMemo } from 'react';
import { Form } from '@/components/ui/form';
import { useTranslation } from 'react-i18next';
import CustomSection from '@/components/shared/customs/CustomSection';
import CustomCard from '@/components/shared/customs/CustomCard';
import type { RolePayload } from '@/types/permissions-types';
import { Accordion } from '@/components/ui/accordion';
import PermissionModuleCard from './components/roleForm/PermissionModuleCard';
import PageLayout from '@/components/layout/PageLayout';
import { useMutation, useQuery } from '@tanstack/react-query';
import { buildDefaultPermissions, groupPermissionsByModule } from '@/utils/permissions';
import MainLoader from '@/components/shared/loader/MainLoader';
import {
  addRoleApi,
  getAllPermissions,
  getRoleDetails,
  PERMISSIONS_QUERY_KEY,
  ROLE_DETAILS_QUERY_KEY,
  updateRoleApi,
} from '@/services/roles.service';
import LoadingOverlay from '@/components/shared/loader/LoadingOverlay';
import { toast } from '@/lib/toast';
import { titleArSchema, titleEnSchema } from '@/utils/schemas';

const permissionValueSchema = z.object({
  canRead: z.boolean(),
  canCreate: z.boolean(),
  canUpdate: z.boolean(),
  canDelete: z.boolean(),
});

const roleSchema = z.object({
  nameEN: titleEnSchema,
  nameAR: titleArSchema,
  permissions: z.record(z.string(), permissionValueSchema),
});

type RoleFormValues = z.infer<typeof roleSchema>;

type RoleFormProps = {
  roleId?: string;
};

export default function RoleForm({ roleId }: RoleFormProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isEdit = !!roleId;

  const {
    data: permissionsRes,
    isLoading: isLoadingPermissions,
    isFetched: isPermissionsFetched,
  } = useQuery({
    queryKey: [PERMISSIONS_QUERY_KEY],
    queryFn: () => getAllPermissions(),
    enabled: !roleId,
  });

  const { data, isLoading: isLoadingRole } = useQuery({
    queryKey: [ROLE_DETAILS_QUERY_KEY, roleId],
    queryFn: () => getRoleDetails(roleId as string),
    enabled: !!roleId,
  });

  const role = data?.data;

  const { mutateAsync: addRole, isPending: isAddingRole } = useMutation({
    mutationFn: addRoleApi,
    onSuccess: () => navigate('/settings/roles'),
    onError: (err) => toast.error(err.message),
  });

  const { mutateAsync: updateRole, isPending: isUpdatingRole } = useMutation({
    mutationFn: (role: RolePayload) => updateRoleApi(roleId!, role),
    onSuccess: () => navigate('/settings/roles'),
    onError: (err) => toast.error(err.message),
  });

  const apiPermissions = permissionsRes?.data;

  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      nameEN: role?.nameEn || '',
      nameAR: role?.nameAr || '',
      permissions: {},
    },
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data: RoleFormValues) => {
    // Convert the record back to an array for the API
    const permissionsPayload = Object.entries(data.permissions)
      .filter(([, perm]) => perm.canRead || perm.canCreate || perm.canUpdate || perm.canDelete)
      .map(([id, perm]) => ({ permissionId: id, ...perm }));

    const payload = {
      nameEn: data.nameEN,
      nameAr: data.nameAR,
      permissions: permissionsPayload,
    };

    if (isEdit) {
      await updateRole(payload);
    } else {
      await addRole(payload);
    }
  };

  useEffect(() => {
    if (!isLoadingPermissions && isPermissionsFetched) {
      form.reset({
        nameEN: role?.nameEn || '',
        nameAR: role?.nameAr || '',
        permissions: buildDefaultPermissions(apiPermissions!),
      });
    }
  }, [isLoadingPermissions, isPermissionsFetched]);

  const permissionsByModule = useMemo(
    () => groupPermissionsByModule(apiPermissions || []),
    [apiPermissions],
  );

  if (isLoadingRole) return <MainLoader />;

  return (
    <Form {...form}>
      <form
        className='h-full'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <PageLayout
          mode='form'
          title={t('roles.form.title')}
          subtitle={t('roles.form.subtitle')}
          onBack={() => navigate(-1)}
          primaryLabel={isEdit ? t('roles.form.update') : t('roles.form.create')}
          secondaryLabel={t('roles.form.cancel')}
          onSecondaryClick={() => {
            // Trigger navigation — if dirty, the blocker will automatically intercept and show the dialog
            navigate(-1);
          }}
          isPrimaryLoading={isAddingRole || isUpdatingRole}
          isSecondaryLoading={isAddingRole || isUpdatingRole}
        >
          <div className='relative'>
            {(isAddingRole || isUpdatingRole) && <LoadingOverlay />}

            <div className='mx-auto mt-6 w-180'>
              <div className='flex flex-col gap-6'>
                {/* Role Information */}
                <CustomSection
                  title={t('roles.form.roleInfo')}
                  description={t('roles.form.roleInfoDesc')}
                >
                  <CustomCard className='flex items-start gap-4'>
                    <CustomInput
                      control={form.control}
                      label={t('roles.form.roleTitleEn')}
                      name='nameEN'
                      placeholder={t('roles.form.placeholderEn')}
                      required
                    />
                    <CustomInput
                      control={form.control}
                      label={t('roles.form.roleTitleAr')}
                      name='nameAR'
                      placeholder={t('roles.form.placeholderAr')}
                      required
                    />
                  </CustomCard>
                </CustomSection>
                {/* Permissions */}
                {isLoadingPermissions ? (
                  <MainLoader />
                ) : (
                  <CustomSection
                    title={t('roles.form.permissions')}
                    description={t('roles.form.permissionsDesc')}
                  >
                    <Accordion
                      type='single'
                      collapsible
                    >
                      <div className='flex flex-col gap-2'>
                        {Object.entries(permissionsByModule).map(([moduleName, permissions]) => (
                          <PermissionModuleCard
                            key={moduleName}
                            permissions={permissions}
                            moduleName={moduleName}
                          />
                        ))}
                      </div>
                    </Accordion>
                  </CustomSection>
                )}
              </div>
            </div>
          </div>
        </PageLayout>
      </form>
    </Form>
  );
}
