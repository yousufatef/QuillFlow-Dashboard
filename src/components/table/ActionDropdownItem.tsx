import React from 'react';
import { DropdownMenuItem } from '../ui/dropdown-menu';
import { useDirection } from '@/i18n/useDirection';

type ActionDropDownBtnProps = {
  onClick: () => void;
  text: string;
  variant?: 'destructive' | 'default';
  icon: React.ReactNode;
};

export default function ActionDropDownBtn({
  onClick,
  text,
  variant,
  icon,
}: ActionDropDownBtnProps) {
  const direction = useDirection();

  return (
    <DropdownMenuItem
      variant={variant}
      onClick={onClick}
      className='flex w-27 min-w-fit items-center justify-start gap-2 px-2 py-2'
      dir={direction}
    >
      {icon}
      <span className='type-body-sm-semibold'>{text}</span>
    </DropdownMenuItem>
  );
}
