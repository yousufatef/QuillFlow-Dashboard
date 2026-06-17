// BlogsPage.tsx
import { CustomSearchBar } from '@/components/shared/customs';
import { useMemo } from 'react';
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
import type { BlogCardProps, BlogListApiItem } from '@/pages/cms/blogs/types/blog.types';
// import { usePermissions } from '@/hooks/permissions/usePermissions';

const getLocalizedValue = (
  blog: BlogListApiItem,
  englishKey: 'nameEn' | 'titleEn' | 'descriptionEn',
  arabicKey: 'nameAr' | 'titleAr' | 'descriptionAr',
  fallbackKey: 'title' | 'description',
  isEnglish: boolean,
) => {
  if (isEnglish) {
    return blog[englishKey] ?? blog[fallbackKey] ?? blog[arabicKey] ?? '';
  }

  return blog[arabicKey] ?? blog[fallbackKey] ?? blog[englishKey] ?? '';
};

const mapBlogToCard = (blog: BlogListApiItem, isEnglish: boolean): BlogCardProps => ({
  id: String(blog.id),
  title: getLocalizedValue(blog, 'nameEn', 'nameAr', 'title', isEnglish),
  description: getLocalizedValue(blog, 'descriptionEn', 'descriptionAr', 'description', isEnglish),
  readOfTime: String(blog.readOfTime ?? blog.readTime ?? 0),
  coverImageUrl: blog.coverImageUrl ?? blog.coverImage ?? '',
  isPublished: blog.isPublished ?? blog.is_published ?? false,
  publishedOn: blog.publishedOn ?? null,
  createdOn: blog.createdOn ?? blog.created_at ?? '',
  updatedOn: blog.updatedOn ?? blog.updated_at ?? null,
  articlesCount: blog.articlesCount ?? 0,
});

const BlogsPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isEnglish = i18n.language === 'en';

  // const { hasPermission } = usePermissions();
  // const hasAddPermission = hasPermission('blogs.create');

  const { data, isLoading, isError, refetch } = useGetBlogList();

  if (isLoading) return <MainLoader />;
  if (isError) return <LoadingError onRefetch={refetch} />;

  const blogList = useMemo(
    () => (data?.result ?? []).map((blog) => mapBlogToCard(blog, isEnglish)),
    [data?.result, isEnglish],
  );
  console.log('blogList', blogList);
  const totalCount = data?.totalCount ?? blogList.length;
  const isEmpty = blogList.length === 0;
  console.log('isEmpty', isEmpty);

  return (
    <PageLayout
      title={t('pages.blogs.headerTitle')}
      primaryLabel={t('pages.blogs.create')}
      onPrimaryClick={() => navigate('/cms/blogs/create')}
    // showPrimaryButton={hasAddPermission}
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
