import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { onGetInstructorApi } from '../services/api';

interface useGetInstructorParams {
    page?: number;
    size?: number;
    search?: string;
}

const useGetInstructor = ({ page = 0, size = 10, search = "" }: useGetInstructorParams = {}) => {
    const { data, error, isPending, isError, refetch } = useQuery({
        queryKey: ["instructors", page, size, search],
        queryFn: () => onGetInstructorApi(page, size, search),
        placeholderData: keepPreviousData,
        retry: 0,
    });
    
    return { data, error, isError, isPending, refetch };
};

export default useGetInstructor;