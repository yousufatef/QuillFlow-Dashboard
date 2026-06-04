import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent } from '@/components/ui/card';
import ArticleSectionList from './_components/article/ArticleList';
import LiveAppPreview from './_components/preview/LiveAppPreview';
import FormHeader from '@/components/layout/FormHeader';
import { blogFormSchema, blogFormDefaultValues, type BlogFormSchema } from './_components/article/blogForm.schema';
import BasicInfoForm from './_components/article/forms/BasicInfoForm';



function CreateBlogPage() {
  const form = useForm<BlogFormSchema>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: blogFormDefaultValues,
    mode: 'onSubmit',
  });

  // Handle Save as Draft
  const handleSaveAsDraft = () => {
    const formData = form.getValues();
    console.log('Save as Draft:', formData);
  };

  // Handle Publish with validation
  const handlePublish = (data: BlogFormSchema) => {
    console.log('Publish:', data);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handlePublish, (errors) => {
          console.log('Validation errors:', errors);
        })}
        className="fixed inset-0 flex flex-col bg-neutral-50"
        style={{
          left: 'var(--sidebar-width, 220px)',
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 1
        }}
      >
        {/* Fixed Header - Original Style */}
        <div className="shrink-0 bg-neutral-50 px-4 md:px-6 pt-6">
          <FormHeader
            title="Blog Details"
            subtitle="Create blog content and preview how it will appear in the QuillFlow app."
            primaryLabel="Publish"
            showSecondaryButton
            secondaryLabel="Save as Draft"
            onBack={() => window.history.back()}
            onSecondaryClick={handleSaveAsDraft}
          />
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-hidden px-4 md:px-6">
          <div className="h-full grid lg:grid-cols-[minmax(0,1fr)_400px] gap-6 py-6">
            {/* Scrollable Form Area */}
            <div className="no-scrollbar overflow-y-auto overflow-x-hidden pr-2">
              <Card className="border border-gray-50 p-0">
                <CardContent className="flex flex-col gap-0 p-4">
                  <BasicInfoForm />
                  <ArticleSectionList />
                </CardContent>
              </Card>
            </div>

            {/* Fixed Preview Area */}
            <aside className="hidden lg:block overflow-y-auto">
              <div className="sticky top-0">
                <div className="rounded-[8px] border border-gray-50">
                  <LiveAppPreview />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

export default CreateBlogPage;
