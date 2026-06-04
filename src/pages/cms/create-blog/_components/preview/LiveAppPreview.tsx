import { useFormContext, useWatch } from 'react-hook-form';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { BlogFormState } from '@/types/blog.types';
import { PhoneStatusBar } from './PhoneStatusBar';
import { SectionPreview } from './SectionPreview';
import { useObjectUrl } from '@/hooks/blogs/useObjectUrl';

const PLACEHOLDER_TITLE = 'Your blog title';
const PLACEHOLDER_DESCRIPTION =
  'Your blog description will appear here as you type.';

function isEmptyState(state: BlogFormState, coverUrl: string | null): boolean {
  const hasBasic =
    state.title.trim() !== '' ||
    state.description.trim() !== '' ||
    coverUrl !== null;

  const hasSections = state.sections.some(
    (section) =>
      section.title.trim() !== '' ||
      section.description.trim() !== '' ||
      section.image !== null,
  );

  return !hasBasic && !hasSections;
}

function LiveAppPreview() {
  const { control, watch } = useFormContext<BlogFormState>();
  const state = watch();
  const coverFile = useWatch({ control, name: 'coverImage' });
  const coverFromFile = useObjectUrl(coverFile);
  const coverUrl = state.coverPreview ?? coverFromFile;

  const empty = isEmptyState(state, coverUrl);
  const hasTitle = state.title.trim() !== '';
  const hasDescription = state.description.trim() !== '';

  return (
    <Card className="flex h-full min-h-0 flex-col gap-0 p-0!">
      <CardContent className="flex min-h-0 flex-1 flex-col gap-6 sm:p-2 md:p-4 2xl:p-6">
        <div className="flex shrink-0 flex-col gap-2 text-center">
          <h2 className="type-heading-sm font-semibold text-foreground">
            Live App Preview
          </h2>
          <p className="type-body-sm text-muted-foreground">
            Preview how this blog will appear to users.
          </p>
        </div>

        <div className="mx-auto flex max-w-65 flex-1 flex-col justify-center">
          <div className="flex max-h-[min(540px,calc(100svh-17rem))] flex-col overflow-hidden rounded-[32px] border-10 border-neutral-900 bg-background shadow-lg">
            <PhoneStatusBar />

            <div className="no-scrollbar h-100 w-60 overflow-y-auto overscroll-contain bg-[#F9F9F9]">
              {empty ? (
                <div className="flex h-full min-h-75 flex-col items-center justify-center gap-2 px-6 text-center">
                  <p className="type-body-sm font-medium text-foreground">
                    Blog Content
                  </p>
                  <p className="type-body-xs text-muted-foreground">
                    Your blog preview will appear here
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3 px-4 py-4">
                  <div className="flex flex-col gap-1">
                    <h3
                      className={cn(
                        'type-body-sm-semibold text-neutral-900',
                        !hasTitle && 'text-muted-foreground',
                      )}
                    >
                      {state.title.trim() || PLACEHOLDER_TITLE}
                    </h3>

                    <p
                      className={cn(
                        'type-body-xs text-neutral-900',
                        !hasDescription && 'text-muted-foreground',
                      )}
                    >
                      {state.description.trim() || PLACEHOLDER_DESCRIPTION}
                    </p>

                    {coverUrl && (
                      <img
                        src={coverUrl}
                        alt=""
                        className="aspect-video w-full object-cover mt-2"
                      />
                    )}
                  </div>

                  {state.sections.map((section) => (
                    <SectionPreview key={section.id} section={section} />
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