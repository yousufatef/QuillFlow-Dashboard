import type { ArticleSectionFormValues } from "../components/article/forms/articleForm.schema";

export type ArticleSection = {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  image: File | null;
  imagePreview: string | null;
  isExpanded: boolean;
};

export type BlogFormState = {
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  coverImage: File | null;
  coverPreview: string | null;
  sections: ArticleSection[];
};

export const BlogStatus = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
} as const;

export type BlogStatus = (typeof BlogStatus)[keyof typeof BlogStatus];

export interface BlogCardProps {
  id: string;
  title: string;
  description: string;
  readOfTime: string;
  coverImageUrl: string;
  isPublished: boolean;
  publishedOn: string | null;
  createdOn: string;
  updatedOn: string | null;
  articlesCount: number;
  onMenuClick?: (id: string) => void;
}

export interface BlogListApiItem {
  id: string | number;
  nameEn?: string | null;
  nameAr?: string | null;
  titleEn?: string | null;
  titleAr?: string | null;
  title?: string | null;
  descriptionEn?: string | null;
  descriptionAr?: string | null;
  description?: string | null;
  coverImage?: string | null;
  coverImageUrl?: string | null;
  readOfTime?: string | number | null;
  readTime?: string | number | null;
  is_published?: boolean | null;
  isPublished?: boolean | null;
  publishedOn?: string | null;
  created_at?: string | null;
  createdOn?: string | null;
  updated_at?: string | null;
  updatedOn?: string | null;
  articlesCount?: number | null;
}

export interface BlogListResponse {
  result: BlogListApiItem[];
  totalCount: number;
}

export type ActionType = 'publish' | 'unpublish' | 'edit' | 'delete';


export type BlogData = {
  id?: string;
  title?: string;
  titleEn?: string;
  titleAr?: string;
  description?: string;
  descriptionEn?: string;
  descriptionAr?: string;
  coverImage?: File | string | null;
  coverImageUrl?: string | null;
  coverPreview?: string | null;
  readOfTime?: string;
  readTime?: number;
  isPublished?: boolean;
  publishedOn?: string | null;
  createdOn?: string;
  updatedOn?: string | null;
  sections?: ArticleSectionFormValues[];
  articles?: Array<{
    id?: string;
    titleEn?: string;
    titleAr?: string;
    descriptionEn?: string;
    descriptionAr?: string;
    coverImageUrl?: string;
    blogId?: string;
    createdOn?: string;
    updatedOn?: string | null;
  }>;
};

export type ArticleFormProps = {
  control: any;
  index: number;
  onToggle: () => void;
};
export type BasicInfoFormProps = {
  blogData?: BlogData;
};


export type BlogSectionPayload = {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  image: File | null;
};

export type BlogPayload = {
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  coverImage: File | null;
  readTime: number;
  sections: BlogSectionPayload[];
};
