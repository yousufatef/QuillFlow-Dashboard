import { apiRequest } from '../../../../utils/api';
import type { BlogListApiItem, BlogListResponse } from '../types/blog.types';

type BlogListApiEnvelope = {
  result?: BlogListApiItem[];
  data?: {
    result?: BlogListApiItem[];
    totalCount?: number;
  };
  totalCount?: number;
};


export async function buildBlogFormData(data: any, status?: boolean): Promise<FormData> {
  const fd = new FormData();
  console.log(data)
  fd.append('TitleAr', data.titleAr ?? '');
  fd.append('TitleEn', data.titleEn ?? '');
  fd.append('DescriptionAr', data.descriptionAr ?? '');
  fd.append('DescriptionEn', data.descriptionEn ?? '');
  fd.append('ReadOfTime', String(data.readTime ?? 0));
  fd.append('isPublished', String(status));

  if (data.coverImage instanceof File) {
    fd.append('coverImage', data.coverImage);
  } else if (data.coverPreview) {
    fd.append('coverImageUrl', data.coverPreview);
  }

  const sections: any[] = Array.isArray(data.sections) ? data.sections : [];
  for (let index = 0; index < sections.length; index++) {
    const section = sections[index];
    fd.append(`Articles[${index}].TitleAr`, section.titleAr ?? '');
    fd.append(`Articles[${index}].TitleEn`, section.titleEn ?? '');
    fd.append(`Articles[${index}].DescriptionAr`, section.descriptionAr ?? '');
    fd.append(`Articles[${index}].DescriptionEn`, section.descriptionEn ?? '');

    if (section.image instanceof File) {
      fd.append(`Articles[${index}].coverImage`, section.image);
    } else if (section.imagePreview) {
      fd.append(`Articles[${index}].coverImageUrl`, section.imagePreview);
    } else {
      fd.append(`Articles[${index}].coverImage`, 'null');
    }
  }

  return fd;
}

// blogs.service.ts
export async function getBlogsListApi(
  pageNumber: number,
  pageSize: number,
  searchValue: string,
  status: string,
): Promise<BlogListResponse> {
  const params = new URLSearchParams();

  params.set('PageNumber', String(pageNumber || 1));
  params.set('PageSize', String(pageSize || 6));
  if (searchValue) params.set('SearchTerm', searchValue);
  params.set('SortBy', '0');
  params.set('SortOrder', '1');

  if (status && status.toLowerCase() !== 'all') {
    const isPublished = status.toLowerCase() === 'published';
    params.set('IsPublished', String(isPublished));
  }

  const res = await apiRequest<BlogListApiEnvelope>(`blogs?${params.toString()}`, { method: 'GET' });
  const result = res.data?.result ?? res.result ?? [];

  return {
    result,
    totalCount: res.data?.totalCount ?? res.totalCount ?? result.length,
  };
}


export async function getBlogApi(id: string) {
  const res = await apiRequest<{ data: any }>(`cms/blogs/${id}`, { method: 'GET' });
  return res.data; // Extract the actual blog data from the response wrapper
}

/**
 * Single endpoint for both publish (status=true) and draft (status=false).
 */
export async function createBlogApi(data: any, status: boolean) {
  const res = await apiRequest(`/cms/blogs`, {
    method: 'POST',
    body: await buildBlogFormData(data, status),
  });
  return res;
}

export async function toggleBlogStatusApi(id: string) {
  const res = await apiRequest(`cms/blogs/${id}/toggle-publish`, { method: 'PATCH' });
  return res;
}

export async function deleteBlogApi(id: string) {
  const res = await apiRequest(`cms/blogs/${id}`, { method: 'DELETE' });
  return res;
}

export async function updateBlogApi(data: any) {
  const res = await apiRequest(`cms/blogs/${data.id}`, {
    method: 'PUT',
    body: await buildBlogFormData(data, data.isPublished)
  });
  return res;
}
