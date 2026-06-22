import { ACCOUNT_STATUS_CONFIG } from '../../../constants/user.constants';
import type { User } from '../../../types/user.types';
import { toActiveStatus } from '../../../types/user.types';
import UserStatusBadge from '../../UserStatusBadge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserDetailsActivityTab from './UserDetailsActivityTab';
import UserDetailsOverviewTab from './UserDetailsOverviewTab';
import UserActions from '../UserActions';

type UserActivitySheetContentProps = {
  user: User;
};

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.at(0)?.toUpperCase())
    .join('');

const UserActivitySheetContent = ({ user }: UserActivitySheetContentProps) => {
  const userName = user.fullName || 'N/A';
  const statusConfig = ACCOUNT_STATUS_CONFIG[toActiveStatus(user.isActive)];

  return (
    <Tabs
      defaultValue='activity'
      className='flex h-full flex-col gap-0 bg-white'
    >
      <div>
        <div className='relative p-4 pb-0'>
          <div className='absolute inset-e-12 top-4'>
            <UserActions user={user} />
          </div>

          <div className='flex flex-col items-start gap-3'>
            <Avatar className='size-16'>
              <AvatarFallback className='bg-primary-500 text-primary-50 text-[24px] leading-none font-bold'>
                {getInitials(userName)}
              </AvatarFallback>
            </Avatar>

            <div className='flex flex-col gap-3'>
              <h2 className='type-heading-sm'>{userName}</h2>
              <UserStatusBadge config={statusConfig} />
            </div>
          </div>
        </div>

        <div className='mt-4 border-b border-neutral-50 px-4 pb-[2px]'>
          <TabsList
            variant='line'
            className='h-[37px] w-[200px] items-end gap-0 rounded-none p-0'
          >
            <TabsTrigger
              value='overview'
              className='type-body-sm data-active:text-primary-500'
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value='activity'
              className='type-body-sm data-active:text-primary-500'
            >
              Activity
            </TabsTrigger>
          </TabsList>
        </div>
      </div>

      <div className='flex flex-1 flex-col gap-6 overflow-y-auto p-4'>
        <TabsContent value='overview'>
          <UserDetailsOverviewTab user={user} />
        </TabsContent>
        <TabsContent value='activity'>
          <UserDetailsActivityTab user={user} />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default UserActivitySheetContent;
