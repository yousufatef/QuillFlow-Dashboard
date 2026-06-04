import { CreditCard, LogOut, Settings, ShieldCheck, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

type CustomUserMenuAvatarProps = {
  name: string;
  email: string;
  imageUrl?: string;
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

function CustomUserMenuAvatar({
  name,
  email,
  imageUrl,
  className,
}: CustomUserMenuAvatarProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'inline-flex items-center cursor-pointer gap-2 rounded-md p-1 text-start outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring',
          className,
        )}
      >
        <Avatar size='lg'>
          <AvatarImage alt={name} src={imageUrl} />
          <AvatarFallback>{getInitials(name)}</AvatarFallback>
        </Avatar>
        <span className='hidden min-w-0 md:block'>
          <span className='block truncate text-sm font-medium'>{name}</span>
          <span className='block truncate text-xs text-muted-foreground'>
            {email}
          </span>
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end' className='w-64'>
        <DropdownMenuLabel className='flex items-center gap-3 px-2 py-2'>
          <Avatar>
            <AvatarImage alt={name} src={imageUrl} />
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
          <span className='min-w-0'>
            <span className='block truncate text-sm font-medium text-foreground'>
              {name}
            </span>
            <span className='block truncate text-xs font-normal'>{email}</span>
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ShieldCheck />
            Security
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant='destructive'>
          <LogOut />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CustomUserMenuAvatar;
