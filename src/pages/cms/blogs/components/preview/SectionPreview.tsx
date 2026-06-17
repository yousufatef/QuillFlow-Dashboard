import { cn } from '@/lib/utils';
import type { BlogFormState } from '@/pages/cms/blogs/types/blog.types';
import { useObjectUrl } from '@/pages/cms/blogs/hooks/useObjectUrl';

// const PLACEHOLDER_SECTION_TITLE = 'Section title';
// const PLACEHOLDER_SECTION_DESCRIPTION = 'Section description';

type SectionPreviewProps = {
  section: BlogFormState['sections'][number];
  isEnglish: boolean;
};

export function SectionPreview({ section, isEnglish }: SectionPreviewProps) {
  const imageUrl = useObjectUrl(section.image) ?? section.imagePreview;
  const title = isEnglish ? section.titleEn : section.titleAr;
  const description = isEnglish ? section.descriptionEn : section.descriptionAr;
  const hasSectionTitle = title.trim() !== '';
  const hasSectionDescription = description.trim() !== '';

  return (
    <article className='flex flex-col gap-3'>
      <h4
        className={cn(
          'text-foreground text-[15px] leading-snug font-bold overflow-hidden',
          !hasSectionTitle && 'text-muted-foreground',
        )}
      >
        {hasSectionTitle ? title : ''}
        {/* {hasSectionTitle ? title : PLACEHOLDER_SECTION_TITLE} */}
      </h4>

      <p
        className={cn(
          'text-foreground text-[13px] leading-[1.45] whitespace-pre-line overflow-hidden',
          !hasSectionDescription && 'text-muted-foreground',
        )}
      >
        {hasSectionDescription ? description : ''}
        {/* {hasSectionDescription ? description : PLACEHOLDER_SECTION_DESCRIPTION} */}
      </p>

      {imageUrl && (
        <img
          src={imageUrl}
          alt=''
          className='aspect-video w-full rounded-lg object-cover'
        />
      )}
    </article>
  );
}
