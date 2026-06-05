import RegisterLeftPanel from '../component/RegisterAuthLeft'
import RegisterRightPanel from '../component/RegisterAuthRight'

const RegisterPage = () => {
  return (
    <div className='flex w-full p-4 rounded-2xl bg-gray-100! shadow-2xs!'>
        <RegisterLeftPanel/>
        <RegisterRightPanel />
    </div>
  )
}

export default RegisterPage