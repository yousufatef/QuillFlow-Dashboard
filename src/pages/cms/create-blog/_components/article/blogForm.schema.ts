import { z } from 'zod';
import { articleSectionSchema } from './forms/ArticleForm';
import { basicInfoDefaultValues, basicInfoSchema } from './forms/BasicInfoForm';

// Combined Blog Form Schema
export const blogFormSchema = z.object({
    ...basicInfoSchema.shape,
    sections: z.array(articleSectionSchema),
});

export type BlogFormSchema = z.infer<typeof blogFormSchema>;

// Combined Default Values
export const blogFormDefaultValues: BlogFormSchema = {
    ...basicInfoDefaultValues,
    sections: [],
};

// Re-export helper function
export { createNewSection } from './forms/ArticleForm';
