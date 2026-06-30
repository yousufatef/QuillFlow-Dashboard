import RolesTable from './table/roles-table';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { useTranslation } from 'react-i18next';

const Roles = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <PageLayout
      title={t('roles.title')}
      subtitle={t('roles.subtitle')}
      primaryLabel={t('roles.create')}
      onPrimaryClick={() => {
        void navigate('/settings/roles/add');
      }}
      showPrimaryButton={true}
    >
      <RolesTable />
    </PageLayout>
  );
};

export default Roles;
