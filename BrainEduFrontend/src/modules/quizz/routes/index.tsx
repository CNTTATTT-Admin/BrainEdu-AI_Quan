import type { RouteObject } from "react-router";
import { lazyLoad } from "../../../utils/helper";

export const quizzRouter: RouteObject[] = [
  {
    path: "/quizz",
    lazy: lazyLoad(() => import("../pages/QuizPage"))
  }
];