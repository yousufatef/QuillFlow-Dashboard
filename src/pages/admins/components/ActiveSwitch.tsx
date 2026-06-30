import { Badge } from '@/components/ui/badge';
import { type Admin } from '../types/admin.types';
import { useTranslation } from 'react-i18next';

/**
 * Displays the account verification status of an admin as a badge.
 * The new API no longer has an `isActive` toggle — it uses `isAccountVerified`.
 */
const ActiveSwitch = ({ admin }: { admin: Admin }) => {
  const { t } = useTranslation();

  return (
    <Badge
      className={`type-body-xs-semibold capitalize ${admin.isAccountVerified ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
        }`}
    >
      {admin.isAccountVerified ? t('common.verified') : t('common.unverified')}
    </Badge>
  );
};

export default ActiveSwitch;