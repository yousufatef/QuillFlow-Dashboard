import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { getBlogFormDefaultValues, getBlogFormSchema, type BlogFormSchema } from '../create-blog/components/article/blogForm.schema';
import LiveAppPreview from '../create-blog/components/preview/LiveAppPreview';
import ArticleList from '../create-blog/components/article/ArticleList';
import PageLayout from '@/components/layout/PageLayout';
import BasicInfoForm from '../create-blog/components/article/forms/BasicInfoForm';
import { useTranslation } from 'react-i18next';
import { useGetBlog } from '@/hooks/blogs/useGetBlog';
import LoadingError from '@/components/shared/error/LoadingError';
import MainLoader from '@/components/shared/loader/MainLoader';
import { useUpdateBlog } from '@/hooks/blogs/useUpdateBlog';



function EditBlogPage() {
  const { blogId } = useParams<{ blogId: string }>();
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { data: blogData, isLoading, isError, refetch } = useGetBlog(blogId);
  const { updateBlog, isLoading: updateLoading } = useUpdateBlog(() => form.reset())

  const isEditMode = !!blogData;

  const form = useForm<BlogFormSchema>({
    resolver: zodResolver(getBlogFormSchema(t, isEditMode)),
    defaultValues: getBlogFormDefaultValues(blogData),
    mode: 'onSubmit',
  });

  // Update form when blog data loads
  useEffect(() => {
    if (blogData) {
      const formValues = getBlogFormDefaultValues(blogData);
      form.reset(formValues);
    }
  }, [blogData, form]);

  // Conditional returns AFTER all hooks
  if (isLoading) return <MainLoader />;
  if (isError) return <LoadingError onRefetch={refetch} />;

  // Handle Publish with validation
  const handleSave = async (data: BlogFormSchema) => {
    await updateBlog({ ...data, id: blogData.id, isPublished: blogData.isPublished });
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleSave, (errors) => {
          console.log('Validation errors:', errors);
        })}
        className="flex h-full flex-col bg-background"
        style={{
          left: 'var(--sidebar-width, 220px)',
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
        }}
      >
        <PageLayout
          mode='form'
          title={t("pages.blogs.blog_details")}
          subtitle={t("pages.blogs.edit_blog_subtitle")}
          primaryLabel={t("pages.blogs.save")}
          isPrimaryLoading={updateLoading}
          secondaryLabel={t("pages.blogs.cancel")}

          onBack={() => window.history.back()}
          showSecondaryButton
          onSecondaryClick={() => navigate(-1)}
          wrapperClassName="h-full overflow-hidden"
        >

          {/* Scrollable Content Area */}
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_400px] pt-6">
            {/* Scrollable Form Area */}
            <Card className="border border-neutral-50 p-0 bg-white">
              <CardContent className='flex flex-col gap-0 p-4'>
                <BasicInfoForm blogData={blogData} />
                <ArticleList />
              </CardContent>
            </Card>

            {/* Scrollable Preview Area */}
            <aside className="hidden lg:block">
              <div className='rounded-[8px] border border-neutral-50'>
                <LiveAppPreview />
              </div>
            </aside>
          </div>
        </PageLayout>
      </form>
    </FormProvider>
  );
}

export default EditBlogPage;
