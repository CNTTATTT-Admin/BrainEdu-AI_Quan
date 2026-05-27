import type { RouteObject } from "react-router";
import { lazyLoad } from "../../../utils/helper";

export const quizzRouter: RouteObject[] = [
  {
    path: "/quizz",
    lazy: lazyLoad(() => import("../pages/QuizPage"))
  }, 
  {
    path: "/quiz-result",
    lazy: lazyLoad(() => import("../pages/QuizResultPage"))
  },
  {
    path: '/quiz-review',
    lazy: lazyLoad(() => import("../pages/QuizReviewPage"))
  },
  {
    path: '/quiz-history',
    lazy: lazyLoad(() => import("../pages/SubmissionHistoryPage"))
  }
];