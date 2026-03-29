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
