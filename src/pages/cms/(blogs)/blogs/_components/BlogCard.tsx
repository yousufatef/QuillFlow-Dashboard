import type { BlogCardProps } from '@/types/blog.types';
import { BlogStatus } from '@/types/blog.types';
import ActionsDropDown from './ActionsDropDown';
import BlogIcons from '@/components/shared/icons/blog-icons/BlogIcons';
import StatusBadge from '@/components/shared/customs/StatusBadge';
import { useTranslation } from 'react-i18next';
import { formatDateShort } from '@/utils/date';

const BlogCard = (blog: BlogCardProps) => {
  const { i18n } = useTranslation();
  const isEnglish = i18n.language === 'en';

  const status = blog.isPublished
    ? BlogStatus.PUBLISHED
    : BlogStatus.DRAFT;

  return (
    <div className='flex flex-col overflow-hidden'>
      {/* Image Section */}
      <div className='relative aspect-video max-h-41 w-full overflow-hidden'>
        <img
          src={blog.coverImageUrl}
          alt={blog.title}
          className='h-full w-full rounded-[8px] object-cover'
        />

        {/* Status Badge */}
        <div className='absolute top-2 inset-s-4'>
          <StatusBadge status={status} />
        </div>

        {/* Three-dots Menu */}
        <div className='absolute top-2 inset-e-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-gray-600 shadow-sm transition-all duration-150 hover:bg-white hover:text-gray-900'>
          <ActionsDropDown blog={blog} />
        </div>
      </div>

      {/* Content Section */}
      <div className='flex flex-col gap-2 pt-3'>
        {/* Title */}
        <h3 className='type-body-lg-semibold text-neutral-900'>
          {blog.title}
        </h3>

        {/* Description */}
        <p className='type-body-sm text-neutral-500'>
          {blog.description}
        </p>

        {/* Meta Chips */}
        <div className='mt-1 flex flex-wrap items-center gap-2'>
          {/* Date */}
          <div className='inline-flex items-center gap-1.5 rounded-[8px] bg-neutral-50 px-4 py-2 text-xs font-medium text-neutral-900'>
            <BlogIcons name='cardCalender' />
            <span>{formatDateShort(blog.createdOn, isEnglish)}</span>
          </div>

          {/* Reading Time */}
          <div className='inline-flex items-center gap-1.5 rounded-[8px] bg-neutral-50 px-4 py-2 text-xs font-medium text-neutral-900'>
            <BlogIcons name='cardClock' />
            <span>
              {isEnglish
                ? `${blog.readOfTime} min read`
                : `${blog.readOfTime} دقائق قراءة`}
            </span>
          </div>
        </div>

        {/* Published Date */}
        {blog.publishedOn && (
          <p className='type-body-sm mt-2 text-neutral-400'>
            {isEnglish ? 'Published' : 'تم النشر'} {formatDateShort(blog.publishedOn, isEnglish)}
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogCard;