import { lazyLoad } from "../../../utils/helper";
import AuthLayout from "../../../layouts/AuthLayout";
export const authRouter = [
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/account/login",
        lazy: lazyLoad(() => import("../pages/LoginPage"))
      },
      {
        path: "/account/register",
        lazy: lazyLoad(() => import("../pages/SignupPage"))
      },
      {
        path: "/account/forgot-password",
        lazy: lazyLoad(() => import("../pages/ForgotPassword"))
      }
    ]
  }
];