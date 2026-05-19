import type { RouteObject } from "react-router";
import { lazyLoad } from "../../../utils/helper";

export const courseRouter: RouteObject[] = [
  {
    path: "course",
    lazy: lazyLoad(() => import("../pages/CourseLearnPage"))
  }
];