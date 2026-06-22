import {
  ARABIC_TEXT_REGEX,
  ENGLISH_TEXT_REGEX,
  MAX_DESCRIPTION_LENGTH,
  MAX_IMAGE_FILE_SIZE_BYTES,
  MAX_IMAGE_FILE_SIZE_MB,
  MIN_DESCRIPTION_LENGTH,
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  ONLY_NUMBERS_REGEX,
} from '@/constants';
import { z } from 'zod';
import { getCurrLocale } from '@/utils/language';

// ─── Shared text helpers ──────────────────────────────────────────────────────

type TextFieldLimits = {
  min?: number;
  max?: number;
};

const isAr = () => getCurrLocale() === 'ar';

/** Trims edges and collapses repeated internal spaces while preserving line breaks. */
export function normalizeText(value: string): string {
  return value
    .split('\n')
    .map(line => line.replace(/ {2,}/g, ' ').trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n'); // Limit to max 2 consecutive line breaks
}

function addTextValidationIssues(
  value: string,
  locale: 'en' | 'ar',
  min: number,
  max: number,
  ctx: z.RefinementCtx,
) {
  const charsetRegex = locale === 'en' ? ENGLISH_TEXT_REGEX : ARABIC_TEXT_REGEX;

  if (!charsetRegex.test(value)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message:
        locale === 'en'
          ? isAr()
            ? 'يجب أن يحتوي الحقل على أحرف إنجليزية فقط.'
            : 'Field must contain English characters only.'
          : isAr()
            ? 'يجب أن يحتوي الحقل على أحرف عربية فقط.'
            : 'Field must contain Arabic characters only.',
    });
  }

  if (ONLY_NUMBERS_REGEX.test(value)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: isAr()
        ? 'لا يمكن أن يحتوي الحقل على أرقام فقط.'
        : 'Field cannot contain only numbers.',
    });
  }

  if (value.length < min) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: isAr()
        ? `يجب أن يكون الحقل ${min} أحرف على الأقل.`
        : `Field must be at least ${min} characters.`,
    });
  }

  if (value.length > max) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: isAr()
        ? `يجب ألا يتجاوز الحقل ${max} حرفًا.`
        : `Field must not exceed ${max} characters.`,
    });
  }
}

function buildTextSchema(locale: 'en' | 'ar', options?: TextFieldLimits) {
  const min = options?.min ?? 1;
  const max = options?.max ?? 255;

  return z
    .string({
      error: () => ({
        message: isAr() ? 'الحقل مطلوب.' : 'Field is required.',
      }),
    })
    .transform(normalizeText)
    .pipe(
      z.string().superRefine((value, ctx) => {
        if (value.length === 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: isAr() ? 'الحقل مطلوب.' : 'Field is required.',
          });
          return;
        }

        addTextValidationIssues(value, locale, min, max, ctx);
      }),
    );
}

function buildOptionalTextSchema(locale: 'en' | 'ar', options?: TextFieldLimits) {
  const min = options?.min ?? 1;
  const max = options?.max ?? 255;

  return z
    .string()
    .transform(normalizeText)
    .pipe(
      z.union([
        z.literal(''),
        z.string().superRefine((value, ctx) => {
          addTextValidationIssues(value, locale, min, max, ctx);
        }),
      ]),
    );
}

// ─── Bilingual title / description schemas ────────────────────────────────────

function getEnglishTextSchema(options?: TextFieldLimits) {
  return buildTextSchema('en', options);
}

function getArabicTextSchema(options?: TextFieldLimits) {
  return buildTextSchema('ar', options);
}

function getOptionalEnglishTextSchema(options?: TextFieldLimits) {
  return buildOptionalTextSchema('en', options);
}

function getOptionalArabicTextSchema(options?: TextFieldLimits) {
  return buildOptionalTextSchema('ar', options);
}

function getTitleEnSchema(options?: TextFieldLimits) {
  return getEnglishTextSchema({ min: MIN_TITLE_LENGTH, max: MAX_TITLE_LENGTH, ...options });
}

function getTitleArSchema(options?: TextFieldLimits) {
  return getArabicTextSchema({ min: MIN_TITLE_LENGTH, max: MAX_TITLE_LENGTH, ...options });
}

function getOptionalTitleEnSchema(options?: TextFieldLimits) {
  return getOptionalEnglishTextSchema({
    min: MIN_TITLE_LENGTH,
    max: MAX_TITLE_LENGTH,
    ...options,
  });
}

function getOptionalTitleArSchema(options?: TextFieldLimits) {
  return getOptionalArabicTextSchema({
    min: MIN_TITLE_LENGTH,
    max: MAX_TITLE_LENGTH,
    ...options,
  });
}

function getDescriptionEnSchema(options?: TextFieldLimits) {
  return getEnglishTextSchema({
    min: MIN_DESCRIPTION_LENGTH,
    max: MAX_DESCRIPTION_LENGTH,
    ...options,
  });
}

function getDescriptionArSchema(options?: TextFieldLimits) {
  return getArabicTextSchema({
    min: MIN_DESCRIPTION_LENGTH,
    max: MAX_DESCRIPTION_LENGTH,
    ...options,
  });
}

function getOptionalDescriptionEnSchema(options?: TextFieldLimits) {
  return getOptionalEnglishTextSchema({
    min: MIN_DESCRIPTION_LENGTH,
    max: MAX_DESCRIPTION_LENGTH,
    ...options,
  });
}

