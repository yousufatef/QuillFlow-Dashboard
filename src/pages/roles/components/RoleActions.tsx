import MoreActions from '@/components/shared/customs/MoreActions';
import { DeleteIcon } from '@/components/shared/icons/admins/DeleteIcon';
import { EditIcon } from '@/components/shared/icons/admins/EditIcon';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ConfirmDialog from '@/components/shared/customs/CustomConfirmDialog';
import { useDeleteRole } from '@/hooks/permissions/useDeleteRole';

const RoleActions = ({ roleId }: { roleId?: string }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { mutate: deleteRole, isPending: isLoading } = useDeleteRole({
    onSuccess: () => {
      setIsDeleteOpen(false);
    },
  });
  const { t } = useTranslation();
  function handleDelete() {
    deleteRole(roleId ?? '');
  }

  const navigate = useNavigate();

  return (
    <>
      {/* Dropdown */}
      <MoreActions
        actions={[
          {
            onClick: () => navigate(`/settings/roles/edit/${roleId}`),
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
            <p className='text-secondary-400'>{t('roles.actions.deleteDesc1')}</p>
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
