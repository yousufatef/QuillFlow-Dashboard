export type ArticleSection = {
  id: string;
  title: string;
  description: string;
  image: File | null;
  imagePreview: string | null;
  isExpanded: boolean;
};

export type BlogFormState = {
  title: string;
  description: string;
  coverImage: File | null;
  coverPreview: string | null;
  sections: ArticleSection[];
};

export const BlogStatus = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
} as const;

export type BlogStatus = (typeof BlogStatus)[keyof typeof BlogStatus];

export interface BlogCardProps {
  id: number;
  status: BlogStatus;
  title: string;
  description: string;
  image: string;
  date: string;
  readingTime: number;
  publishedDate?: string;
  onMenuClick?: (id: number) => void;
}
export type ActionType = 'edit' | 'delete' | 'publish';
