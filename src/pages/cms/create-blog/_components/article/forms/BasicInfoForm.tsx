import { useFormContext } from 'react-hook-form';
import { z } from 'zod';
import {
  CustomInput,
  CustomTextarea,
} from '@/components/forms';
import { CustomImageUploader } from '@/components/shared/customs';

// Basic Info Validation Schema (Mandatory)
export const basicInfoSchema = z.object({
  title: z
    .string()
    .min(1, 'Blog title is required')
    .min(5, 'Blog title must be at least 5 characters')
    .max(200, 'Blog title must not exceed 200 characters'),

  description: z
    .string()
    .min(1, 'Blog description is required')
    .min(10, 'Blog description must be at least 10 characters')
    .max(1000, 'Blog description must not exceed 1000 characters'),

  coverImage: z
    .instanceof(File)
    .nullable()
    .refine((file) => !file || file.size <= 1024 * 1024, {
      message: 'Cover image must be less than 1MB',
    })
    .refine(
      (file) => !file || ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      {
        message: 'Cover image must be JPEG, PNG, or WebP format',
      }
    ),

  coverPreview: z.string().nullable(),
});

// Basic Info Default Values
export const basicInfoDefaultValues = {
  title: '',
  description: '',
  coverImage: null,
  coverPreview: null,
};

export type BasicInfoFormValues = z.infer<typeof basicInfoSchema>;

function BasicInfoForm() {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col gap-5 pb-4 border-b border-neutral-50">
      <h2 className="text-xl font-bold text-gray-900">
        Basic Information
      </h2>

      <CustomInput
        control={control}
        label="Blog Title *"
        name="title"
        placeholder="Ee.g. Beginner's Guide to Gold Investment"
      />

      <CustomTextarea
        control={control}
        label="Blog Description *"
        name="description"
        placeholder="Write a short summary that explains what users will learn from this article...."
      />

      <CustomImageUploader
        acceptedTypes={['image/jpeg', 'image/png', 'image/webp']}
        control={control}
        maxSizeMB={1}
        name="coverImage"
      />
    </div>
  );
}

export default BasicInfoForm;
