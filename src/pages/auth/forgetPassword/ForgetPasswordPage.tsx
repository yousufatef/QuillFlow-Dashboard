/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useTranslation } from 'react-i18next';
import { useEffect, useMemo } from 'react';
import QuillFlowLogo from '@/assets/svgs/QuillFlow-logo.svg';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import CustomPasswordInput from '@/components/forms/CustomPasswordInput';
import { FormProvider, useForm, type FieldPath } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useChangePassword } from '@/hooks/auth/useChangePassword';
import TrueIcon from '@/components/shared/icons/auth-icons/TrueIcon';
import FalseIcon from '@/components/shared/icons/auth-icons/FalseIcon';
import { toast } from 'sonner';

function ForgetPasswordPage() {
  const { t, i18n } = useTranslation();

  const schema = useMemo(() => {
    const stringField = z.string({ message: '' });

    return z
      .object({
        newPassword: stringField,
        confirmPassword: stringField,
      })
      .superRefine((data, ctx) => {
        if (data.newPassword !== data.confirmPassword) {
          ctx.addIssue({
            code: 'custom',
            path: ['confirmPassword'],
            message: t('forms.errors.passwordsMustMatch'),
          });
        }
      });
  }, [i18n.language, t]);

  const { changePassword, isLoading } = useChangePassword();
  type FormData = z.infer<typeof schema>;
  const form = useForm<FormData>({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
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

  // eslint-disable-next-line react-hooks/incompatible-library
  const password = form.watch('newPassword') ?? '';
  // eslint-disable-next-line react-hooks/incompatible-library
  // const confirmPassword = form.watch('confirmPassword') ?? '';
  const rules = [
    {
      label: t('forms.passwordRules.length'),
      isValid: password.length >= 8 && password.length <= 20,
    },
    {
      label: t('forms.passwordRules.lowercase'),
      isValid: /[a-z]/.test(password),
    },
    {
      label: t('forms.passwordRules.uppercase'),
      isValid: /[A-Z]/.test(password),
    },
    {
      label: t('forms.passwordRules.number'),
      isValid: /\d/.test(password),
    },
    {
      label: t('forms.passwordRules.specialCharacter'),
      isValid: /[$&+,:;=?@#|'<>.^*()%!-]/.test(password),
    },
  ];
  const isPasswordValid = rules.every((rule) => rule.isValid);

  const onSubmit = async (data: FormData) => {
    if (!isPasswordValid) return;

    try {
      await changePassword(data);
    } catch (error) {
      toast.error(
        error instanceof Error && error.message
          ? error.message
          : 'Something went wrong. Please try again.',
      );
    }
  };

  return (
    <main className='mx-auto flex min-h-screen w-full max-w-md flex-col justify-center gap-6 px-6'>
      <section className='mx-auto flex h-full flex-col items-center justify-center bg-transparent md:max-w-104'>
        <img
          src={QuillFlowLogo}
          alt='QuillFlow Logo'
          className='mb-8 h-11 w-40 items-center sm:h-10 sm:w-44'
        />
        <h1 className='type-heading-xl mb-2'>
          {t('pages.login.titlePassword')}
        </h1>
        <p className='type-body-lg text-neutral-400'>
          {t('pages.login.descriptionPassword')}
        </p>

        <FormProvider {...form}>
          <form
            onSubmit={(e) => {
              void form.handleSubmit(onSubmit)(e);
            }}
            autoComplete='off'
          >
            <div className='grid gap-4 mt-8 w-104'>
              <CustomPasswordInput
                name='newPassword'
                placeholder={t('forms.placeholders.newpassword')}
                label={t('forms.labels.password')}
                control={form.control}
              />
              <div className='mb-8'>
                <CustomPasswordInput
                  name='confirmPassword'
                  placeholder={t('pages.login.confirmPassword')}
                  label={t('forms.labels.confirmPassword')}
                  control={form.control}
                />
                <div className='mt-2'>
                  <p className='type-body-sm mx-4 text-neutral-400'>
                    {t('forms.passwordRules.title')}
                  </p>
                  <ul className='mt-2 type-body-sm space-y-1'>
                    {rules.map((rule) => (
                      <li key={rule.label} className='flex items-center gap-2'>
                        {rule.isValid ? <TrueIcon /> : <FalseIcon />}
                        <span
                          className={
                            rule.isValid ? 'text-success-500' : 'text-error-500'
                          }
                        >
                          {rule.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <Button
                type='submit'
                className='w-full rounded text-base h-12'
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spinner />
                ) : (
                  t('forms.buttonLabels.resetPassword')
                )}
              </Button>
            </div>
          </form>
        </FormProvider>
      </section>
    </main>
  );
}

export default ForgetPasswordPage;
