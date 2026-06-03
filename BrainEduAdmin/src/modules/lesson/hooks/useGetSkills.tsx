import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { onGetSkillsApi } from '../services/api';

const useGetSkills = () => {
    const { data, error, isPending, isError, refetch } = useQuery({
        queryKey: ["skills"],
        queryFn: () => onGetSkillsApi(),
        placeholderData: keepPreviousData,
        retry: 0,
    });
    
    return { data, error, isError, isPending, refetch };
};

export default useGetSkills;