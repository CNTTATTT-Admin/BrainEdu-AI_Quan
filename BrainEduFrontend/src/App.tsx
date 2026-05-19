import { Suspense } from 'react'
import {RouterProvider} from 'react-router-dom'
import router from './routes'
function App() {
  
  return (
    <div className="">
      <Suspense>
        <RouterProvider router={router}/>
      </Suspense>
    </div>
  )
}

export default App
