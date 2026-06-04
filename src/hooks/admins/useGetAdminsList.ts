import { getAdminsListApi } from '../../services/admins.service';
import { useQuery } from '@tanstack/react-query';
import { useTableSearchParam } from '../useTableSearchParam';
type AdminResponse = {
    admins: any[];
    isLoading: boolean;
    error: unknown;
    isPlaceholderData: boolean;
    totalCount: number;
};

const normalize = (v: string | string[] | undefined): string => {
    if (Array.isArray(v)) return v[0] ?? '';
    return v ?? '';
};

export const useAdminsList = (): AdminResponse => {
    const { params: { pageNumber, pageSize, searchValue, sort, status } } = useTableSearchParam();

    const { data, isLoading, isPlaceholderData, error } = useQuery<any>({
        queryKey: ['adminsList', pageNumber, pageSize, searchValue, sort, status],
        queryFn: () => getAdminsListApi(Number(pageNumber), Number(pageSize), normalize(searchValue), normalize(sort), normalize(status)),
    });

    return {
        admins: data?.result?.admins,
        isLoading,
        error,
        isPlaceholderData,
        totalCount: data?.result?.totalCount,
    };
};