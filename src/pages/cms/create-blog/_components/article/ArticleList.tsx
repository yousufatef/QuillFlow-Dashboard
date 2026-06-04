// ArticleSectionList.tsx (refactored)
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { calculateArticleStats } from '@/utils/articleStats';
import type { BlogFormSchema } from './blogForm.schema';
import { useArticleSections } from '@/hooks/blogs/useArticleSections';
import { ArticleHeader } from './ArticleHeader';
import { ArticleStats } from './ArticleStats';
import ArticleCard from './ArticleCard';

function ArticleList() {
  const { watch } = useFormContext<BlogFormSchema>();
  const state = watch();

  const { readTime } = useMemo(
    () => calculateArticleStats({
      title: state.title,
      description: state.description,
      sections: state.sections,
    }),
    [state.title, state.description, state.sections],
  );

  const {
    fields,
    sectionRefs,
    sectionsError,
    handleAddSection,
    handleToggle,
    handleMoveUp,
    handleMoveDown,
    handleDelete,
  } = useArticleSections();

  return (
    <div className="flex flex-col gap-4 border-t border-border pt-6">
      <ArticleHeader
        onAddSection={handleAddSection}
        error={sectionsError}
      />

      <div className="flex flex-col gap-9">
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