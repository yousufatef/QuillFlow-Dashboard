import MoreActions from '@/components/shared/customs/MoreActions';
import { DeleteIcon } from '@/components/shared/icons/admins/DeleteIcon';
import { EditIcon } from '@/components/shared/icons/admins/EditIcon';
import { SendLinkIcon } from '@/components/shared/icons/admins/SendLinkIcon';
import { useTranslation } from 'react-i18next';
import type { User } from '../../types/user.types';

type UserActionsProps = {
  user: User;
};

const UserActions = ({ user: _user }: UserActionsProps) => {
  const { t } = useTranslation();

  return (
    <MoreActions
      actions={[
        {
          onClick: () => { },
          text: t('users.actions.reactivateAccount'),
          variant: 'default',
          icon: <EditIcon />,
        },
        {
          onClick: () => { },
          text: t('users.actions.suspendAccount'),
          variant: 'destructive',
          icon: <DeleteIcon />,
        },
        {
          onClick: () => { },
          text: t('users.actions.forgetPassword'),
          variant: 'default',
          icon: <SendLinkIcon />,
        },
      ]}
    />
  );
};

export default UserActions;
