import { format } from 'date-fns';
import { arEG } from 'date-fns/locale/ar-EG';
import { enGB } from 'date-fns/locale/en-GB';

type DateFormatVariant = 'long' | 'short';

const PATTERNS: Record<DateFormatVariant, string> = {
  long: 'dd MMMM yyyy',
  short: 'd MMM yyyy',
};

const getLocale = (isEnglish: boolean) => (isEnglish ? enGB : arEG);

export const formatLocalizedDate = (
  date?: string,
  isEnglish = true,
  variant: DateFormatVariant = 'long',
): string => {
  if (!date) return '-';
  return format(new Date(date), PATTERNS[variant], { locale: getLocale(isEnglish) });
};

/** Full month name — used in tables */
export const formatDate = (date?: string, isEnglish = true) =>
  formatLocalizedDate(date, isEnglish, 'long');

/** Short month — used in cards */
export const formatDateShort = (date: string, isEnglish: boolean) =>
  formatLocalizedDate(date, isEnglish, 'short');
