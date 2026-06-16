/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useTranslation } from 'react-i18next';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import KaratLogo from '@/assets/svgs/karat-logo.svg';
import { FormProvider, useForm, type FieldPath } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useOtp } from '@/pages/auth/hooks/useOtp';
import { forgetPasswordApi } from '@/pages/auth/service/auth.service';
import ResendOtp from './_components/ResendOtp';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

function VerifyEmailPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') ?? '';

  const [remainingSeconds, setRemainingSeconds] = useState<number | undefined>(undefined);
  const [isFetchingTimer, setIsFetchingTimer] = useState(false);

  useEffect(() => {
    if (!email) {
      void navigate('/forget-password', { replace: true });
      return;
    }

    // Always fetch remainingSeconds from server on page load/refresh
    let isMounted = true;
    const fetchRemainingSeconds = async () => {
      try {
        setIsFetchingTimer(true);
        const response: any = await forgetPasswordApi({ email });
        const nextTimer = Number(response?.data?.remainingSeconds);

        if (isMounted && Number.isFinite(nextTimer) && nextTimer >= 0) {
          setRemainingSeconds(nextTimer);
        }
      } catch (error) {
        // Ignore errors and keep current state
        console.error('Failed to fetch remaining seconds:', error);
      } finally {
        if (isMounted) {
          setIsFetchingTimer(false);
        }
      }
    };

    void fetchRemainingSeconds();

    return () => {
      isMounted = false;
    };
  }, [email, navigate]);

  const schema = useMemo(
    () =>
      z.object({
        otp: z
          .string({
            message: t('forms.errors.otp'),
          })
          .regex(/^\d+$/, {
            message: t('forms.errors.otp'),
          })
          .length(6, {
            message: t('forms.errors.otp'),
          }),
      }),
    [t],
  );
  type FormData = z.infer<typeof schema>;

  const { otp, isLoading } = useOtp();
  const form = useForm<FormData>({
    defaultValues: {
      otp: '',
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
    await otp({ otp: data.otp, email });
  };

  const handleTimerUpdate = (newTimer: number) => {
    setRemainingSeconds(newTimer);
  };

  return (
    <main className='mx-auto flex min-h-screen w-full min-w-md flex-col justify-center gap-6 px-6'>
      <section className='mx-auto flex h-full flex-col items-center justify-center bg-transparent md:min-w-104'>
        <img
          src={KaratLogo}
          alt='Karat Logo'
          className='mb-8 h-11 w-40 items-center sm:h-10 sm:w-44'
        />
        <h1 className='type-heading-xl mb-2'>{t('pages.verifyEmail.title')}</h1>
        <p className='type-body-lg mb-8 text-neutral-400'>
          {t('pages.verifyEmail.description')}
          {email}
        </p>

        <FormProvider {...form}>
          <form
            onSubmit={(e) => {
              void form.handleSubmit(onSubmit)(e);
            }}
            autoComplete='off'
          >
            <FormField
              control={form.control}
              name='otp'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      pattern='[0-9]*'
                      inputMode='numeric'
                      value={field.value || ''}
                      onChange={(value) => {
                        // Filter out any non-numeric characters
                        const numericOnly = value.replace(/[^0-9]/g, '');
                        field.onChange(numericOnly);
                      }}
                      onBlur={field.onBlur}
                      name={field.name}
                    >
                      <InputOTPGroup className='mx-auto flex items-center justify-center gap-3'>
                        {[...Array(6)].map((_, index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className='text-primary-500 h-12 w-12 rounded-md border text-center text-2xl font-bold'
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>

                  <FormMessage className='text-center' />
                </FormItem>
              )}
            />
            <ResendOtp
              remainingSeconds={remainingSeconds}
              onTimerUpdate={handleTimerUpdate}
              isFetchingTimer={isFetchingTimer}
            />

            <Button
              type='submit'
              className='mt-8 h-12 w-full rounded text-base'
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : t('forms.buttonLabels.verifyOtp')}
            </Button>
          </form>
        </FormProvider>
      </section>
    </main>
  );
}

export default VerifyEmailPage;
