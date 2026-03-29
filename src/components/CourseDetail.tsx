'use client';

import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { courses } from '@/lib/courses-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  ArrowRight,
  BookOpen,
  Clock,
  CheckCircle2,
  Circle,
  PlayCircle,
  Award,
} from 'lucide-react';

const levelColors = [
  'bg-emerald-600',
  'bg-teal-600',
  'bg-green-700',
  'bg-amber-600',
];

export default function CourseDetail() {
  const { selectedCourseId, selectLesson, completedLessons, navigate, quizScores } = useAppStore();

  const course = courses.find((c) => c.id === selectedCourseId);
  if (!course) return null;

  const completedInCourse = course.lessons.filter((l) =>
    completedLessons.includes(l.id)
  ).length;
  const progress = (completedInCourse / course.lessons.length) * 100;
  const passedQuizzes = course.lessons.filter(
    (l) => quizScores[l.id] !== undefined && quizScores[l.id] >= 60
  ).length;

  return (
    <section className="py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('courses')}
          className="mb-6 text-gray-600 hover:text-gray-900"
        >
          <ArrowRight className="mr-2 h-4 w-4" />
          العودة للمسارات التعليمية
        </Button>

        {/* Course Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className={`rounded-full px-3 py-1 text-xs font-bold text-white ${levelColors[course.level - 1]}`}>
              المستوى {course.level}
            </span>
            <span className="flex items-center gap-1 text-sm text-gray-500">
              <Award className="h-4 w-4 text-amber-500" />
              {passedQuizzes} اختبار ناجح
            </span>
          </div>

          <h1 className="mb-2 text-3xl font-bold text-gray-900">{course.title}</h1>
          <p className="mb-4 text-gray-500">{course.subtitle}</p>
          <p className="text-gray-600 leading-relaxed max-w-2xl">{course.description}</p>

          <div className="mt-6 max-w-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">التقدم الكلي</span>
              <span className="text-sm font-bold text-gray-900">
                {completedInCourse} / {course.lessons.length} درس
              </span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        </motion.div>

        {/* Lessons List */}
        <div className="space-y-4">
          {course.lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.id);
            const hasPassedQuiz = quizScores[lesson.id] !== undefined && quizScores[lesson.id] >= 60;

            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <Card
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    isCompleted ? 'border-emerald-200 bg-emerald-50/30' : ''
                  }`}
                  onClick={() => selectLesson(lesson.id)}
                >
                  <CardContent className="flex items-center gap-4 p-4">
                    {/* Number / Status */}
                    <div className="flex-shrink-0">
                      {isCompleted ? (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                        </div>
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                          <PlayCircle className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-gray-400">الدرس {index + 1}</span>
                        {hasPassedQuiz && (
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700">
                            Quiz ✓
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-gray-900 truncate">{lesson.title}</h3>
                      <p className="text-sm text-gray-500 truncate">{lesson.description}</p>
                    </div>

                    {/* Meta */}
                    <div className="hidden sm:flex items-center gap-3 text-xs text-gray-400 flex-shrink-0">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {lesson.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3.5 w-3.5" />
                        {lesson.quiz.length} أسئلة
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
