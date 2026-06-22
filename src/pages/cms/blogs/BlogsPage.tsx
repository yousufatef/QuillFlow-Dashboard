// BlogsPage.tsx
import { CustomSearchBar } from '@/components/shared/customs';
import { useNavigate } from 'react-router-dom';
import BlogCard from './components/BlogCard';
import CustomSelectorFilter from '@/components/shared/customs/CustomFilter';
import { STATUS_ITEMS } from '@/pages/cms/blogs/constant/blogs.constants';
import Pagination from '@/components/shared/customs/CustomPagination';
import PageLayout from '@/components/layout/PageLayout';
import BlogIcons from '@/components/shared/icons/blog-icons/BlogIcons';
import { useTranslation } from 'react-i18next';
import { useGetBlogList } from '@/pages/cms/blogs/hooks/useGetBlogList';
import MainLoader from '@/components/shared/loader/MainLoader';
import LoadingError from '@/components/shared/error/LoadingError';
import type { BlogCardProps } from '@/pages/cms/blogs/types/blog.types';
import { usePermissions } from '@/hooks/permissions/usePermissions';

interface BlogResponse {
  data: {
    result: BlogCardProps[];
    totalCount: number;
  };
}

const BlogsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { hasPermission } = usePermissions();
  const hasAddPermission = hasPermission('blogs.create');

  const { data, isLoading, isError, refetch } = useGetBlogList();

  if (isLoading) return <MainLoader />;
  if (isError) return <LoadingError onRefetch={refetch} />;

  const blogList = (data as BlogResponse)?.data?.result ?? [];
  const totalCount = (data as BlogResponse)?.data?.totalCount ?? 0;
  const isEmpty = blogList.length === 0;

  return (
    <PageLayout
      title={t('pages.blogs.headerTitle')}
      primaryLabel={t('pages.blogs.create')}
      onPrimaryClick={() => navigate('/cms/blogs/create')}
      showPrimaryButton={hasAddPermission}
    >
      <div className="px-6">
        {/* Filtering and search */}
        <div className="mt-6 flex items-center gap-3">
          <CustomSearchBar
            placeholder={t('pages.blogs.search')}
            wrapperClassName="max-w-sm"
            searchParamName="searchTerm"
          />
          <CustomSelectorFilter
            items={STATUS_ITEMS}
            placeholder={t('pages.blogs.filter')}
            icon={<BlogIcons name="filter" />}
            variant="gray"
            fildName="status"
            wrapperClassName="min-h-12 rounded-sm cursor-pointer type-body-md shadow-[0px_4px_20px_0px_#0D3B2E12]"
          />
        </div>

        {/* Cards list / Empty state */}
        {isEmpty ? (
          <div className="mt-16 flex flex-col items-center justify-center gap-4 text-center">
            <BlogIcons name="empty" />
            <div className="flex flex-col gap-1">
              <p className="type-heading-sm text-neutral-900">
                {t('pages.blogs.empty.title')}
              </p>
              <p className="type-body-md text-neutral-500">
                {t('pages.blogs.empty.description')}
              </p>
            </div>

          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

        {!isEmpty && (
          <div className="flex flex-col items-center gap-3 py-4 md:flex-row md:justify-between">
            <Pagination totalCount={totalCount} pageSize={6} />
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default BlogsPage;