import { useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import DeleteSectionDialog from './DeleteSectionDialog';
import BlogIcons from '@/components/shared/icons/blog-icons/BlogIcons';
import ArticleForm from './forms/ArticleForm';
import type { BlogFormSchema } from './blogForm.schema';
import { useTranslation } from 'react-i18next';

type ArticleCardProps = {
  index: number;
  total: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onToggle: () => void;
  onDelete: () => void;
};

function ArticleCard({ index, total, onMoveUp, onMoveDown, onToggle, onDelete }: ArticleCardProps) {
  const { control, watch } = useFormContext<BlogFormSchema>();
  const { i18n } = useTranslation()
  const isEnglish = i18n.language === 'en'
  const section = watch(`sections.${index}`);
  const sectionLabel = `${isEnglish ? 'Section' : 'قسم'} ${index + 1}`;
  const isFirst = index === 0;
  const isLast = index === total - 1;

  if (!section) return null;

  const hasContent =
    (section.titleEn?.trim() ?? '') !== '' ||
    (section.titleAr?.trim() ?? '') !== '' ||
    (section.descriptionEn?.trim() ?? '') !== '' ||
    (section.descriptionAr?.trim() ?? '') !== '' ||
    section.image !== null;
  const collapsedTitle = section.titleEn || section.titleAr;

  return (
    <div className={'b rounded-xl border border-neutral-100 px-4 py-2 shadow-sm'}>
      <div className='flex w-full items-center gap-1 px-1 py-1'>
        <div className='flex flex-col'>
          <div className='flex shrink-0 items-center'>
            <Button
              type='button'
              variant='ghost'
              size='icon-xs'
              disabled={isFirst}
              aria-label='Move section up'
              className={cn('text-muted-foreground', isFirst && 'opacity-30')}
              onClick={(e) => {
                e.stopPropagation();
                onMoveUp();
              }}
            >
              <BlogIcons name='ArrowUp' />
            </Button>

            <Button
              type='button'
              variant='ghost'
              size='icon-xs'
              disabled={isLast}
              aria-label='Move section down'
              className={cn('text-muted-foreground', isLast && 'opacity-30')}
              onClick={(e) => {
                e.stopPropagation();
                onMoveDown();
              }}
            >
              <BlogIcons name='ArrowDown' />
            </Button>
          </div>

          {!section.isExpanded && collapsedTitle && (
            <span className='type-body-sm-semibold text-neutral-900 text-center'>
              {collapsedTitle}
            </span>
          )}
        </div>

        <Button
          type='button'
          variant='ghost'
          className={`h- min-w-0 flex-1 justify-start gap-2 bg-transparent! px-2 ${!section.isExpanded && collapsedTitle ? " pb-6" : "pb-0"} font-normal`}
          onClick={onToggle}
          aria-expanded={section.isExpanded}
        >
          <span className='type-body-sm text-neutral-400'>{sectionLabel}</span>


        </Button>

        {!isFirst && (
          <span
            className='shrink-0'
            onClick={(e) => e.stopPropagation()}
          >
            <DeleteSectionDialog
              sectionLabel={sectionLabel}
              hasContent={hasContent}
              onConfirm={onDelete}
            />
          </span>
        )}
      </div>

      {!section.isExpanded && (
        <div className='flex justify-center pb-1'>
          <Button
            type='button'
            variant='ghost'
            size='icon-sm'
            className='text-muted-foreground'
            aria-label='Expand section'
            onClick={onToggle}
          >
            <BlogIcons name='ArrowDown' />
          </Button>
        </div>
      )}

      <div
        className='grid transition-[grid-template-rows] duration-200 ease-in-out'
        style={{
          gridTemplateRows: section.isExpanded ? '1fr' : '0fr',
        }}
      >
        <div className='overflow-hidden'>
          <ArticleForm
            control={control}
            index={index}
            onToggle={onToggle}
          />
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
