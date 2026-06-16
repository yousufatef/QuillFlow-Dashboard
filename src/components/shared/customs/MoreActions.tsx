import ActionDropDownBtn from '@/components/table/ActionDropdownItem';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDirection } from '@/i18n/useDirection';
import { cn } from '@/lib/utils';
import type { AppPermissions } from '@/types/permissions-types';
import { MoreVertical } from 'lucide-react';
import { WithPermissions } from '../permissions/WithPermissions';

type Action = {
  onClick: () => void;
  text: string;
  icon: React.ReactNode;
  permissions?: AppPermissions[];
  variant?: 'default' | 'destructive';
};

type MoreActionsProps = {
  actions: Action[];
  className?: string;
};

export default function MoreActions({ actions, className }: MoreActionsProps) {
  const direction = useDirection();

  return (
    <DropdownMenu dir={direction}>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label='Open row actions'
          size='icon-sm'
          variant='ghost'
          className={cn('', className)}
        >
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className={cn('flex w-fit min-w-auto flex-col gap-1 p-2', className)}
      >
        {actions.map(({ onClick, text, variant, icon, permissions }, index) => (
          <WithPermissions
            key={`${index}-${text}`}
            permissions={permissions ?? []}
          >
            <ActionDropDownBtn
              onClick={onClick}
              text={text}
              variant={variant}
              icon={icon}
            />
          </WithPermissions>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
