import AuthLeftPanel from '../components/LoginAuthLeft'
import AuthRightPanel from '../components/LoginAuthRight'
const LoginPage = () => {
  
  return (
    <div className='flex w-full p-4 rounded-2xl bg-gray-100! shadow-2xs!'>
        <AuthLeftPanel/>
        <AuthRightPanel />
    </div>
  )
}

export default LoginPage