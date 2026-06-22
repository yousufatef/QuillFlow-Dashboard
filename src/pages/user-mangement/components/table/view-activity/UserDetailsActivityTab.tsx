import type { User } from '../../../types/user.types';
import { Eye, LockKeyhole, Smartphone, UserIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import UserIcons from '@/components/shared/icons/users-management/UserIcons';
import { format } from 'date-fns';
import { getCurrLocale } from '@/utils/language';
import { arEG, enGB } from 'date-fns/locale';

type UserDetailsActivityTabProps = {
  user: User;
};

type ActivityItem = {
  title: string;
  date: string;
  icon: ReactNode;
};

const UserDetailsActivityTab = ({ user }: UserDetailsActivityTabProps) => {
  const isEnglish = getCurrLocale() === 'en';
  const [visibleCount, setVisibleCount] = useState(5);
  const activities: ActivityItem[] = [
    {
      title: 'Logged in from iPhone 17 pro at Egypt - Nasr City',
      date: user.createdOn ? format(new Date(user.createdOn), 'dd MMMM yyyy', { locale: isEnglish ? enGB : arEG }) : 'N/A',
      icon: <Smartphone className='size-5 text-neutral-900' />,
    },
    {
      title: 'Viewed Gold Prices',
      date: user.createdOn ? format(new Date(user.createdOn), 'dd MMMM yyyy', { locale: isEnglish ? enGB : arEG }) : 'N/A',
      icon: <Eye className='size-5 text-neutral-900' />,
    },
    {
      title: 'Changed password',
      date: user.createdOn ? format(new Date(user.createdOn), 'dd MMMM yyyy', { locale: isEnglish ? enGB : arEG }) : 'N/A',
      icon: <LockKeyhole className='size-5 text-neutral-900' />,
    },
    {
      title: 'Created account',
      date: user.createdOn ? format(new Date(user.createdOn), 'dd MMMM yyyy', { locale: isEnglish ? enGB : arEG }) : 'N/A',
      icon: <UserIcon className='size-5 text-neutral-900' />,
    },
    {
      title: 'Created account',
      date: user.createdOn ? format(new Date(user.createdOn), 'dd MMMM yyyy', { locale: isEnglish ? enGB : arEG }) : 'N/A',
      icon: <UserIcon className='size-5 text-neutral-900' />,
    },
    {
      title: 'Created account',
      date: user.createdOn ? format(new Date(user.createdOn), 'dd MMMM yyyy', { locale: isEnglish ? enGB : arEG }) : 'N/A',
      icon: <UserIcon className='size-5 text-neutral-900' />,
    },
  ];
  const visibleActivities = useMemo(
    () => activities.slice(0, visibleCount),
    [activities, visibleCount],
  );
  const hasMoreActivities = visibleCount < activities.length;

  return (
    <>
      <div className='rounded-[8px] border border-neutral-50 p-2 mt-2 mb-6'>
        <p className='type-body-sm text-neutral-400'>Last active</p>
        <div className='mt-2 flex items-center gap-2'>
          <UserIcons name='activityLog' />
          <span className='type-body-sm text-neutral-900'>3 hours ago</span>
        </div>
      </div>

      <section>
        <h3 className='mb-4 type-body-md'>User Activity</h3>
        <div className='flex flex-col'>
          {visibleActivities.map((activity, index) => {
            const hasConnector = index < visibleActivities.length - 1 || hasMoreActivities;

            return (
              <div
                key={activity.title}
                className='grid grid-cols-[40px_1fr] gap-2'
              >
                <div className='flex flex-col items-center'>
                  <div className='flex size-10 items-center justify-center rounded-full bg-neutral-50'>
                    {activity.icon}
                  </div>
                  {hasConnector ? <span className='my-2 h-6 w-px bg-neutral-50' /> : null}
                </div>

                <div className='pb-8'>
                  <p className='type-body-sm text-neutral-900'>
                    {activity.title}
                  </p>
                  <p className='mt-1 type-body-sm text-secondary-400'>
                    {activity.date}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        {hasMoreActivities && (
          <Button
            type='button'
            variant='outline'
            className='mt-4 w-full'
            onClick={() => setVisibleCount((currentCount) => currentCount + 5)}
          >
            Load more
          </Button>
        )}
      </section>
    </>
  );
};

export default UserDetailsActivityTab;
