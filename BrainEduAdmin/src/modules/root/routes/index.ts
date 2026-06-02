import type { RouteObject } from "react-router";
import { lazyLoad } from "../../../utils/helper";

export const rootRouter: RouteObject[] = [
  {
    index: true,
    lazy: lazyLoad(() => import("../pages/Main"))
  },
  {
    path: "/admin/dashboard",
    lazy: lazyLoad(() => import("../pages/Dashboard"))
  }
];