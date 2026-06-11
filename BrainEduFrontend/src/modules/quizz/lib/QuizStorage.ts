// lib/QuizStorage.ts

export interface QuizSessionData {
  quizId: number;
  lessonId: number;
  answers: Record<number, number>;
  currentIndex: number;
  serverStartTime: number;
  localSaveTime: number;
  tabViolations: number;
  pendingSubmit?: {
    payload: PendingPayload;
    savedAt: number;
  };
}

export interface PendingPayload {
  quizId: number;
  durationSeconds: number;
  answers: { questionId: number; answerId: number }[];
}

const PREFIX = 'quiz_session_';
const ACTIVE_KEY = 'quiz_active_lessonId'; // key tra cứu lessonId khi state mất
const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 giờ

export const QuizStorage = {
  key(quizId: number) {
    return `${PREFIX}${quizId}`;
  },

  // Lưu lessonId riêng để có thể tra cứu khi location.state bị mất (đóng/mở tab)
  saveActiveLessonId(lessonId: number) {
    try {
      localStorage.setItem(ACTIVE_KEY, String(lessonId));
    } catch {}
  },

  loadActiveLessonId(): number | null {
    try {
      const raw = localStorage.getItem(ACTIVE_KEY);
      if (!raw) return null;
      const parsed = Number(raw);
      return isNaN(parsed) ? null : parsed;
    } catch {
      return null;
    }
  },

  clearActiveLessonId() {
    localStorage.removeItem(ACTIVE_KEY);
  },

  save(data: QuizSessionData) {
    try {
      const toSave: QuizSessionData = { ...data, localSaveTime: Date.now() };
      localStorage.setItem(this.key(data.quizId), JSON.stringify(toSave));
      // Luôn đồng bộ lessonId pointer
      this.saveActiveLessonId(data.lessonId);
    } catch (e) {
      console.warn('[QuizStorage] save failed:', e);
    }
  },

  load(quizId: number): QuizSessionData | null {
    try {
      const raw = localStorage.getItem(this.key(quizId));
      if (!raw) return null;
      const data: QuizSessionData = JSON.parse(raw);
      if (Date.now() - data.localSaveTime > SESSION_TTL_MS) {
        this.clear(quizId);
        return null;
      }
      return data;
    } catch {
      return null;
    }
  },

  // Tìm session đang active dựa vào lessonId (dùng khi không có quizId)
  loadByLessonId(lessonId: number): QuizSessionData | null {
    try {
      // Duyệt localStorage tìm session khớp lessonId
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key?.startsWith(PREFIX)) continue;
        const raw = localStorage.getItem(key);
        if (!raw) continue;
        const data: QuizSessionData = JSON.parse(raw);
        if (data.lessonId === lessonId) {
          if (Date.now() - data.localSaveTime > SESSION_TTL_MS) {
            this.clear(data.quizId);
            return null;
          }
          return data;
        }
      }
      return null;
    } catch {
      return null;
    }
  },

  clear(quizId: number) {
    localStorage.removeItem(this.key(quizId));
    this.clearActiveLessonId();
  },

  savePendingSubmit(quizId: number, payload: PendingPayload) {
    const existing = this.load(quizId);
    if (!existing) return;
    this.save({ ...existing, pendingSubmit: { payload, savedAt: Date.now() } });
  },

  clearPendingSubmit(quizId: number) {
    const existing = this.load(quizId);
    if (!existing) return;
    const { pendingSubmit: _, ...rest } = existing;
    this.save(rest as QuizSessionData);
  },
};