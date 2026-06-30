import { cn } from '@/lib/utils';

function getInitials(name?: string): string {
  if (!name) return '';
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
}
type UserInitialsProps = {
  name: string;
  className?: string;
  avatarClassName?: string;
  textClassName?: string;
  roleName?: string;
};

export default function UserInitials({
  name,
  className,
  avatarClassName,
  textClassName,
  roleName,
}: UserInitialsProps) {
  return (
    <div className='flex items-center gap-2'>
      <div className={cn('flex size-10 shrink-0 items-center justify-center', className)}>
        <span
          className={cn(
            'bg-primary-500 text-primary-50 flex size-8 items-center justify-center rounded-full text-sm font-medium shadow-[0_4px_10px_rgba(13,59,46,0.07)]',
            avatarClassName,
          )}
        >
          {getInitials(name)}
        </span>
      </div>
      <div className="flex flex-col">
        <span className={cn('', textClassName)}>{name}</span>
        {roleName &&
          <span className='type-body-xs-semibold text-neutral-400'>{roleName}</span>
        }
      </div>
    </div>
  );
}
