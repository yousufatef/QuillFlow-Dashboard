import { resendOtpApi } from '@/pages/auth/service/auth.service';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

interface ResendOtpProps {
  remainingSeconds?: number;
  onTimerUpdate: (newTimer: number) => void;
  isFetchingTimer?: boolean;
}

function ResendOtp({ remainingSeconds, onTimerUpdate, isFetchingTimer }: ResendOtpProps) {
  const [timer, setTimer] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const { t } = useTranslation();

  // Sync local timer with prop
  useEffect(() => {
    if (Number.isFinite(remainingSeconds) && remainingSeconds! >= 0) {
      setTimer(remainingSeconds!);
    }
  }, [remainingSeconds]);

  // Countdown effect
  useEffect(() => {
    if (timer <= 0) return;

    const timerId = setInterval(() => {
      setTimer((prev) => {
        const newValue = Math.max(prev - 1, 0);
        // Update parent component when timer changes
        if (newValue !== prev) {
          onTimerUpdate(newValue);
        }
        return newValue;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [timer, onTimerUpdate]);

  const handleResend = async () => {
    if (!email) {
      toast.error(t('forms.errors.emailMissing'));
      return;
    }

    try {
      setIsResending(true);
      const response: any = await resendOtpApi({ email });
      const nextTimer = Number(response?.data?.remainingSeconds);
      const validTimer = Number.isFinite(nextTimer) && nextTimer >= 0 ? nextTimer : 0;

      setTimer(validTimer);
      onTimerUpdate(validTimer);

      toast.success(t('forms.messages.otpResent'));
    } catch (error: any) {
      toast.error(error?.message || t('errors.unexpectedHint'));
    } finally {
      setIsResending(false);
    }
  };

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  const isDisabled = timer > 0 || isResending || isFetchingTimer;

  return (
    <div className='mt-2 flex flex-wrap items-center justify-center gap-1 text-sm'>
      <span className='text-neutral-500'>{t('forms.buttonLabels.didNotGetCode')}</span>

      <button
        className='type-body-md text-neutral-900 underline underline-offset-4 hover:text-neutral-700 disabled:cursor-not-allowed disabled:opacity-50'
        onClick={handleResend}
        disabled={isDisabled}
        type='button'
      >
        {isFetchingTimer ? (
          <span className='text-neutral-500 no-underline'>
            {t('forms.buttonLabels.resendAgain')}
          </span>
        ) : timer === 0 ? (
          <span className='type-body-md text-primary-500 cursor-pointer'>
            {t('forms.buttonLabels.resendAgain')}
          </span>
        ) : (
          <span className='text-neutral-500 no-underline'>
            {t('forms.buttonLabels.resendEmail')} ({String(minutes).padStart(2, '0')}:
            {String(seconds).padStart(2, '0')})
          </span>
        )}
      </button>
    </div>
  );
}

export default ResendOtp;
