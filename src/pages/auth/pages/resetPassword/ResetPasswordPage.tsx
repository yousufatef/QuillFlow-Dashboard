import { useTranslation } from 'react-i18next';
import { useEffect, useMemo } from 'react';
// import { LanguageSwitcher } from '../../../i18n/components/LanguageSwitcher';
import KaratLogo from '@/assets/svgs/karat-logo.svg';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { FormProvider, useForm, type FieldPath } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForgetPassword } from '@/pages/auth/hooks/useForgetPassword';
import CustomInput from '@/components/forms';

function ResetPasswordPage() {
  const { t, i18n } = useTranslation();

  const schema = useMemo(
    () =>
      z.object({
        email: z
          .string()
          .min(1, { message: t('forms.errors.email.required') })
          .email({ message: t('forms.errors.email.invalid') }),
      }),
    [t],
  );
  type FormData = z.infer<typeof schema>;

  const { forgetPassword, isLoading } = useForgetPassword();
  const form = useForm<FormData>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fieldsWithErrors = Object.entries(form.formState.errors)
      .filter(([, error]) => error?.type !== 'server')
      .map(([name]) => name as FieldPath<FormData>);

    if (fieldsWithErrors.length > 0) {
      void form.trigger(fieldsWithErrors);
    }
  }, [i18n.language, form]);

  const onSubmit = async (data: FormData) => {
    await forgetPassword(data);
  };
  return (
    <main className='mx-auto flex min-h-screen w-full max-w-md flex-col justify-center gap-6 px-6'>
      <section className='mx-auto flex h-full flex-col items-center justify-center bg-transparent md:max-w-104'>
        <img
          src={KaratLogo}
          alt='Karat Logo'
          className='mb-8 h-11 w-40 items-center sm:h-10 sm:w-44'
        />
        <h1 className='type-heading-xl mb-2'>{t('pages.resetPassword.title')}</h1>
        <p className='type-body-lg text-center text-neutral-400'>
          {t('pages.resetPassword.description')}
        </p>

        <FormProvider {...form}>
          <form
            onSubmit={(e) => {
              void form.handleSubmit(onSubmit)(e);
            }}
            autoComplete='off'
          >
            <div className='mt-8 grid w-104 gap-8'>
              <CustomInput
                name='email'
                placeholder={t('forms.placeholders.email')}
                label={t('forms.labels.email')}
                control={form.control}
              />

              <Button
                type='submit'
                className='h-12 w-full rounded text-base'
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : t('forms.buttonLabels.resetLink')}
              </Button>
            </div>
          </form>
        </FormProvider>
      </section>
    </main>
  );
}

export default ResetPasswordPage;
