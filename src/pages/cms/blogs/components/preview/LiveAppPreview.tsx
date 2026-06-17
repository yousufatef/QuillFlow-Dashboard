import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { BlogFormState } from '@/pages/cms/blogs/types/blog.types';
import { PhoneStatusBar } from './PhoneStatusBar';
import { SectionPreview } from './SectionPreview';
import { useObjectUrl } from '@/pages/cms/blogs/hooks/useObjectUrl';


function isEmptyState(state: BlogFormState, coverUrl: string | null): boolean {
  const hasBasic =
    state.titleEn.trim() !== '' ||
    state.titleAr.trim() !== '' ||
    state.descriptionEn.trim() !== '' ||
    state.descriptionAr.trim() !== '' ||
    coverUrl !== null;

  const hasSections = state.sections.some(
    (section) =>
      section.titleEn.trim() !== '' ||
      section.titleAr.trim() !== '' ||
      section.descriptionEn.trim() !== '' ||
      section.descriptionAr.trim() !== '' ||
      section.image !== null,
  );

  return !hasBasic && !hasSections;
}

function LiveAppPreview() {

  const { i18n, t } = useTranslation();
  const isEnglish = i18n.language?.startsWith('en');
  // const PLACEHOLDER_TITLE = 'Your blog title';
  // const PLACEHOLDER_DESCRIPTION = 'Your blog description will appear here as you type.';
  const { control, watch } = useFormContext<BlogFormState>();
  const state = watch();
  const coverFile = useWatch({ control, name: 'coverImage' });
  const coverFromFile = useObjectUrl(coverFile);
  const coverUrl = state.coverPreview ?? coverFromFile;
  const title = isEnglish ? state.titleEn : state.titleAr;
  const description = isEnglish ? state.descriptionEn : state.descriptionAr;

  const empty = isEmptyState(state, coverUrl);
  const hasTitle = title.trim() !== '';
  const hasDescription = description.trim() !== '';

  return (
    <Card className='flex h-full min-h-0 flex-col gap-0 p-0!'>
      <CardContent className='flex min-h-0 flex-1 flex-col gap-6 sm:p-2 md:p-4 2xl:p-6'>
        <div className='flex shrink-0 flex-col gap-2 text-center'>
          <h2 className='type-heading-sm text-foreground font-semibold'>{t("pages.blogs.live_preview")}</h2>
          <p className='type-body-sm text-muted-foreground'>
            {t("pages.blogs.live_preview_subtitle")}
          </p>
        </div>

        <div className='mx-auto flex max-w-65 flex-1 flex-col justify-center'>
          <div className='bg-background flex max-h-137.5 flex-col overflow-hidden rounded-[32px] border-10 border-neutral-900 shadow-lg'>
            <PhoneStatusBar />

            <div className='no-scrollbar h-117.5 w-60 overflow-y-auto overscroll-contain bg-[#F9F9F9]'>
              {empty ? (
                <div className='flex h-full min-h-75 flex-col items-center justify-center gap-2 px-6 text-center'>
                  <p className='type-body-sm text-foreground font-medium'>{t("forms.fields.blog_content")}</p>
                  <p className='type-body-xs text-muted-foreground'>
                    {t("forms.placeholders.blog_content_placeholder")}
                  </p>
                </div>
              ) : (
                <div className='flex flex-col gap-3 px-4 py-4'>
                  <div className='flex flex-col gap-1'>
                    <h3
                      className={cn(
                        'type-body-sm-semibold text-neutral-900 break-all',
                        !hasTitle && 'text-muted-foreground',
                      )}
                    >
                      {hasTitle ? title : ''}
                      {/* {hasTitle ? title : PLACEHOLDER_TITLE} */}
                    </h3>

                    <p
                      className={cn(
                        'type-body-xs text-neutral-900 whitespace-pre-line break-all',
                        !hasDescription && 'text-muted-foreground',
                      )}
                    >
                      {hasDescription ? description : ''}
                      {/* {hasDescription ? description : PLACEHOLDER_DESCRIPTION} */}
                    </p>

                    {coverUrl && (
                      <img
                        src={coverUrl}
                        alt=''
                        className='mt-2 aspect-video w-full object-cover rounded-lg'
                      />
                    )}
                  </div>

                  {state.sections.map((section) => (
                    <SectionPreview
                      key={section.id}
                      section={section}
                      isEnglish={isEnglish}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default LiveAppPreview;
