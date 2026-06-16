import type { ActiveStatus, KycStatus } from '../types/user.types';
import { KycStatus as KycStatusEnum } from '../types/user.types';

export type UserStatusConfig = {
  labelEn: string;
  labelAr: string;
  className: string;
};

export const ACCOUNT_STATUS_CONFIG: Record<ActiveStatus, UserStatusConfig> = {
  active: {
    labelEn: 'Active',
    labelAr: 'نشط',
    className: 'bg-success-50 text-success-500',
  },
  suspended: {
    labelEn: 'Suspended',
    labelAr: 'موقوف',
    className: 'bg-neutral-50 text-neutral-400',
  },
};

export const KYC_STATUS_CONFIG: Record<KycStatus, UserStatusConfig> = {
  [KycStatusEnum.PENDING]: {
    labelEn: 'Pending',
    labelAr: 'قيد الانتظار',
    className: 'bg-accent-50 text-accent-600',
  },
  [KycStatusEnum.VERIFIED]: {
    labelEn: 'Verified',
    labelAr: 'موثق',
    className: 'bg-success-50 text-success-500',
  },
  [KycStatusEnum.REJECTED]: {
    labelEn: 'Rejected',
    labelAr: 'مرفوض',
    className: 'bg-error-50 text-error-500',
  },
};

export const ACCOUNT_AVATAR_CONFIG: Record<ActiveStatus, string> = {
  active: 'bg-primary-500 text-primary-50',
  suspended: 'bg-neutral-200 text-neutral-500',
};
