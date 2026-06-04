import * as React from 'react';
import { XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TOAST_EVENT, type ToastPayload } from '@/lib/toast';

type ToastItem = ToastPayload & {
  id: number;
};

function Toaster() {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  React.useEffect(() => {
    const handleToast = (event: Event) => {
      const payload = (event as CustomEvent<ToastPayload>).detail;
      const id = Date.now();

      setToasts((currentToasts) => [...currentToasts, { ...payload, id }]);

      window.setTimeout(() => {
        setToasts((currentToasts) =>
          currentToasts.filter((toastItem) => toastItem.id !== id),
        );
      }, 5000);
    };

    window.addEventListener(TOAST_EVENT, handleToast);

    return () => window.removeEventListener(TOAST_EVENT, handleToast);
  }, []);

  if (!toasts.length) return null;

  return (
    <div className='fixed top-4 right-4 z-50 flex w-[min(420px,calc(100vw-2rem))] flex-col gap-2'>
      {toasts.map((toastItem) => (
        <div
          className={cn(
            'rounded-lg border bg-background p-4 text-start shadow-lg',
            toastItem.variant === 'destructive' &&
              'border-destructive/30 text-destructive',
          )}
          key={toastItem.id}
          role='status'
        >
          <div className='flex items-start gap-3'>
            <div className='min-w-0 flex-1'>
              <p className='text-sm font-medium'>{toastItem.title}</p>
              {toastItem.description ? (
                <p className='mt-1 whitespace-pre-line text-xs leading-5 text-muted-foreground'>
                  {toastItem.description}
                </p>
              ) : null}
            </div>
            <button
              aria-label='Dismiss notification'
              className='inline-flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground'
              onClick={() => {
                setToasts((currentToasts) =>
                  currentToasts.filter(
                    (currentToast) => currentToast.id !== toastItem.id,
                  ),
                );
              }}
              type='button'
            >
              <XIcon className='size-4' />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Toaster;
