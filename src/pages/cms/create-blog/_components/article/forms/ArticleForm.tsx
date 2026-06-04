import { z } from 'zod';
import CustomInput, { CustomTextarea } from '@/components/forms';
import { CustomImageUploader } from '@/components/shared/customs';
import BlogIcons from '@/components/shared/icons/blog-icons/BlogIcons';
import { Button } from '@/components/ui/button';

// Article Section Validation Schema (Optional)
export const articleSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.instanceof(File).nullable(),
  imagePreview: z.string().nullable(),
  isExpanded: z.boolean(),
});

// Article Section Default Values
export const articleSectionDefaultValues = {
  title: '',
  description: '',
  image: null,
  imagePreview: null,
  isExpanded: true,
};

// Helper function to create a new section
export const createNewSection = (index: number) => ({
  id: `section-${Date.now()}-${index}`,
  title: '',
  description: '',
  image: null,
  imagePreview: null,
  isExpanded: true,
});

export type ArticleSectionFormValues = z.infer<typeof articleSectionSchema>;

type ArticleFormProps = {
  control: any;
  index: number;
  onToggle: () => void;
};

const ArticleForm = ({ control, index, onToggle }: ArticleFormProps) => {
  return (
    <div className='flex flex-col gap-5 px-2 py-5'>
      <CustomInput
        control={control}
        label='Title'
        name={`sections.${index}.title`}
        placeholder='e.g. Why Invest in Gold?'
      />

      <CustomTextarea
        control={control}
        label='Description'
        name={`sections.${index}.description`}
        placeholder='e.g. Gold is considered a stable asset during economic uncertainty...'
      />

      <CustomImageUploader
        acceptedTypes={['image/jpeg', 'image/png', 'image/webp']}
        control={control}
        maxSizeMB={1}
        name={`sections.${index}.image`}
      />

      <div className='flex justify-center'>
        <Button
          type='button'
          variant='ghost'
          size='icon-sm'
          className='text-muted-foreground'
          aria-label='Collapse section'
          onClick={onToggle}
        >
          <BlogIcons name='ArrowUp' />
        </Button>
      </div>
    </div>
  );
};

export default ArticleForm;
