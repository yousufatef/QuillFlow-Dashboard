// ArticleSectionHeader.tsx
import { Button } from '@/components/ui/button';
import FieldMessage from '@/components/forms/FieldMessage';
import BlogIcons from '@/components/shared/icons/blog-icons/BlogIcons';
import { useTranslation } from 'react-i18next';

interface ArticleHeaderProps {
  onAddSection: () => void;
  canAddSection: boolean;
  error?: string;
}

export function ArticleHeader({ onAddSection, canAddSection, error }: ArticleHeaderProps) {
  const { t } = useTranslation()
  return (
    <>
      <div className='flex items-center justify-between gap-3'>
        <h2 className='type-heading-sm text-neutral-900'>{t("forms.labels.article_section")}</h2>

        <Button
          type='button'
          variant='outline'
          size='sm'
          onClick={onAddSection}
          disabled={!canAddSection}
          className='type-body-md text-primary-500 border-primary-500 rounded bg-white'
        >
          <BlogIcons name='add' />
          {t("forms.buttonLabels.add_section")}
        </Button>
      </div>

      <FieldMessage error={error} />
    </>
  );
}
