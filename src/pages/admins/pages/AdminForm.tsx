import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import RoleSummary from '../components/RoleSummary';
import { useNavigate } from 'react-router-dom';
import CustomInput, { CustomPasswordInput, CustomSelect } from '@/components/forms';
import { useEffect } from 'react';
import { Form } from '@/components/ui/form';
import { useParams } from 'react-router-dom';
import { useAdmin } from '../hooks/useGetAdmin';
import { useUpdateAdmin } from '@/pages/admins/hooks/useUpdateAdmin';
import { useCreateAdmin } from '@/pages/admins/hooks/useCreateAdmin';
import PageLayout from '@/components/layout/PageLayout';
import { useTranslation } from 'react-i18next';
import {
  createAdminSchema,
  updateAdminSchema,
  type AdminFormValues,
  type UpdateAdminFormValues,
} from '../schemas/admin-schema';
import MainLoader from '@/components/shared/loader/MainLoader';
import ErrorPage from '@/pages/error/ErrorPage';
import { useDirection } from '@/i18n/useDirection';
import type { AssignedRole, NewAdmin } from '../types/admin.types';
import { useGetAdminRoles } from '../hooks/useGetRoles';

type AdminFormProps = {
  mode: 'add' | 'edit';
};

export default function AdminForm({ mode = 'edit' }: AdminFormProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const direction = useDirection();
  const isEdit = mode === 'edit';
  const { adminId } = useParams<{ adminId: string }>();

  const { adminData: admin, isLoading, error } = useAdmin(adminId ?? '', isEdit);
  const { updateAdmin } = useUpdateAdmin();
  const { createAdmin } = useCreateAdmin();
  const { allRoles, isLoading: isLoadingRoles } = useGetAdminRoles();

  const roleOptions =
    allRoles
      ?.filter((role: AssignedRole) => role.isActive)
      .map((role: AssignedRole) => ({
        value: String(role.id),
        label: direction === 'ltr' ? role.nameEn : role.nameAr,
      })) ?? [];

  // Use appropriate schema based on mode
  const schema = isEdit ? updateAdminSchema(t) : createAdminSchema(t);

  const form = useForm<AdminFormValues | UpdateAdminFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      roleId: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const values = useWatch({ control: form.control });

  const selectedRole = allRoles?.find(
    (role: AssignedRole) => String(role.id) === String((values as AdminFormValues).roleId),
  );

  const onSubmit = (data: AdminFormValues | UpdateAdminFormValues) => {
    const payload = {
      ...data,
      roleId: Number(data.roleId),
    };

    if (isEdit) {
      // Strip empty password for edit mode
      if (!payload.password) delete payload.password;
      updateAdmin({ id: adminId ?? '', data: payload });
    } else {
      createAdmin(payload as NewAdmin);
    }
  };

  useEffect(() => {
    if (!admin) return;

    form.reset({
      username: (admin as any).username ?? '',
      email: admin.email ?? '',
      password: '',
      roleId: admin.roleId ? String(admin.roleId) : '',
    });
  }, [admin, form]);

  if (isLoading || isLoadingRoles) {
    return <MainLoader />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <Form {...form}>
      <form className='h-full' onSubmit={form.handleSubmit(onSubmit)}>
        <PageLayout
          className='mt-4.5'
          mode='form'
          title={isEdit ? t('admin.editAdminUser') : t('admin.addAdminUser')}
          subtitle={t('admin.addAdminSubTitle')}
          onBack={() => navigate(-1)}
          primaryLabel={isEdit ? t('admin.buttons.update') : t('admin.buttons.create')}
          secondaryLabel={t('admin.buttons.cancel')}
          onSecondaryClick={() => {
            navigate(-1);
          }}
        >
          <div className='grid items-start gap-6 lg:grid-cols-[1fr_420px]'>
            {/* LEFT */}
            <div className='bg-card rounded-xl border p-6'>
              <h2 className='type-heading-sm mb-6'>{t('admin.adminInformation')}</h2>

              <div className='grid gap-x-4 gap-y-2 md:grid-cols-2 items-start'>
                <CustomInput
                  control={form.control}
                  label={t('admin.form.lable.username')}
                  name='username'
                  placeholder={t('admin.form.placeholders.username')}
                  required
                />

                <CustomInput
                  control={form.control}
                  label={t('admin.form.lable.email')}
                  name='email'
                  placeholder={t('admin.form.placeholders.email')}
                  required
                />

                <CustomPasswordInput
                  control={form.control}
                  label={t('admin.form.lable.password')}
                  name='password'
                  placeholder={t('admin.form.placeholders.password')}
                  required={!isEdit}
                />

                <CustomSelect
                  control={form.control}
                  label={t('admin.form.lable.role')}
                  name='roleId'
                  placeholder={t('admin.form.placeholders.role')}
                  required
                  options={roleOptions}
                />
              </div>
            </div>

            {/* RIGHT */}
            <RoleSummary
              username={(values as AdminFormValues).username}
              email={(values as AdminFormValues).email}
              role={selectedRole}
            />
          </div>
        </PageLayout>
      </form>
    </Form>
  );
}
