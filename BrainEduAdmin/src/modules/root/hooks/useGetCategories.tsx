import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { onGetCategoriesApi } from '../services/api';

interface UseGetCategoriesParams {
    page?: number;
    size?: number;
    search?: string;
}

const useGetCategories = ({ page = 0, size = 10, search = "" }: UseGetCategoriesParams = {}) => {
    const { data, error, isPending, isError, refetch } = useQuery({
        queryKey: ["categories", page, size, search],
        queryFn: () => onGetCategoriesApi(page, size, search),
        placeholderData: keepPreviousData,
        retry: 0,
    });
    
    return { data, error, isError, isPending, refetch };
};

export default useGetCategories;