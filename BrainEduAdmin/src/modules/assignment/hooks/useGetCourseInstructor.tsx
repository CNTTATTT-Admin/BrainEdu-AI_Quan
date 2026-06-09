import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { onGetCourseByInstructorApi } from '../services/api';

const useGetCourseInstructor = () => {
    const { data, error, isPending, isError, refetch } = useQuery({
        queryKey: ["course-instructor"],
        queryFn: () => onGetCourseByInstructorApi(),
        placeholderData: keepPreviousData,
        retry: 0,
    });
    
    return { data, error, isError, isPending, refetch };
};

export default useGetCourseInstructor;