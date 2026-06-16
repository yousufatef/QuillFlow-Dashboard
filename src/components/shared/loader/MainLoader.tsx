import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

const MainLoader = ({ className }: { className?: string }) => {
  const { t } = useTranslation();

  return (
    <div className={cn('flex min-h-75 items-center justify-center', className)}>
      <div className='flex flex-col items-center gap-3'>
        <div className='h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900' />
        <p className='text-sm text-neutral-500'>{t('common.loading')}</p>
      </div>
    </div>
  );
};

export default MainLoader;
