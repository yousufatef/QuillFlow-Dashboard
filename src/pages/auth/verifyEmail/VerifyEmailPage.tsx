/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useTranslation } from 'react-i18next';
import { useEffect, useMemo } from 'react';
import QuillFlowLogo from '@/assets/svgs/QuillFlow-logo.svg';
import { useSearchParams } from 'react-router-dom';
import { FormProvider, useForm, type FieldPath } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useOtp } from '@/hooks/auth/useOtp';
import ResendOtp from './_components/ResendOtp';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

function VerifyEmailPage() {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') ?? '';
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
    [i18n.language, t],
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
    try {
      await otp({ otp: data.otp, email });
    } catch (error) {
      form.setError('otp', {
        type: 'server',
        message:
          error instanceof Error && error.message
            ? error.message
            : 'Something went wrong. Please try again.',
      });
    }
  };
  return (
    <main className='mx-auto flex min-h-screen w-full min-w-md flex-col justify-center gap-6 px-6'>
      <section className='mx-auto flex h-full flex-col items-center justify-center bg-transparent md:min-w-104'>
        <img
          src={QuillFlowLogo}
          alt='QuillFlow Logo'
          className='mb-8 h-11 w-40 items-center sm:h-10 sm:w-44'
        />
        <h1 className='type-heading-xl mb-2'>{t('pages.verifyEmail.title')}</h1>
        <p className='type-body-lg text-neutral-400 mb-8'>
          {t('pages.verifyEmail.description')}
          {email}
        </p>

        <FormProvider {...form}>
          <form
            onSubmit={(e) => {
              void form.handleSubmit(onSubmit)(e);
            }}
            autoComplete='off'>
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
                      name={field.name}>
                      <InputOTPGroup className='mx-auto flex items-center justify-center gap-3'>
                        {[...Array(6)].map((_, index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className='h-12 w-12 rounded-md border text-center text-2xl font-bold text-primary-500'
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>

                  <FormMessage className='text-center' />
                </FormItem>
              )}
            />
            <ResendOtp />

            <Button
              type='submit'
              className='w-full rounded-[4px] text-base mt-8 h-12'
              disabled={isLoading}>
              {isLoading ? <Spinner /> : t('forms.buttonLabels.verifyOtp')}
            </Button>
          </form>
        </FormProvider>
      </section>
    </main>
  );
}

export default VerifyEmailPage;
