import {createBrowserRouter} from "react-router-dom";
import { Suspense } from "react";
import AuthLayout from "../layouts/AuthLayout";
import Fallback from "../components/common/Fallback";
import { authRouter } from "../modules/auth/routes";
import MainLayout from "../layouts/MainLayout";
import { ProtectedRoute } from "../services/middeware";
import { rootRouter } from "../modules/root/routes";
// import { courseRouter } from "../modules/course/routes";
// import { quizzRouter } from "../modules/quizz/routes";
// import { pathwayRouter } from "../modules/roadmap/routes";
// eslint-disable-next-line react-refresh/only-export-components
const AuthLayoutWithSuspense = () => (
  <Suspense fallback={<Fallback />}>
    <AuthLayout />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          ...rootRouter,
        //   ...courseRouter,
        //   ...quizzRouter,
        //   ...pathwayRouter
        ]
      }
    ]
  },
  ...authRouter
]);

export default router