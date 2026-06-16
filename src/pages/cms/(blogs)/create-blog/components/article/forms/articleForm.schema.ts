import {
  descriptionEnSchema,
  titleEnSchema,
  titleArSchema,
  descriptionArSchema,
  nullableImageFileSchema,
} from '@/utils/schemas';
import { z } from 'zod';
import type { TFunction } from 'i18next';

export const articleSectionSchema = z.object({
  id: z.string(),
  titleEn: titleEnSchema,
  titleAr: titleArSchema,
  descriptionEn: descriptionEnSchema,
  descriptionAr: descriptionArSchema,
  image: nullableImageFileSchema,
  imagePreview: z.string().nullable(),
  isExpanded: z.boolean(),
});

export type ArticleSectionFormValues = z.infer<typeof articleSectionSchema>;

export const getBasicInfoSchema = (t: TFunction, _isEditMode: boolean = false) => {
  const coverImageRequiredMessage = t('forms.cover');

  return z
    .object({
      titleEn: titleEnSchema,

      titleAr: titleArSchema,

      descriptionEn: descriptionEnSchema,

      descriptionAr: descriptionArSchema,

      coverImage: nullableImageFileSchema,

      coverPreview: z.string().nullable().optional(),

      readTime: z.number().optional(),
    })
    .superRefine((data, ctx) => {
      if (!data.coverImage && !data.coverPreview) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: coverImageRequiredMessage,
          path: ['coverImage'],
        });
      }
    });
};

// Note: basicInfoSchema should be created dynamically with translation function
// For backwards compatibility, keeping a default export but it's recommended to use getBasicInfoSchema with t function
// Using a simple passthrough that returns the key as-is for backwards compatibility
export const basicInfoSchema = getBasicInfoSchema(((key: string) => key) as TFunction, false);

export type BasicInfoFormValues = z.infer<ReturnType<typeof getBasicInfoSchema>>;
