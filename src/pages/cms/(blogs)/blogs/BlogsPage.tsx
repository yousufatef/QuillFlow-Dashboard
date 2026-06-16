// BlogsPage.tsx
import { CustomSearchBar } from '@/components/shared/customs';
import { useNavigate } from 'react-router-dom';
import BlogCard from './_components/BlogCard';
import CustomSelectorFilter from '@/components/shared/customs/CustomFilter';
import { STATUS_ITEMS } from '@/constants/blogs.constants';
import Pagination from '@/components/shared/customs/CustomPagination';
import PageLayout from '@/components/layout/PageLayout';
import BlogIcons from '@/components/shared/icons/blog-icons/BlogIcons';
import { useTranslation } from 'react-i18next';
import { useGetBlogList } from '@/hooks/blogs/useGetBlogList';
import MainLoader from '@/components/shared/loader/MainLoader';
import LoadingError from '@/components/shared/error/LoadingError';
import type { BlogCardProps } from '@/types/blog.types';

interface BlogResponse {
  data: {
    result: BlogCardProps[];      // replace Blog[] with your actual item type
    totalCount: number;
  };
}

const BlogsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, isLoading, isError, error, refetch } = useGetBlogList();

  if (isLoading) return <MainLoader />;
  if (isError) return <LoadingError onRefetch={refetch} />;

  const blogList = (data as BlogResponse)?.data?.result;
  const totalCount = (data as BlogResponse)?.data?.totalCount;
  return (
    <PageLayout
      title={t('pages.blogs.headerTitle')}
      primaryLabel={t('pages.blogs.create')}
      onPrimaryClick={() => navigate('/cms/blogs/create')}
    >
      <div className="px-6">
        {/* Filtering and search */}
        <div className='mt-6 flex items-center gap-3'>
          <CustomSearchBar
            placeholder={t('pages.blogs.search')}
            wrapperClassName='max-w-sm'
            searchParamName='searchTerm'
          />
          <CustomSelectorFilter
            items={STATUS_ITEMS}
            placeholder={t('pages.blogs.filter')}
            icon={<BlogIcons name='filter' />}
            variant='gray'
            fildName='status'
            wrapperClassName='min-h-12 rounded-sm cursor-pointer type-body-md shadow-[0px_4px_20px_0px_#0D3B2E12]'
          />
        </div>

        {/* cards list */}
        {isLoading ? (
          <div className='mt-6 flex justify-center'><MainLoader /></div>
        ) : error ? (
          <div className='mt-6 text-red-500'>Failed to load blogs.</div>
        ) : (
          <div className='mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
            {blogList.map((blog: BlogCardProps) => (
              <div key={blog.id}>
                <BlogCard
                  {...blog}
                  onMenuClick={(id) => console.log('Menu clicked for blog:', id)}
                />
              </div>
            ))}
          </div>
        )}

        <div className='flex flex-col items-center gap-3 py-4 md:flex-row md:justify-between'>
          <Pagination totalCount={totalCount} pageSize={6} />
        </div>
      </div>
    </PageLayout>
  );
};

export default BlogsPage;