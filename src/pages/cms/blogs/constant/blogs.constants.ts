import { BlogStatus, type ActionType } from '@/pages/cms/blogs/types/blog.types';
import type { AppPermissions } from '@/types/permissions-types';

export interface StatusConfig {
  label: string;
  labelAr: string;
  className: string;
}

export const STATUS_CONFIG: Record<BlogStatus, StatusConfig> = {
  [BlogStatus.DRAFT]: {
    label: 'Draft',
    labelAr: 'مسودة',
    className: 'bg-neutral-50 text-neutral-900 ',
  },
  [BlogStatus.PUBLISHED]: {
    label: 'Published',
    labelAr: 'منشور',
    className: 'bg-success-50 text-success-500',
  },
};

export const STATUS_ITEMS = [
  { labelEn: 'All Statuses', labelAr: 'كل الحالات', value: 'all' },
  { labelEn: 'Published', labelAr: 'منشور', value: 'Published' },
  { labelEn: 'Draft', labelAr: 'مسودة', value: 'Draft' },
];

export const getBlogMenuItems = (isPublished: boolean): {
  action: ActionType;
  icon: string;
  labelEn: string;
  labelAr: string;
  className?: string;
  permissions?: AppPermissions[];
}[] => [
    {
      action: isPublished ? 'unpublish' : 'publish',
      icon: 'publish',
      labelEn: isPublished ? 'Unpublish' : 'Publish',
      labelAr: isPublished ? 'إلغاء النشر' : 'نشر',
      permissions: (isPublished ? ['blogs.update'] : ['blogs.update']) as AppPermissions[],
    },
    {
      action: 'edit',
      icon: 'edit',
      labelEn: 'Edit',
      labelAr: 'تعديل',
      permissions: ['blogs.update'] as AppPermissions[],
    },
    {
      action: 'delete',
      icon: 'trush',
      labelEn: 'Delete',
      labelAr: 'حذف',
      className: 'text-error-500',
      permissions: ['blogs.delete'] as AppPermissions[],
    },
  ];

export const MAX_BLOG_SECTIONS = 5;

