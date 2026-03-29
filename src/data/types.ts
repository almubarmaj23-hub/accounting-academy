export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  quiz: QuizQuestion[];
  keyPoints: string[];
}

export interface Level {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  lessons: Lesson[];
}

export interface CourseData {
  levels: Level[];
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  category: 'exercise' | 'case-study' | 'calculation' | 'simulation';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  icon: string;
  levelId: number;
  content: string;
  questions: ActivityQuestion[];
  instructions: string[];
}

export interface ActivityQuestion {
  question: string;
  type: 'multiple-choice' | 'fill-blank' | 'true-false' | 'calculation';
  options?: string[];
  correctAnswer: string;
  hint?: string;
}