function getOptionalDescriptionArSchema(options?: TextFieldLimits) {
  return getOptionalArabicTextSchema({
    min: MIN_DESCRIPTION_LENGTH,
    max: MAX_DESCRIPTION_LENGTH,
    ...options,
  });
}

export const titleEnSchema = getTitleEnSchema();
export const titleArSchema = getTitleArSchema();
export const descriptionEnSchema = getDescriptionEnSchema();
export const descriptionArSchema = getDescriptionArSchema();
export const optionalTitleEnSchema = getOptionalTitleEnSchema();
export const optionalTitleArSchema = getOptionalTitleArSchema();
export const optionalDescriptionEnSchema = getOptionalDescriptionEnSchema();
export const optionalDescriptionArSchema = getOptionalDescriptionArSchema();

// ─── Password ─────────────────────────────────────────────────────────────────

export function getPasswordSchema() {
  return z
    .string({
      error: () => ({
        message: isAr() ? 'كلمة المرور لا يمكن أن تكون فارغة.' : 'Password cannot be empty.',
      }),
    })
    .superRefine((value, ctx) => {
      if (!/^.{8,20}$/.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: isAr()
            ? 'يجب أن تكون كلمة المرور بين 8 و 20 حرفًا.'
            : 'Password must be between 8 and 20 characters.',
        });
      }

      if (!/(?=.*[A-Z])/.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: isAr()
            ? 'يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل.'
            : 'Password must contain at least one uppercase letter.',
        });
      }

      if (!/(?=.*[a-z])/.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: isAr()
            ? 'يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل.'
            : 'Password must contain at least one lowercase letter.',
        });
      }

      if (!/(?=.*\d)/.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: isAr()
            ? 'يجب أن تحتوي كلمة المرور على رقم واحد على الأقل.'
            : 'Password must contain at least one digit.',
        });
      }

      if (!/[$&+,:;=?@#|'<>.^*()%!-]/.test(value)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: isAr()
            ? 'يجب أن تحتوي كلمة المرور على رمز خاص واحد على الأقل.'
            : 'Password must contain at least one special character.',
        });
      }
    });
}

export const passwordSchema = getPasswordSchema();

// ─── Image file upload ────────────────────────────────────────────────────────

const IMAGE_FILE_SIGNATURES = {
  gif: [0x47, 0x49, 0x46],
  jpg: [0xff, 0xd8, 0xff],
  png: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
  webp: [0x52, 0x49, 0x46, 0x46],
} as const;

const hasBytesAtOffset = (bytes: Uint8Array, signature: readonly number[], offset = 0) =>
  signature.every((byte, index) => bytes[index + offset] === byte);

export async function isAcceptedImageFile(file: File): Promise<boolean> {
  const buffer = await file.slice(0, 12).arrayBuffer();
  const bytes = new Uint8Array(buffer);

  return (
    hasBytesAtOffset(bytes, IMAGE_FILE_SIGNATURES.png) ||
    hasBytesAtOffset(bytes, IMAGE_FILE_SIGNATURES.jpg) ||
    hasBytesAtOffset(bytes, IMAGE_FILE_SIGNATURES.gif) ||
    (hasBytesAtOffset(bytes, IMAGE_FILE_SIGNATURES.webp) &&
      hasBytesAtOffset(bytes, [0x57, 0x45, 0x42, 0x50], 8))
  );
}

export function getImageFileTypeErrorMessage(): string {
  return isAr()
    ? 'يجب أن يكون الملف بصيغة JPG أو PNG أو GIF أو WEBP.'
    : 'File must be JPG, PNG, GIF, or WEBP format.';
}

export function getImageFileSizeErrorMessage(): string {
  return isAr()
    ? `يجب ألا يتجاوز حجم الملف ${MAX_IMAGE_FILE_SIZE_MB} ميجابايت.`
    : `File must not exceed ${MAX_IMAGE_FILE_SIZE_MB}MB.`;
}

async function addImageFileValidationIssues(file: File, ctx: z.RefinementCtx) {
  if (!(await isAcceptedImageFile(file))) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: getImageFileTypeErrorMessage(),
    });
  }

  if (file.size > MAX_IMAGE_FILE_SIZE_BYTES) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: getImageFileSizeErrorMessage(),
    });
  }
}

export function getImageFileSchema() {
  return z
    .instanceof(File, {
      error: () => ({
        message: isAr() ? 'الحقل مطلوب.' : 'Field is required.',
      }),
    })
    .superRefine(async (file, ctx) => {
      await addImageFileValidationIssues(file, ctx);
    });
}

export function getNullableImageFileSchema() {
  return z
    .union([z.instanceof(File), z.null()])
    .superRefine(async (file, ctx) => {
      if (!file) return;

      await addImageFileValidationIssues(file, ctx);
    });
}

export const imageFileSchema = getImageFileSchema();
export const nullableImageFileSchema = getNullableImageFileSchema();

export const noLeadingSpacesSchema = z.string().refine((val) => val.trim().length > 0, {
  message: 'Input cannot be empty or start with spaces',
});

export const noNumbersSchema = z.string().refine((val) => !/\d/.test(val), {
  message: 'Input cannot contain numbers',
});
