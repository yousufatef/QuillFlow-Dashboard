import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import RoleSummary from '../components/RoleSummary';
import { useNavigate } from 'react-router-dom';
import CustomInput, { CustomSelect } from '@/components/forms';
import { useEffect } from 'react';
import { Form } from '@/components/ui/form';
import { useParams } from 'react-router-dom';
import { useAdmin } from '../hooks/useGetAdmin';
import { useUpdateAdmin } from '@/pages/admins/hooks/useUpdateAdmin';
import { useCreateAdmin } from '@/pages/admins/hooks/useCreateAdmin';
// import ConfirmDialog from '@/components/shared/customs/CustomConfirmDialog';
import PageLayout from '@/components/layout/PageLayout';
import { useTranslation } from 'react-i18next';
import { createAdminSchema, type AdminFormValues } from '../schemas/admin-schema';
import MainLoader from '@/components/shared/loader/MainLoader';
import ErrorPage from '@/pages/error/ErrorPage';
import { useAdminsRolesList } from '../hooks/useGetRoles';
import { useDirection } from '@/i18n/useDirection';
import type { AssignedRole } from '../types/admin.types';

type NewAdminProps = {
  mode: 'add' | 'edit';
};
export default function NewAdmin({ mode = 'edit' }: NewAdminProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const direction = useDirection()
  // const [showExitDialog, setShowExitDialog] = useState<boolean>(false);
  const isEdit = mode === 'edit';
  const { adminId } = useParams<{ adminId: string }>();
  const { adminData: admin, isLoading, error } = useAdmin(adminId ?? '', isEdit);
  const { updateAdmin } = useUpdateAdmin();
  const { createAdmin } = useCreateAdmin();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useAdminsRolesList();

  const roles = data?.pages.flatMap((page) => page.data.result) ?? [];
  const roleOptions = roles.map((role) => ({
    value: role.id,
    label: direction === "ltr" ? role.nameEn : role.nameAr,
  }));

  const form = useForm<AdminFormValues>({
    resolver: zodResolver(createAdminSchema(t)),
    defaultValues: {
      fullName: admin?.fullName || '',
      email: admin?.email || '',
      phoneNumber: admin?.phoneNumber || '',
      roleId: admin?.roleId || '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const values = useWatch({
    control: form.control,
  });
  const selectedRole = roles.find(
    (r) => r.id === values.roleId
  ) as
    | AssignedRole
    | undefined;

  const onSubmit = (data: AdminFormValues) => {
    if (isEdit) {
      updateAdmin({ id: adminId ?? '', data });
    } else {
      createAdmin(data);
    }
  };

  const watchAll = form.watch();

  const errors = form.formState.errors;
  // const isDirty = form.formState.isDirty;
  useEffect(() => { }, [watchAll, errors]);
  useEffect(() => { }, [watchAll, errors]);

  if (isLoading) {
    return <MainLoader />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <PageLayout
          mode='form'
          title={isEdit ? t('admin.editAdminUser') : t('admin.addAdminUser')}
          subtitle={t('admin.addAdminSubTitle')}
          onBack={() => navigate(-1)}
          primaryLabel={isEdit ? t('admin.buttons.update') : t('admin.buttons.create')}
          secondaryLabel={t('admin.buttons.cancel')}
          onSecondaryClick={() => {
            // if (isDirty) {
              // setShowExitDialog(true);
            // } else {
              navigate(-1);
            // }
          }}
        >
          {/* <ConfirmDialog
            open={showExitDialog}
            title={t('common.ExitWithoutSaving')}
            description={
              <p className='text-muted-foreground'>
                {t("common.AnyDiscardedUnsavedChanges")}
              </p>
            }
            confirmText='Exit'
            cancelText='Cancel'
            onConfirm={() => navigate(-1)}
            onCancel={() => setShowExitDialog(false)}
            mode='destructive'
            className='sm:max-w-86.5'
          /> */}

          <div className='grid gap-6 lg:grid-cols-[1fr_420px]'>
            {/* LEFT */}
            <div className='bg-card rounded-xl border p-6'>
              <h2 className='type-heading-sm mb-6'>{t('admin.adminInformation')}</h2>

              <div className='grid gap-6 md:grid-cols-2'>
                <CustomInput
                  control={form.control}
                  label={t('admin.form.lable.fullName')}
                  name='fullName'
                  placeholder={t('admin.form.placeholders.fullName')}
                  required
                />

                <CustomInput
                  control={form.control}
                  label={t('admin.form.lable.email')}
                  name='email'
                  placeholder={t('admin.form.placeholders.email')}
                  required
                />

                <CustomInput
                  control={form.control}
                  label={t('admin.form.lable.phone')}
                  name='phoneNumber'
                  placeholder={t('admin.form.placeholders.phone')}
                  required
                />

                <CustomSelect
                  control={form.control}
                  label={t('admin.form.lable.role')}
                  name='roleId'
                  placeholder={t('admin.form.placeholders.role')}
                  required
                  options={roleOptions}
                  onLoadMore={fetchNextPage}
                  hasMore={Boolean(hasNextPage)}
                  isLoadingMore={isFetchingNextPage}
                />

              </div>
            </div>

            {/* RIGHT */}
            <RoleSummary
              fullName={values.fullName}
              email={values.email}
              phone={values.phoneNumber}
              role={selectedRole}
            />
          </div>
        </PageLayout>
      </form>
    </Form>
  );
}
