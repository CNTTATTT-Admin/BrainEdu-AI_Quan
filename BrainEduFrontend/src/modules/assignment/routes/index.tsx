import type { RouteObject } from "react-router";
import { lazyLoad } from "../../../utils/helper";

export const assignmentRouter: RouteObject[] = [
  {
    path: "my-assignment",
    lazy: lazyLoad(() => import("../pages/MyAssignmentPage"))
  }
];