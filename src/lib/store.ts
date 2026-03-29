import { create } from 'zustand'

export type PageType = 'home' | 'courses' | 'lesson' | 'quiz' | 'dashboard' | 'activities' | 'activity-detail'

interface AppState {
  currentPage: PageType
  selectedLevel: number | null
  selectedLesson: number | null
  completedLessons: Record<string, boolean>
  quizScores: Record<string, number>
  completedActivities: Record<string, boolean>
  sessionId: string
  navigate: (page: PageType) => void
  selectLevel: (levelId: number) => void
  selectLesson: (lessonId: number) => void
  markLessonComplete: (lessonId: string) => void
  setQuizScore: (lessonId: string, score: number) => void
  markActivityComplete: (activityId: string) => void
  getTotalProgress: () => number
}

const getSessionId = () => {
  if (typeof window === 'undefined') return ''
  let id = localStorage.getItem('accounting_session_id')
  if (!id) {
    id = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
    localStorage.setItem('accounting_session_id', id)
  }
  return id
}

export const useAppStore = create<AppState>((set, get) => ({
  currentPage: 'home',
  selectedLevel: null,
  selectedLesson: null,
  completedLessons: {},
  quizScores: {},
  completedActivities: {},
  sessionId: getSessionId(),

  navigate: (page) => set({ currentPage: page }),
  selectLevel: (levelId) => set({ selectedLevel: levelId, selectedLesson: null }),
  selectLesson: (lessonId) => set({ selectedLesson: lessonId }),
  markLessonComplete: (lessonId) => set((state) => ({
    completedLessons: { ...state.completedLessons, [lessonId]: true }
  })),
  setQuizScore: (lessonId, score) => set((state) => ({
    quizScores: { ...state.quizScores, [lessonId]: score }
  })),
  markActivityComplete: (activityId) => set((state) => ({
    completedActivities: { ...state.completedActivities, [activityId]: true }
  })),
  getTotalProgress: () => {
    const state = get()
    return Object.keys(state.completedLessons).length
  }
}))
