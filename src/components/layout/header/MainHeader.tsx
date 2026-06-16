import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface MainHeaderProps {
  title: string;
  subtitle?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  showPrimaryButton?: boolean;
  showSecondaryButton?: boolean;
  isPrimaryLoading?: boolean;
  isSecondaryLoading?: boolean;
}

export default function MainHeader({
  title,
  subtitle,
  primaryLabel = 'Add New',
  secondaryLabel = 'Export',
  onPrimaryClick,
  onSecondaryClick,
  showPrimaryButton = true,
  showSecondaryButton = false,
  isPrimaryLoading = false,
  isSecondaryLoading = false,
}: MainHeaderProps) {
  return (
    <div className='flex items-start justify-between gap-4 border-b border-neutral-50 px-6 pb-6'>
      <div>
        <h1 className='type-heading-sm'>{title}</h1>

        {subtitle && <p className='type-body-md mt-2 text-neutral-400'>{subtitle}</p>}
      </div>

      {(showPrimaryButton || showSecondaryButton) && (
        <div className='flex flex-wrap items-center gap-3'>
          {showSecondaryButton && (
            <Button
              type='button'
              variant='outline'
              onClick={onSecondaryClick}
              className='type-body-md! border-primary-500 min-h-12 w-fit bg-transparent px-4 py-3.5 text-neutral-700 hover:bg-neutral-100 focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
            >
              {isSecondaryLoading ? <Loader2 /> : secondaryLabel}
            </Button>
          )}

          {showPrimaryButton && (
            <Button
              type='button'
              onClick={onPrimaryClick}
              disabled={isPrimaryLoading}
              className='type-body-md! bg-primary-500 hover:bg-primary-600 focus:ring-primary-500 min-h-12 w-fit border-0 px-4 py-3.5 text-white focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
            >
              {isPrimaryLoading ? <Loader2 /> : primaryLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
// Usage example:
{
  /* <MainHeader
    title="Audit Logs"
    subtitle="View system activity."
    primaryLabel="Add New"
    onPrimaryClick={() => console.log('Add new')}
    showSecondaryButton
    secondaryLabel="Export"
    onSecondaryClick={() => console.log('Export')}
/> */
}
