import { Level } from './types';
import { level1 } from './level1';
import { level2 } from './level2';
import { level3 } from './level3';
import { level4 } from './level4';
import { level5 } from './level5';
import { level6 } from './level6';

export type { Level, Lesson, QuizQuestion, CourseData } from './types';

export const courseData: Level[] = [
  level1,
  level2,
  level3,
  level4,
  level5,
  level6,
];

export const totalLessons = courseData.reduce((sum, level) => sum + level.lessons.length, 0);
export const totalQuizzes = courseData.reduce((sum, level) => sum + level.lessons.reduce((s, l) => s + l.quiz.length, 0), 0);

export function getLevel(levelId: number): Level | undefined {
  return courseData.find(l => l.id === levelId);
}

export function getLesson(levelId: number, lessonId: string) {
  const level = getLevel(levelId);
  if (!level) return undefined;
  return level.lessons.find(l => l.id === lessonId);
}

export function getAllLessons() {
  return courseData.flatMap(level =>
    level.lessons.map(lesson => ({ ...lesson, levelId: level.id, levelTitle: level.title }))
  );
}
