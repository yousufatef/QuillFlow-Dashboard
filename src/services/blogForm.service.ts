import { apiRequest } from '@/utils/api';
import type { BlogFormState } from '../types/blog.types';

/**
 * Build a FormData payload from the current blog form state.
 * Suitable for multipart/form-data API requests with file uploads.
 */
function buildFormData(state: BlogFormState): FormData {
  const formData = new FormData();
  formData.append('titleEn', state.titleEn);
  formData.append('titleAr', state.titleAr);
  formData.append('descriptionEn', state.descriptionEn);
  formData.append('descriptionAr', state.descriptionAr);

  if (state.coverImage) {
    formData.append('coverImage', state.coverImage);
  }

  state.sections.forEach((section, index) => {
    formData.append(`sections[${index}][id]`, section.id);
    formData.append(`sections[${index}][titleEn]`, section.titleEn);
    formData.append(`sections[${index}][titleAr]`, section.titleAr);
    formData.append(`sections[${index}][descriptionEn]`, section.descriptionEn);
    formData.append(`sections[${index}][descriptionAr]`, section.descriptionAr);
    if (section.image) {
      formData.append(`sections[${index}][image]`, section.image);
    }
  });

  return formData;
}

/** Save the blog as a draft. */
export async function saveBlogDraft(state: BlogFormState): Promise<void> {
  const formData = buildFormData(state);
  await apiRequest<void>('cms/blogs/draft', {
    method: 'POST',
    body: formData,
  });
}

/** Publish the blog. */
export async function publishBlog(state: BlogFormState): Promise<void> {
  const formData = buildFormData(state);
  await apiRequest<void>('cms/blogs/publish', {
    method: 'POST',
    body: formData,
  });
}
