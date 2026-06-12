import { useMutation } from '@tanstack/react-query'
import { onInviteInstructorApi } from '../services/api'
import toast from 'react-hot-toast'

const useInviteInstructor = () => {
    const { mutate, error, isPending, isError } = useMutation({
        mutationKey: ["invite-instructor"],
        mutationFn: onInviteInstructorApi,
        onSuccess: () => {
            toast.success("Đã mời giảng viên hợp tác")
        },
        onError: (err) => {
            console.log(err);
        },
        retry: 0,
    }) 
    
    return { mutate, error, isError, isPending }
}

export default useInviteInstructor