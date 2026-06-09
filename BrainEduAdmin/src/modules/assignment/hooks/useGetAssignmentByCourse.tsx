import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { onGetAssignmentByCourse } from '../services/api';

const useGetAssignmentByCourse = (courseId: number) => {
    const { data, error, isPending, isError, refetch } = useQuery({
        queryKey: ["assignment-course", courseId],
        queryFn: () => onGetAssignmentByCourse(courseId),
        placeholderData: keepPreviousData,
        retry: 0,
        enabled: !!courseId,
    });
    
    return { data, error, isError, isPending, refetch };
};

export default useGetAssignmentByCourse;