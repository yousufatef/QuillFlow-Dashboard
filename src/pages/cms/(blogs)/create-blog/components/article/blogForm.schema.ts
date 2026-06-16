import { z } from 'zod';
import { articleSectionDefaultValues, basicInfoDefaultValues } from './forms/articleForm.defaults';
import { articleSectionSchema, getBasicInfoSchema } from './forms/articleForm.schema';
import { MAX_BLOG_SECTIONS } from '@/constants/blogs.constants';
import type { TFunction } from 'i18next';

// Combined Blog Form Schema - Dynamic based on edit mode
export const getBlogFormSchema = (t: TFunction, isEditMode: boolean = false) => {
  const basicInfo = getBasicInfoSchema(t, isEditMode);

  return z
    .object({
      ...basicInfo.shape,
      sections: z
        .array(articleSectionSchema)
        .min(1, 'At least one article item is required')
        .max(MAX_BLOG_SECTIONS, `Maximum ${MAX_BLOG_SECTIONS} article sections are allowed`),
    })
    .superRefine((data, ctx) => {
      if (!data.coverImage && !data.coverPreview) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('forms.cover'),
          path: ['coverImage'],
        });
      }
    });
};

// Default schema for create mode - Note: For proper localization, use getBlogFormSchema with translation function
export const blogFormSchema = getBlogFormSchema(((key: string) => key) as TFunction, false);

export type BlogFormSchema = z.infer<typeof blogFormSchema>;

// Combined Default Values - with initial section
export const blogFormDefaultValues: BlogFormSchema = {
  ...basicInfoDefaultValues,
  sections: [
    {
      id: crypto.randomUUID(),
      ...articleSectionDefaultValues,
    },
  ],
};

// Helper to get default values with existing blog data
export const getBlogFormDefaultValues = (blogData?: any): BlogFormSchema => {
  if (!blogData) {
    return blogFormDefaultValues;
  }

  // Map articles from API to sections in the form
  const sections = blogData.articles?.map((article: any) => ({
    id: article.id ?? crypto.randomUUID(),
    titleEn: article.titleEn ?? '',
    titleAr: article.titleAr ?? '',
    descriptionEn: article.descriptionEn ?? '',
    descriptionAr: article.descriptionAr ?? '',
    image: null,
    imagePreview: article.coverImageUrl ?? null,
    isExpanded: true,
  })) ?? [{ id: crypto.randomUUID(), ...articleSectionDefaultValues }];

  return {
    titleEn: blogData.titleEn ?? blogData.title ?? '',
    titleAr: blogData.titleAr ?? '',
    descriptionEn: blogData.descriptionEn ?? blogData.description ?? '',
    descriptionAr: blogData.descriptionAr ?? '',
    coverImage: null,
    coverPreview: blogData.coverImageUrl ?? null,
    readTime: parseInt(blogData.readOfTime ?? blogData.readTime ?? '0', 10),
    sections,
  };
};

// Helper function to create a new section
export const createNewSection = (index: number) => ({
  id: `section-${Date.now()}-${index}`,
  ...articleSectionDefaultValues,
});

// Re-export helper function
