import { resendOtpApi } from '@/services/auth.service';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

const RESEND_TIME = 300; // 5 minutes

function ResendOtp() {
  const [timer, setTimer] = useState(0);
  const [isResending, setIsResending] = useState(false);

  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';

  const { t } = useTranslation();

  const handleResend = async () => {
    if (!email) {
      toast.error(t('forms.errors.emailMissing') || 'Email is missing');
      return;
    }

    try {
      setIsResending(true);
      await resendOtpApi({ email });
      setTimer(RESEND_TIME);
      toast.success(t('forms.messages.otpResent'));
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setIsResending(false);
    }
  };

  useEffect(() => {
    if (timer <= 0) return;

    const timerId = setInterval(() => {
      setTimer((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timerId);
  }, [timer]);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  const isDisabled = timer > 0 || isResending;

  return (
    <div className='flex flex-wrap items-center justify-center mt-2 gap-1 text-sm'>
      <span className='text-neutral-500'>
        {t('forms.buttonLabels.didNotGetCode')}
      </span>

      <button
        className='text-neutral-900 underline underline-offset-4 hover:text-neutral-700 disabled:cursor-not-allowed disabled:opacity-50 type-body-md'
        onClick={void handleResend}
        disabled={isDisabled}
        type='button'>
        {timer === 0 ? (
          <span>{t('forms.buttonLabels.resendAgain')}</span>
        ) : (
          <span className='text-neutral-500 no-underline'>
            {t('forms.buttonLabels.resendEmail')} (
            {String(minutes).padStart(2, '0')}:
            {String(seconds).padStart(2, '0')})
          </span>
        )}
      </button>
    </div>
  );
}

export default ResendOtp;
