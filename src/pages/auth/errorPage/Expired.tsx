import QuillFlowLogo from '@/assets/svgs/QuillFlow.svg';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

export default function ExpiredPage() {
  const { t } = useTranslation();
  return (
    <>
      <main className='mx-auto flex min-h-screen w-full max-w-md flex-col justify-center gap-6 px-6'>
        {/* <div className='flex justify-end'>
        <LanguageSwitcher />
      </div> */}

        <section className='mx-auto flex h-full flex-col items-center justify-center bg-transparent md:w-md'>
          <img
            src={QuillFlowLogo}
            alt='QuillFlow Logo'
            className='mb-8 h-11 w-40 items-center sm:h-10 sm:w-44'
          />
          <h1 className='type-heading-xl mb-2'>
            {t('pages.errors.somethingWrong')}
          </h1>
          <p className='type-body-lg text-neutral-400'>
            {t('pages.errors.description')}
          </p>
          <Button
            type='submit'
            className=' rounded-[4px] w-24.5  type-body-md mt-8 h-12'>
            {t('pages.errors.goBack')}
            {/* {isLoading ? <Spinner /> : t('forms.buttonLabels.signin')} */}
          </Button>
        </section>
      </main>
    </>
  );
}
