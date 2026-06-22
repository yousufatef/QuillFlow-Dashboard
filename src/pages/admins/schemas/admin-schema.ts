import { z } from 'zod';
import type { TFunction } from 'i18next';
const egyptPhoneRegex = /^(010|011|012|015)[0-9]{8}$/;
export const createAdminSchema = (t: TFunction) =>
  z.object({
    fullName: z
      .string()
      .min(1, t('forms.errors.fullname.required'))
      .min(2, t('forms.errors.fullname.min'))
      .max(100, t('forms.errors.fullname.max')),

    email: z.email(t('forms.errors.email.invalid')),

    phoneNumber: z
      .string()
      .min(1, t('forms.errors.phone.required'))
      .min(11, t('forms.errors.phone.min'))
      .regex(egyptPhoneRegex, t('forms.errors.phone.invalid')),

    roleId: z.string().min(1, t('forms.errors.role.required')),
  });

export type AdminFormValues = z.infer<ReturnType<typeof createAdminSchema>>;
