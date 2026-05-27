export type EventName = 
  | 'course_view'
  | 'lesson_start'
  | 'lesson_complete'
  | 'quiz_submit'
  | 'search'
  | 'roadmap_click'
  | 'course_enroll'
  | 'course_complete'
  | 'video_pause'
  | 'video_resume'
  | 'roadmap_generate';

export interface BaseTrackingEvent {
  eventName: EventName;
  timestamp: string;
  sessionId: string;
  pageUrl: string;
  userAgent?: string;
}

export interface TrackingPayloads {
  course_view: {
    courseId: number;
  };

  lesson_start: {
    courseId: number;
    lessonId: number;
    lessonTitle?: string;
    watchPosition?: number;
  };

  lesson_complete: {
    courseId: number;
    lessonId: number;
    lessonTitle?: string;
    learningTime: number;
    completionRate?: number;
    isManualClick?: boolean;
  };

  quiz_submit: {
    courseId?: number;
    lessonId?: number;
    quizId: number;
    score: number;
    totalQuestions: number;
    isPassed: boolean;
  };

  search: {
    keyword: string;
    resultsCount: number;
    searchLocation: 'header' | 'explore_page';
  };

  roadmap_click: {
    roadmapId: number;
    stepIndex?: number;
  };

  course_enroll: {
    courseId: number;
    source?: string;
  };

  course_complete: {
    courseId: number;
    finalScore?: number;
  };

  video_pause: {
    lessonId: number;
    currentPosition: number;
  };

  video_resume: {
    lessonId: number;
    currentPosition: number;
  };

  roadmap_generate: {
    promptKeywords?: string[];
    targetRole: string;
  };
}

export type TrackingEvent<T extends EventName> = BaseTrackingEvent & {
  eventName: T;
  metadata: string;
};