import { apiRequest } from '../utils/api';

export async function getAdminsListApi(
    pageNumber: number,
    pageSize: number,
    searchValue: string,
    sort: string,
    status: string,
) {
    const res = await apiRequest(`/admins?${searchValue ? `searchTerm=${searchValue}` : ''}${pageNumber ? `&pageNumber=${pageNumber}` : ''}${pageSize ? `&pageSize=${pageSize}` : ''}${sort ? `&sortBy=fullname&sortOrder=${sort}` : ''}${status ? `&statusFilter=${status}` : ''}`,
        { method: 'GET' },
    );
    return res;
}

export async function getAdminApi(id: string) {
    const res = await apiRequest(`/admins/${id}`, { method: 'GET' });
    return res;
}

export async function createAdminApi(data: any) {
    const res = await apiRequest(`/admins`, { method: 'POST', body: data });
    return res;
}

export async function deleteAdminApi(id: string) {
    const res = await apiRequest(`/admins/${id}`, { method: 'DELETE' });
    return res;
}

export async function updateAdminApi(id: string, data: any) {
    const res = await apiRequest(`/admins/${id}`, { method: 'PUT', body: data });
    return res;
}