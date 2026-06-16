import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export default function LoadingOverlay({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        'absolute inset-0 z-999 flex size-full flex-col items-center justify-center gap-4 bg-neutral-50 opacity-60',
        className,
      )}
    >
      {children}
      <Spinner
        color='var(--neutral-900)'
        className='size-16'
      />
    </div>
  );
}
