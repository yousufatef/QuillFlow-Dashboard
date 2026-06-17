// eslint-disable-next-line simple-import-sort/imports
import CustomInput, { CustomTextarea } from '@/components/forms';
import { CustomImageUploader } from '@/components/shared/customs';
import BlogIcons from '@/components/shared/icons/blog-icons/BlogIcons';
import { Button } from '@/components/ui/button';
import type { ArticleFormProps } from '@/pages/cms/blogs/types/blog.types';
import { useTranslation } from 'react-i18next';


// ARTICLE SECTION FORM COMPONENT
const ArticleForm = ({ control, index, onToggle }: ArticleFormProps) => {
  const { t } = useTranslation()
  return (
    <div className='flex flex-col gap-5 px-2 py-5'>
      <div className='flex items-start gap-4'>
        <CustomInput
          control={control}
          label={t("forms.labels.blog_title_en")}
          name={`sections.${index}.titleEn`}
          placeholder='e.g. Why Invest in Gold?'

        />
        <CustomInput
          control={control}
          label={t("forms.labels.blog_title_ar")}
          name={`sections.${index}.titleAr`}
          placeholder='مثال. دليل المبتدئين للاستثمار في الذهب'
        />
      </div>

      <div className='flex items-start gap-4'>
        <CustomTextarea
          control={control}
          label={t("forms.labels.blog_description_en")}
          name={`sections.${index}.descriptionEn`}
          placeholder='e.g. Gold is considered a stable asset during economic uncertainty...'
          trimValue={false}
          className="max-h-40"
        />
        <CustomTextarea
          control={control}
          label={t("forms.labels.blog_description_ar")}
          name={`sections.${index}.descriptionAr`}
          placeholder='اكتب ملخصًا قصيرًا يوضح ما سيتعلمه المستخدمون من هذا المقال.'
          trimValue={false}
          className="max-h-40"
        />
      </div>

      <CustomImageUploader
        control={control}
        name={`sections.${index}.image`}
        previewFieldName={`sections.${index}.imagePreview`}
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
