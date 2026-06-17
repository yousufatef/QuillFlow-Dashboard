import { useTranslation } from 'react-i18next';
import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import QuillFlowLogo from '@/assets/svgs/QuillFlow.svg';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import CustomPasswordInput from '@/components/forms/CustomPasswordInput';
import { FormProvider, useForm, type FieldPath, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import TrueIcon from '@/components/shared/icons/auth-icons/TrueIcon';
import FalseIcon from '@/components/shared/icons/auth-icons/FalseIcon';
import { toast } from 'sonner';
import { useResetAdminPassword } from '@/pages/auth/hooks/useResetAdminPassword';
import { useSetPasswordInvite } from '../../hooks/useNewPasswordInvite';

function ForgetPasswordPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const location = useLocation();

  useEffect(() => {
    if (!token && location.pathname === '/new-password') {
      void navigate('/forget-password', { replace: true });
    }
  }, [token, navigate, location.pathname]);

  const schema = useMemo(() => {
    const stringField = z.string({ message: '' });

    return z
      .object({
        newPassword: stringField,
        confirmNewPassword: stringField,
      })
      .superRefine((data, ctx) => {
        if (data.newPassword !== data.confirmNewPassword) {
          ctx.addIssue({
            code: 'custom',
            path: ['confirmPassword'],
            message: t('forms.errors.passwordsMustMatch'),
          });
        }
      });
  }, [t]);

  const { resetAdminPassword, isLoading } = useResetAdminPassword();
  const { setPasswordInvite, isLoading: isSetPasswordInviteLoading } = useSetPasswordInvite();

  type FormData = z.infer<typeof schema>;
  const form = useForm<FormData>({
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
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

  const password =
    useWatch({
      control: form.control,
      name: 'newPassword',
    }) ?? '';
  // const confirmPassword = useWatch({
  //   control: form.control,
  //   name: 'confirmPassword',
  // }) ?? '';
  const rules = [
    {
      label: t('forms.passwordRules.length'),
      isValid: password.length >= 8 && password.length <= 32,
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

    if (!token) {
      toast.error('Invalid or missing reset token');
      return;
    }

    if (location.pathname === '/new-password') {
      await resetAdminPassword({
        password: data.newPassword,
        token: token,
      });
    } else {
      await setPasswordInvite({
        password: data.newPassword,
        token: token,
      });
    }
  };

  return (
    <main className='mx-auto flex min-h-screen w-full max-w-md flex-col justify-center gap-6 px-6'>
      <section className='mx-auto flex h-full flex-col items-center justify-center bg-transparent md:max-w-104'>
        <img
          src={QuillFlowLogo}
          alt='Karat Logo'
          className='mb-8 h-20 w-56 sm:h-24 sm:w-64'
        />
        <h1 className='type-heading-xl mb-2'>{t('pages.login.titlePassword')}</h1>
        <p className='type-body-lg text-neutral-400'>{t('pages.login.descriptionPassword')}</p>

        <FormProvider {...form}>
          <form
            onSubmit={(e) => {
              void form.handleSubmit(onSubmit)(e);
            }}
            autoComplete='off'
          >
            <div className='mt-8 grid w-104 gap-4'>
              <CustomPasswordInput
                name='newPassword'
                placeholder={t('forms.placeholders.newpassword')}
                label={t('forms.labels.password')}
                control={form.control}
              />
              <div className='mb-8'>
                <CustomPasswordInput
                  name='confirmNewPassword'
                  placeholder={t('pages.login.confirmPassword')}
                  label={t('forms.labels.confirmPassword')}
                  control={form.control}
                />
                <div className='mt-2'>
                  <p className='type-body-sm mx-4 text-neutral-400'>
                    {t('forms.passwordRules.title')}
                  </p>
                  <ul className='type-body-sm mt-2 space-y-1'>
                    {rules.map((rule) => (
                      <li
                        key={rule.label}
                        className='flex items-center gap-2'
                      >
                        <div className='relative h-4 w-4 overflow-hidden'>
                          <div
                            className={
                              'absolute inset-0 transition-all duration-300 ease-out ' +
                              (rule.isValid ? 'scale-100 opacity-100' : 'scale-75 opacity-0')
                            }
                          >
                            <TrueIcon />
                          </div>
                          <div
                            className={
                              'absolute inset-0 transition-all duration-300 ease-out ' +
                              (rule.isValid ? 'scale-75 opacity-0' : 'scale-100 opacity-100')
                            }
                          >
                            <FalseIcon />
                          </div>
                        </div>
                        <span className={rule.isValid ? 'text-success-500' : 'text-error-500'}>
                          {rule.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <Button
                type='submit'
                className='h-12 w-full rounded text-base'
                disabled={isLoading || isSetPasswordInviteLoading}
              >
                {isLoading || isSetPasswordInviteLoading ? <Spinner /> : t('forms.buttonLabels.resetPassword')}
              </Button>
            </div>
          </form>
        </FormProvider>
      </section>
    </main>
  );
}

export default ForgetPasswordPage;
