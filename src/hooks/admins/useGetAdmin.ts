import { getAdminApi } from '../../services/admins.service';
import { useQuery } from '@tanstack/react-query';

export const useAdmin = (id: string) => {
    const { data, isLoading, error } = useQuery<any>({
        queryKey: ['admin', id],
        queryFn: () => getAdminApi(id),
    });

    return { adminData: data?.result, isLoading, error };
};