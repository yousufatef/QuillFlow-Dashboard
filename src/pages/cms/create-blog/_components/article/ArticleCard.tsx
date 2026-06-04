import { useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import DeleteSectionDialog from './DeleteSectionDialog';
import BlogIcons from '@/components/shared/icons/blog-icons/BlogIcons';
import ArticleForm from './forms/ArticleForm';
import type { BlogFormSchema } from './blogForm.schema';

type ArticleCardProps = {
  index: number;
  total: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onToggle: () => void;
  onDelete: () => void;
};

function ArticleCard({
  index,
  total,
  onMoveUp,
  onMoveDown,
  onToggle,
  onDelete,
}: ArticleCardProps) {
  const { control, watch } = useFormContext<BlogFormSchema>();
  const section = watch(`sections.${index}`);
  const sectionLabel = `Section ${index + 1}`;
  const isFirst = index === 0;
  const isLast = index === total - 1;
  const hasContent =
    (section.title?.trim() ?? '') !== '' ||
    (section.description?.trim() ?? '') !== '' ||
    section.image !== null;

  if (!section) return null;

  return (
    <div
      className={'b rounded-xl px-4 py-2 border border-neutral-100 shadow-sm'}
    >
      <div className='flex w-full items-center gap-1 px-1 py-1'>
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

        <Button
          type='button'
          variant='ghost'
          className='h-auto min-w-0 flex-1 justify-start gap-2 px-2 py-1.5 font-normal bg-transparent!'
          onClick={onToggle}
          aria-expanded={section.isExpanded}
        >
          <span className='type-body-sm text-neutral-400'>{sectionLabel}</span>

          {!section.isExpanded && section.title && (
            <span className='min-w-0 flex-1 truncate text-sm text-muted-foreground'>
              {section.title}
            </span>
          )}
        </Button>

        <span className='shrink-0' onClick={(e) => e.stopPropagation()}>
          <DeleteSectionDialog
            sectionLabel={sectionLabel}
            hasContent={hasContent}
            onConfirm={onDelete}
          />
        </span>
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
          <ArticleForm control={control} index={index} onToggle={onToggle} />
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
