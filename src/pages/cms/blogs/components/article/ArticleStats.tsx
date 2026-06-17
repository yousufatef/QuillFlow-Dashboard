// ArticleStatsFooter.tsx
import { currentDate } from '@/utils/date';
import BlogIcons from '@/components/shared/icons/blog-icons/BlogIcons';
import { useTranslation } from 'react-i18next';

interface ArticleStatsProps {
  readTime: number;
}

export function ArticleStats({ readTime }: ArticleStatsProps) {
  const { i18n } = useTranslation()
  const isEnglish = i18n.language === 'en'
  return (
    <div className='mt-4 flex flex-wrap items-center gap-2 border-t border-neutral-50 pt-1'>
      <div className='flex items-center gap-1.5 rounded-lg bg-neutral-50 px-4 py-2 text-xs text-neutral-900'>
        <BlogIcons name='calender' />
        <span>{currentDate(isEnglish)}</span>
      </div>

      <div className='flex items-center gap-1.5 rounded-lg bg-neutral-50 px-4 py-2 text-xs text-neutral-900'>
        <BlogIcons name='clock' />
        <span>{readTime} {isEnglish ? 'min read' : 'دقيقة قراءة'}</span>
      </div>
    </div>
  );
}
