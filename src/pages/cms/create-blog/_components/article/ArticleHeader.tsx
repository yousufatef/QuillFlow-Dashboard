// ArticleSectionHeader.tsx
import { Button } from '@/components/ui/button';
import FieldMessage from '@/components/forms/FieldMessage';
import BlogIcons from '@/components/shared/icons/blog-icons/BlogIcons';

interface ArticleHeaderProps {
  onAddSection: () => void;
  error?: string;
}

export function ArticleHeader({ onAddSection, error }: ArticleHeaderProps) {
  return (
    <>
      <div className='flex items-center justify-between gap-3'>
        <h2 className='type-heading-sm text-neutral-900'>Article Section</h2>

        <Button
          type='button'
          variant='outline'
          size='sm'
          onClick={onAddSection}
          className='type-body-md primary-500 border-primary-500 rounded'
        >
          <BlogIcons name='add' />
          Add section
        </Button>
      </div>

      <FieldMessage error={error} />
    </>
  );
}
