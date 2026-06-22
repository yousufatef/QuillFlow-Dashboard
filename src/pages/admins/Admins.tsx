import AdminTable from './components/table/admin-table';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { useTranslation } from 'react-i18next';
import { usePermissions } from '@/hooks/permissions/usePermissions';

const Admins = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { hasPermission } = usePermissions()
  const hasAddPermission = hasPermission("admins.create");
  return (
    <PageLayout
      title={t('admin.title')}
      primaryLabel={t('admin.addNew')}
      onPrimaryClick={() => navigate('/settings/admins/add')}
      showPrimaryButton={hasAddPermission}
    >
      <AdminTable />
    </PageLayout>
  );
};

export default Admins;
