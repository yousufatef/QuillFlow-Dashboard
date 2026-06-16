import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import LiveAppPreview from './components/preview/LiveAppPreview';
import {
  getBlogFormSchema,
  blogFormDefaultValues,
  type BlogFormSchema,
} from './components/article/blogForm.schema';
import { getBasicInfoSchema } from './components/article/forms/articleForm.schema';
import ArticleList from './components/article/ArticleList';
import { usePublishBlog } from '@/hooks/blogs/usePublishBlog';
import { useDraftBlog } from '@/hooks/blogs/useDraftBlog';
import PageLayout from '@/components/layout/PageLayout';
import BasicInfoForm from './components/article/forms/BasicInfoForm';
import { calculateArticleStats } from '@/utils/articleStats';
import { useTranslation } from 'react-i18next';

function CreateBlogPage() {
  const { t } = useTranslation();
  const { publishBlog, isLoading: isPublishing } = usePublishBlog(() => form.reset());
  const { draftBlog, isLoading: isDrafting } = useDraftBlog();

  const draftRequiredFields: (keyof BlogFormSchema)[] = [
    'titleEn',
    'titleAr',
    'descriptionEn',
    'descriptionAr',
    'coverImage',
  ];

  const form = useForm<BlogFormSchema>({
    resolver: zodResolver(getBlogFormSchema(t, false)),
    defaultValues: blogFormDefaultValues,
    mode: 'onTouched',
  });

  const handleSaveAsDraft = async () => {
    form.clearErrors([...draftRequiredFields, 'sections']);
    const basicInfoSchema = getBasicInfoSchema(t, false);
    const basicInfoResult = basicInfoSchema.safeParse(form.getValues());

    if (!basicInfoResult.success) {
      basicInfoResult.error.issues.forEach((issue) => {
        const fieldName = issue.path.join('.') as keyof BlogFormSchema;
        form.setError(fieldName, { type: issue.code, message: issue.message });
      });

      const firstInvalidField = basicInfoResult.error.issues[0]?.path.join('.') as
        | keyof BlogFormSchema
        | undefined;

      if (firstInvalidField) form.setFocus(firstInvalidField);
      return;
    }

    const values = form.getValues();
    const { readTime } = calculateArticleStats(values);
    await draftBlog({ ...values, readTime });
  };

  const handlePublish = async (data: BlogFormSchema) => {
    const { readTime } = calculateArticleStats(data);
    await publishBlog({ ...data, readTime });
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handlePublish, (errors) => {
          console.log('Validation errors:', errors);
        })}
        className="flex h-full flex-col bg-background"
      >
        <PageLayout
          mode="form"
          title={t('pages.blogs.blog_details')}
          subtitle={t('pages.blogs.blog_details_subtitle')}
          primaryLabel={t('pages.blogs.publish')}
          secondaryLabel={t('pages.blogs.save_draft')}
          onBack={() => window.history.back()}
          showSecondaryButton
          onSecondaryClick={handleSaveAsDraft}
          isPrimaryLoading={isPublishing}
          isSecondaryLoading={isDrafting}
          wrapperClassName="h-full overflow-hidden"
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_400px] pt-6">
            <Card className="border border-neutral-50 p-0 bg-white">
              <CardContent className="flex flex-col gap-0 p-4">
                <BasicInfoForm />
                <ArticleList />
              </CardContent>
            </Card>

            <aside className="hidden lg:block">
              <div className="rounded-[8px] border border-neutral-50">
                <LiveAppPreview />
              </div>
            </aside>
          </div>
        </PageLayout>
      </form>
    </FormProvider>
  );
}

export default CreateBlogPage;