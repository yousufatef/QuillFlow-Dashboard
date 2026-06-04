// ArticleStatsFooter.tsx
import { currentDate } from '@/utils/date';
import BlogIcons from '@/components/shared/icons/blog-icons/BlogIcons';

interface ArticleStatsProps {
  readTime: number;
}

export function ArticleStats({ readTime }: ArticleStatsProps) {
  return (
    <div className='mt-4 flex flex-wrap items-center gap-2 border-t border-neutral-50 pt-1'>
      <div className='flex items-center gap-1.5 rounded-lg bg-neutral-50 px-4 py-2 text-neutral-900 text-xs'>
        <BlogIcons name='calender' />
        <span>{currentDate}</span>
      </div>

      <div className='flex items-center gap-1.5 rounded-lg bg-neutral-50 px-4 py-2 text-neutral-900 text-xs'>
        <BlogIcons name='clock' />
        <span>{readTime} min read</span>
      </div>
    </div>
  );
}
