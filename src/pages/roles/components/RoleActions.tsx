import MoreActions from '@/components/shared/customs/MoreActions';
import { DeleteIcon } from '@/components/shared/icons/admins/DeleteIcon';
import { EditIcon } from '@/components/shared/icons/admins/EditIcon';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ConfirmDialog from '@/components/shared/customs/CustomConfirmDialog';
import { useDeleteRole } from '@/hooks/permissions/useDeleteRole';
import type { Role } from '@/types/permissions-types';

const RoleActions = ({ role }: { role: Role }) => {
  const {
    mutate: deleteRole,
    isPending: isLoading,
    isDeleteOpen,
    setIsDeleteOpen,
  } = useDeleteRole();
  const { t } = useTranslation();
  function handleDelete() {
    deleteRole(role.id ?? '');
  }

  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEnglish = i18n.language.startsWith('en');
  const roleName = isEnglish ? role.nameEn : role.nameAr;

  return (
    <>
      {/* Dropdown */}
      <MoreActions
        actions={[
          {
            onClick: () => navigate(`/settings/roles/edit/${role.id}`),
            text: t('roles.actions.edit'),
            variant: 'default',
            icon: <EditIcon />,
          },
          {
            onClick: () => setIsDeleteOpen(true),
            text: t('roles.actions.delete'),
            variant: 'destructive',
            icon: <DeleteIcon />,
          },
        ]}
      />

      {/* Delete DIALOG */}
      <ConfirmDialog
        open={isDeleteOpen}
        title={t('roles.actions.deleteTitle')}
        description={
          <div className='flex flex-col'>
            <p className='text-secondary-400'>
              {t('roles.actions.deleteDesc1')}{' '}
              <span className='text-primary-500 font-semibold'>{roleName}</span>{' '}
              {t('roles.actions.deleteDesc3')}
            </p>
            <p className='text-secondary-400'>{t('warns.actionCantBeUndone')}</p>
          </div>
        }
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteOpen(false)}
        confirmText={t('roles.actions.delete')}
        cancelText={t('roles.actions.cancel')}
        loading={isLoading}
        mode='destructive'
      />
    </>
  );
};

export default RoleActions;
