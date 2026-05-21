import type { RouteObject } from "react-router";
import { lazyLoad } from "../../../utils/helper";

export const pathwayRouter: RouteObject[] = [
  {
    path: "/pathways",
    lazy: lazyLoad(() => import("../pages/LearningPathPage"))
  }
];