// ArticleSectionList.tsx (refactored)
import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { calculateArticleStats } from '@/utils/articleStats';
import type { BlogFormSchema } from './blogForm.schema';
import { useArticleSections } from '@/pages/cms/blogs/hooks/useArticleSections';
import { ArticleHeader } from './ArticleHeader';
import { ArticleStats } from './ArticleStats';
import ArticleCard from './ArticleCard';

function ArticleList() {
  const { watch, setValue } = useFormContext<BlogFormSchema>();

  const titleEn = watch('titleEn');
  const descriptionEn = watch('descriptionEn');
  const sections = watch('sections');

  // Serialize only English fields so useMemo detects any text change inside sections
  const sectionsEnKey = JSON.stringify(
    sections?.map((s) => ({ titleEn: s.titleEn, descriptionEn: s.descriptionEn })) ?? [],
  );

  const { readTime } = useMemo(
    () =>
      calculateArticleStats({
        titleEn,
        descriptionEn,
        sections,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [titleEn, descriptionEn, sectionsEnKey],
  );

  // Keep the form field in sync so buildBlogFormData picks up the live value
  useEffect(() => {
    setValue('readTime', readTime, { shouldDirty: false, shouldValidate: false });
  }, [readTime, setValue]);

  const {
    fields,
    sectionRefs,
    sectionsError,
    canAddSection,
    handleAddSection,
    handleToggle,
    handleMoveUp,
    handleMoveDown,
    handleDelete,
  } = useArticleSections();

  return (
    <div className='border-border flex flex-col gap-4 border-t pt-6'>
      <ArticleHeader
        onAddSection={handleAddSection}
        canAddSection={canAddSection}
        error={sectionsError}
      />

      <div className='flex flex-col gap-9'>
        {fields.map((field, index) => (
          <div
            key={field.fieldKey}
            ref={(node) => {
              sectionRefs.current[field.id] = node;
            }}
          >
            <ArticleCard
              index={index}
              total={fields.length}
              onMoveUp={handleMoveUp(index)}
              onMoveDown={handleMoveDown(index)}
              onToggle={() => handleToggle(index)}
              onDelete={handleDelete(index)}
            />
          </div>
        ))}
      </div>

      <ArticleStats readTime={readTime} />
    </div>
  );
}

export default ArticleList;
