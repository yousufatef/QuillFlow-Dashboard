import type { User } from '../../../types/user.types';
import type { ReactNode } from 'react';
import UserIcons from '@/components/shared/icons/users-management/UserIcons';
import { format } from 'date-fns';
import { getCurrLocale } from '@/utils/language';
import { arEG, enGB } from 'date-fns/locale';

type UserDetailsOverviewTabProps = {
  user: User;
};

type OverviewItem = {
  label: string;
  value: string;
  icon: ReactNode;
};

const UserDetailsOverviewTab = ({ user }: UserDetailsOverviewTabProps) => {
  const userName = user.fullName;
  const isEnglish = getCurrLocale() === 'en';
  const overviewItems: OverviewItem[] = [
    {
      label: 'Full name',
      value: userName || 'N/A',
      icon: <UserIcons name='user' />,
    },
    {
      label: 'Email',
      value: user.email || 'N/A',
      icon: <UserIcons name='email' />,
    },
    {
      label: 'Mobile number',
      value: user.phoneNumber || 'N/A',
      icon: <UserIcons name='phone' />,
    },
    {
      label: 'Joining date',
      value: user.createdOn ? format(new Date(user.createdOn), 'dd MMMM yyyy', { locale: isEnglish ? enGB : arEG }) : 'N/A',
      icon: <UserIcons name='calendar' />,
    },
  ];

  return (
    <section>
      <h3 className='mb-4 type-body-md'>Basic Information</h3>
      <div className='flex flex-col gap-3'>
        {overviewItems.map((item) => (
          <div
            key={item.label}
            className='flex flex-col gap-2'
          >
            <p className='type-body-sm text-neutral-400'>{item.label}</p>
            <div className='flex items-center gap-2'>
              {item.icon}
              <span className='type-body-sm text-neutral-900'>{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserDetailsOverviewTab;
