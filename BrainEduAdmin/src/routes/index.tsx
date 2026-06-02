import { createBrowserRouter } from "react-router-dom";
import { authRouter } from "../modules/auth/routes";
import MainLayout from "../layouts/MainLayout";
import { ProtectedRoute } from "../services/middeware";
import { rootRouter } from "../modules/root/routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute allowedRoles={["ADMIN", "INSTRUCTOR"]} />,
    children: [
      {
        element: <MainLayout />,
        children: [
          ...rootRouter
        ]
      }
    ]
  },
  ...authRouter
]);

export default router;