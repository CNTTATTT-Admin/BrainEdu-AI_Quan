import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import AuthLayout from "../layouts/AuthLayout";
import Fallback from "../components/common/Fallback";
import { authRouter } from "../modules/account/routes";
import MainLayout from "../layouts/MainLayout";
import { ProtectedRoute } from "../services/middeware";
import { rootRouter } from "../modules/root/routes";
import { courseRouter } from "../modules/course/routes";
import { quizzRouter } from "../modules/quizz/routes";
import { pathwayRouter } from "../modules/roadmap/routes";
import { assignmentRouter } from "../modules/assignment/routes";

const AuthLayoutWithSuspense = () => (
  <Suspense fallback={<Fallback />}>
    <AuthLayout />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      ...rootRouter, 
      ...courseRouter,
      ...pathwayRouter,

      {
        element: <ProtectedRoute />,
        children: [
          ...quizzRouter,
          ...assignmentRouter
        ]
      }
    ]
  },
  ...authRouter
]);

export default router;