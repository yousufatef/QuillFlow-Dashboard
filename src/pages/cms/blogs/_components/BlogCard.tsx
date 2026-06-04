import StatusBadge from './StatusBadge';
import { BlogStatus, type BlogCardProps } from '@/types/blog.types';
import ActionsDropDown from './ActionsDropDown';
import BlogIcons from '@/components/shared/icons/blog-icons/BlogIcons';

const BlogCard = (BlogData: BlogCardProps) => {
  return (
    <div className='flex flex-col overflow-hidden '>
      {/* Image Section */}
      <div className='relative w-full aspect-video overflow-hidden max-h-[164px]'>
        <img
          src={BlogData.image}
          alt={BlogData.title}
          className='w-full h-full object-cover rounded-[8px]'
        />

        {/* Status Badge — top-left */}
        <div className='absolute top-2 left-4'>
          <StatusBadge status={BlogData.status} />
        </div>

        {/* Three-dots Menu — top-right */}
        <div className='absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-lg bg-white/90 hover:bg-white text-gray-600 hover:text-gray-900 shadow-sm transition-all duration-150'>
          <ActionsDropDown />
        </div>
      </div>

      {/* Content Section */}
      <div className='flex flex-col gap-2 pt-3'>
        {/* Title */}
        <h3 className='type-body-lg-semibold text-neutral-900'>
          {BlogData.title}
        </h3>

        {/* Description */}
        <p className='type-body-sm text-neutral-500'>{BlogData.description}</p>

        {/* Meta Chips */}
        <div className='flex flex-wrap items-center gap-2 mt-1'>
          {/* Date chip */}
          <div className='inline-flex items-center gap-1.5 rounded-[8px] bg-neutral-50 px-4 py-2  text-xs text-neutral-900 font-medium'>
            <BlogIcons name='cardCalender' />
            <span>{BlogData.date}</span>
          </div>

          {/* Reading time chip */}
          <div className='inline-flex items-center gap-1.5 rounded-[8px] bg-neutral-50 px-4 py-2  text-xs text-neutral-900 font-medium'>
            <BlogIcons name='cardClock' />
            <span>{BlogData.readingTime} min read</span>
          </div>
        </div>

        {/* Published date footer */}
        {BlogData.publishedDate && (
          <p className='type-body-sm text-neutral-400 mt-2'>
            {BlogData.status === BlogStatus.DRAFT
              ? `Updated ${BlogData.date}`
              : `Published ${BlogData.publishedDate}`}
          </p>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
