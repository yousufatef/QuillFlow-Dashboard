import { useTranslation } from 'react-i18next';
import { useEffect, useMemo } from 'react';
// import { LanguageSwitcher } from '../../../i18n/components/LanguageSwitcher';
import KaratLogo from '@/assets/svgs/karat-logo.svg';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import CustomPasswordInput from '@/components/forms/CustomPasswordInput';
import { Link } from 'react-router-dom';
import { FormProvider, useForm, type FieldPath } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useLogin } from '@/pages/auth/hooks/useLogin';
import CustomInput from '@/components/forms/CustomInput';

function LoginPage() {
  const { t, i18n } = useTranslation();

  const schema = useMemo(() => {
    return z.object({
      email: z
        .string()
        .min(1, { message: t('forms.errors.email.required') })
        .email({ message: t('forms.errors.email.invalid') }),
      password: z.string().min(1, { message: t('forms.errors.password.required') }),
    });
  }, [t]);
  type FormData = z.infer<typeof schema>;

  const { login, isLoading } = useLogin();
  const form = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
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
    await login(data);
  };
  return (
    <main className='mx-auto flex min-h-screen w-full max-w-md flex-col justify-center gap-6 px-6'>
      {/* <div className='flex justify-end'>
        <LanguageSwitcher />
      </div> */}

      <section className='mx-auto flex h-full flex-col items-center justify-center bg-transparent md:max-w-104'>
        <img
          src={KaratLogo}
          alt='Karat Logo'
          className='mb-8 h-11 w-40 items-center sm:h-10 sm:w-44'
        />
        <h1 className='type-heading-xl mb-2'>{t('pages.login.title')}</h1>
        <p className='type-body-lg text-neutral-400'>{t('pages.login.description')}</p>

        <FormProvider {...form}>
          <form
            onSubmit={(e) => {
              void form.handleSubmit(onSubmit)(e);
            }}
            autoComplete='off'
          >
            <div className='mt-8 grid w-104 gap-4'>
              <CustomInput
                name='email'
                placeholder={t('forms.placeholders.email')}
                label={t('forms.labels.email')}
                control={form.control}
              />
              <div className='mb-4'>
                <CustomPasswordInput
                  name='password'
                  placeholder={t('forms.placeholders.password')}
                  label={t('forms.labels.password')}
                  control={form.control}
                />

                <Link
                  to='/forget-password'
                  className='text-primary-900 hover:text-primary-700 mt-4 block text-end underline underline-offset-4'
                >
                  {t('pages.login.forgetPassword')}
                </Link>
              </div>
              <Button
                type='submit'
                className='h-12 w-full rounded text-base'
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : t('forms.buttonLabels.signin')}
              </Button>
            </div>
          </form>
        </FormProvider>
      </section>
    </main>
  );
}

export default LoginPage;
