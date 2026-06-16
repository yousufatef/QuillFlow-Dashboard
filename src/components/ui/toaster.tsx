import { Toaster as SonnerToaster } from 'sonner';
import { cn } from '@/lib/utils';
import ToasterIcons from '../shared/icons/toaster-icons/ToasterIcons';

const toastClassNames = {
  toast: cn(
    'group/toast relative flex w-[var(--width)] max-w-[calc(100vw-2rem)] items-start gap-2 rounded-xl p-2',
    'shadow-[0_4px_20px_rgba(13,59,46,0.1)]',
  ),
  title: 'type-body-md-semibold text-neutral-900',
  description: 'type-body-sm text-neutral-400',
  content: 'flex min-w-0 flex-1 flex-col gap-0.5 pe-6',
  icon: 'mt-0.5 shrink-0',
  closeButton: cn(
    'absolute end-3 top-3 inline-flex size-5 shrink-0 items-center justify-center',
    'text-neutral-900 transition-opacity hover:opacity-70',
  ),
  actionButton: cn(
    'type-body-sm-semibold shrink-0 rounded-md bg-primary-500 px-3 py-1.5 text-white',
    'transition-colors hover:bg-primary-600',
  ),
  cancelButton: cn(
    'type-body-sm shrink-0 rounded-md px-3 py-1.5 text-neutral-500',
    'transition-colors hover:text-neutral-900',
  ),
  loader: 'text-primary-500',
};

function Toaster() {
  return (
    <SonnerToaster
      closeButton
      dir='auto'
      gap={12}
      icons={{
        close: <ToasterIcons name='closeX' />,
        error: <ToasterIcons name='error' />,
        info: <ToasterIcons name='info' />,
        loading: (
          <ToasterIcons
            name='loading'
            className='animate-spin'
          />
        ),
        success: <ToasterIcons name='success' />,
        warning: <ToasterIcons name='warning' />,
      }}
      offset={16}
      position='top-center'
      visibleToasts={6}
      toastOptions={{
        classNames: toastClassNames,
        duration: 5000,
        unstyled: true,
      }}
    />
  );
}

export default Toaster;
