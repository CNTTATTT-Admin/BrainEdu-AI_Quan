import AuthLeftPanel from '../component/LoginAuthLeft'
import AuthRightPanel from '../component/LoginAuthRight'
const LoginPage = () => {
  
  return (
    <div className='flex w-full p-4 rounded-2xl bg-gray-100! shadow-2xs!'>
        <AuthLeftPanel/>
        <AuthRightPanel />
    </div>
  )
}

export default LoginPage