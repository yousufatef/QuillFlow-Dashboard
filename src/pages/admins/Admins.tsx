import AdminTable from './components/table/admin-table';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { useTranslation } from 'react-i18next';

const Admins = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <PageLayout
      title={t('admin.title')}
      primaryLabel={t('admin.addNew')}
      onPrimaryClick={() => navigate('/settings/admins/add')}
    >
      <AdminTable />
    </PageLayout>
  );
};

export default Admins;
