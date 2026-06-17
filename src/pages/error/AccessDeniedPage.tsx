import QuillFlowLogo from '@/assets/svgs/QuillFlow.svg';
import { useTranslation } from 'react-i18next';

export default function AccessDeniedPage() {
  const { t } = useTranslation();
  return (
    <section className='flex size-full flex-col items-center justify-center bg-transparent'>
      <img
        src={QuillFlowLogo}
        alt='Karat Logo'
        className='mb-8 h-20 w-56 sm:h-24 sm:w-64'
      />
      <h1 className='type-heading-xl mb-2'>{t('pages.errors.accessDenied')}</h1>
      <p className='type-body-lg text-neutral-400'>{t('pages.errors.accessDeniedDescription')}</p>
    </section>
  );
}
