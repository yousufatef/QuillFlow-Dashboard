import i18n from '@/i18n';
import { z } from 'zod';

export function getPasswordSchema() {
  const isEnglish = i18n.language === 'en';

  return z
    .string({
      message: isEnglish
        ? 'Password cannot be empty.'
        : 'كلمة المرور لا يمكن أن تكون فارغة.',
    })
    .regex(/^.{8,20}$/, {
      message: isEnglish
        ? 'Password must be between 8 and 20 characters.'
        : 'يجب أن تكون كلمة المرور بين 8 و 20 حرفًا.',
    })
    .regex(/(?=.*[A-Z])/, {
      message: isEnglish
        ? 'Password must contain at least one uppercase letter.'
        : 'يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل.',
    })
    .regex(/(?=.*[a-z])/, {
      message: isEnglish
        ? 'Password must contain at least one lowercase letter.'
        : 'يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل.',
    })
    .regex(/(?=.*\d)/, {
      message: isEnglish
        ? 'Password must contain at least one digit.'
        : 'يجب أن تحتوي كلمة المرور على رقم واحد على الأقل.',
    })
    .regex(/[$&+,:;=?@#|'<>.^*()%!-]/, {
      message: isEnglish
        ? 'Password must contain at least one special character.'
        : 'يجب أن تحتوي كلمة المرور على رمز خاص واحد على الأقل.',
    });
}

// Deprecated: use getPasswordSchema() instead
export const passwordSchema = getPasswordSchema();

export const noLeadingSpacesSchema = z
  .string()
  .refine((val) => val.trim().length > 0, {
    message: 'Input cannot be empty or start with spaces',
  });

export const noNumbersSchema = z.string().refine((val) => !/\d/.test(val), {
  message: 'Input cannot contain numbers',
});
