import { cn } from '@/lib/utils';
import type { IconProps } from '@/types/index.t';

export default function SortIcon({ className }: IconProps) {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={cn('', className)}
    >
      <g clipPath='url(#clip0_619_4722)'>
        <path
          d='M10 6.25L6.25 2.5L2.5 6.25M6.25 2.5V13.75M10 13.75L13.75 17.5L17.5 13.75M13.75 17.5V6.25'
          stroke='#1B1A1A'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_619_4722'>
          <rect
            width='20'
            height='20'
            fill='white'
          />
        </clipPath>
      </defs>
    </svg>
  );
}
