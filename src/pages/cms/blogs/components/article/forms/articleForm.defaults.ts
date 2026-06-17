import type { ArticleSectionFormValues } from "./articleForm.schema";

export const articleSectionDefaultValues: Omit<ArticleSectionFormValues, 'id'> = {
  titleEn: '',
  titleAr: '',
  descriptionEn: '',
  descriptionAr: '',
  image: null,
  imagePreview: null,
  isExpanded: true,
};

export const basicInfoDefaultValues = {
  titleEn: '',
  titleAr: '',
  descriptionEn: '',
  descriptionAr: '',
  coverImage: null,
  coverPreview: null,
  readTime: 0,
};
