import { useQuery } from '@tanstack/react-query'
import { onGetCategoryApi } from '../services/api'

const useGetCategory = (enabled: boolean = true) => {
    const { data, error, isPending, isError, refetch, isFetched } = useQuery({
        queryKey: ["categories"],
        queryFn: onGetCategoryApi,
        enabled,
        retry: 0,
    }) 
    
    return { data, error, isError, isPending, refetch, isFetched }
}

export default useGetCategory