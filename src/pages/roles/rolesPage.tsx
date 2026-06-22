import RolesTable from './table/roles-table';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { useTranslation } from 'react-i18next';
import { usePermissions } from '@/hooks/permissions/usePermissions';

const Roles = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { hasPermission } = usePermissions();
  const canCreateRole = hasPermission('roles.create');

  return (
    <PageLayout
      title={t('roles.title')}
      subtitle={t('roles.subtitle')}
      primaryLabel={t('roles.create')}
      onPrimaryClick={() => {
        void navigate('/settings/roles/add');
      }}
      showPrimaryButton={canCreateRole}
    >
      <RolesTable />
    </PageLayout>
  );
};

export default Roles;
