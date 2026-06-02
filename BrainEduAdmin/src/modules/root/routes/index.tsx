import type { RouteObject } from "react-router";
import { lazyLoad } from "../../../utils/helper";
import { ProtectedRoute } from "../../../services/middeware";

export const rootRouter: RouteObject[] = [
  {
    path: "/admin/dashboard",
    lazy: lazyLoad(() => import("../pages/Dashboard"))
  },
  {
    path: "/admin/lessons",
    lazy: lazyLoad(() => import("../pages/Lessons"))
  },
  {
    path: "/admin/assignments",
    lazy: lazyLoad(() => import("../pages/Assignments"))
  },

  {
    path: "/admin/users",
    element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
    children: [{ index: true, lazy: lazyLoad(() => import("../pages/Users")) }]
  },
  {
    path: "/admin/categories",
    element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
    children: [{ index: true, lazy: lazyLoad(() => import("../pages/Categories.tsx")) }]
  },
  {
    path: "/admin/all-courses",
    element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
    children: [{ index: true, lazy: lazyLoad(() => import("../pages/Courses.tsx")) }]
  },
  {
    path: "/admin/instructors",
    element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
    children: [{ index: true, lazy: lazyLoad(() => import("../pages/Instructors")) }]
  },

  {
    path: "/admin/my-courses",
    element: <ProtectedRoute allowedRoles={["INSTRUCTOR"]} />,
    children: [{ index: true, lazy: lazyLoad(() => import("../pages/MyCourses.tsx")) }]
  }
];