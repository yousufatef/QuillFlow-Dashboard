import { z } from 'zod';
import type { TFunction } from 'i18next';

export const createAdminSchema = (t: TFunction) =>
  z.object({
    username: z
      .string()
      .min(1, t('forms.errors.fullname.required'))
      .min(2, t('forms.errors.fullname.min'))
      .max(100, t('forms.errors.fullname.max')),

    email: z.string().email(t('forms.errors.email.invalid')),

    password: z
      .string()
      .min(1, t('forms.errors.password.required'))
      .min(8, t('forms.errors.password.min')),

    roleId: z.string().min(1, t('forms.errors.role.required')),
  });

export const updateAdminSchema = (t: TFunction) =>
  z.object({
    username: z
      .string()
      .min(1, t('forms.errors.fullname.required'))
      .min(2, t('forms.errors.fullname.min'))
      .max(100, t('forms.errors.fullname.max')),

    email: z.string().email(t('forms.errors.email.invalid')),

    password: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 8, {
        message: t('forms.errors.password.min'),
      }),

    roleId: z.string().min(1, t('forms.errors.role.required')),
  });

export type AdminFormValues = z.infer<ReturnType<typeof createAdminSchema>>;
export type UpdateAdminFormValues = z.infer<ReturnType<typeof updateAdminSchema>>;
