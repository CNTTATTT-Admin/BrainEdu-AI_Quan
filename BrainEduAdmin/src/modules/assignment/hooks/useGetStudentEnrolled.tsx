import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { onGetStudentEnrolled } from '../services/api';

const useGetStudentEnrolled = (courseId: number) => {
    const { data, error, isPending, isError, refetch } = useQuery({
        queryKey: ["course-students", courseId],
        queryFn: () => onGetStudentEnrolled(courseId),
        placeholderData: keepPreviousData,
        retry: 0,
        enabled: !!courseId,
    });
    
    return { data, error, isError, isPending, refetch };
};

export default useGetStudentEnrolled;