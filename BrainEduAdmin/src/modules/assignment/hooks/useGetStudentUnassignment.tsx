import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { onStudentUnaassignment } from '../services/api';

const useGetStudentUnassignment = (courseId: number, assignmentId: number) => {
    const { data, error, isPending, isError, refetch } = useQuery({
        queryKey: ["student-unassignment", courseId],
        queryFn: () => onStudentUnaassignment(courseId, assignmentId),
        placeholderData: keepPreviousData,
        retry: 0,
    });
    
    return { data, error, isError, isPending, refetch };
};

export default useGetStudentUnassignment;