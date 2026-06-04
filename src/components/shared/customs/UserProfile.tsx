import { cn } from '@/lib/utils';

type SidebarUserProfileProps = {
  name: string;
  role?: string;
  className?: string;
};

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.at(0)?.toUpperCase())
    .join('');
}

function UserProfile({
  name,
  role = 'Admin',
  className,
}: SidebarUserProfileProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3',
        className,
      )}
    >
      <div className='flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-medium text-white'>
        {getInitials(name)}
      </div>
      <div className='min-w-0 flex-1'>
        <p className='type-body-sm font-medium truncate text-white'>{name}</p>
        <p className='type-body-xs truncate text-white/60'>{role}</p>
      </div>
    </div>
  );
}

export default UserProfile;
