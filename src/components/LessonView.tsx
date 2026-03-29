'use client';

import { useAppStore } from '@/lib/store';
import { courses } from '@/lib/courses-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Circle,
  BookOpen,
  Clock,
  HelpCircle,
  ListOrdered,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';

export default function LessonView() {
  const {
    selectedLessonId,
    selectedCourseId,
    completedLessons,
    toggleLessonComplete,
    navigate,
    selectLesson,
  } = useAppStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const course = courses.find((c) => c.id === selectedCourseId);
  if (!course) return null;

  const lessonIndex = course.lessons.findIndex((l) => l.id === selectedLessonId);
  const lesson = course.lessons[lessonIndex];
  if (!lesson) return null;

  const isCompleted = completedLessons.includes(lesson.id);
  const prevLesson = lessonIndex > 0 ? course.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < course.lessons.length - 1 ? course.lessons[lessonIndex + 1] : null;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-6xl py-6 px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
          <button onClick={() => navigate('home')} className="hover:text-emerald-600">الرئيسية</button>
          <span>/</span>
          <button onClick={() => navigate('courses')} className="hover:text-emerald-600">المسارات</button>
          <span>/</span>
          <button onClick={() => navigate('course-detail')} className="hover:text-emerald-600">{course.title}</button>
          <span>/</span>
          <span className="text-gray-900 font-medium">{lesson.title}</span>
        </div>

        <div className="flex gap-6">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <Card className="sticky top-20">
              <CardContent className="p-4">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <ListOrdered className="h-4 w-4 text-emerald-600" />
                  دروس المستوى
                </h3>
                <ScrollArea className="max-h-[60vh]">
                  <div className="space-y-1">
                    {course.lessons.map((l, i) => (
                      <button
                        key={l.id}
                        onClick={() => selectLesson(l.id)}
                        className={`w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-right transition-colors ${
                          l.id === selectedLessonId
                            ? 'bg-emerald-50 text-emerald-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {completedLessons.includes(l.id) ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        ) : (
                          <Circle className="h-4 w-4 text-gray-300 flex-shrink-0" />
                        )}
                        <span className="truncate">{i + 1}. {l.title}</span>
                      </button>
                    ))}
                  </div>
                </ScrollArea>

                <div className="mt-4 pt-4 border-t">
                  <div className="text-sm text-gray-500 mb-1">تقدم المستوى</div>
                  <Progress
                    value={(completedLessons.filter((id) => course.lessons.some((l) => l.id === id)).length / course.lessons.length) * 100}
                    className="h-2"
                  />
                  <div className="text-xs text-gray-400 mt-1">
                    {completedLessons.filter((id) => course.lessons.some((l) => l.id === id)).length}/{course.lessons.length} مكتمل
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Mobile Sidebar Toggle */}
          <Button
            variant="outline"
            className="lg:hidden fixed bottom-4 left-4 z-40 rounded-full shadow-lg"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {sidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-30 bg-black/50" onClick={() => setSidebarOpen(false)}>
              <aside className="absolute bottom-16 left-4 right-4 max-w-sm mx-auto bg-white rounded-2xl shadow-2xl p-4" onClick={(e) => e.stopPropagation()}>
                <h3 className="font-bold text-gray-900 mb-3">دروس المستوى</h3>
                <ScrollArea className="max-h-64">
                  <div className="space-y-1">
                    {course.lessons.map((l, i) => (
                      <button
                        key={l.id}
                        onClick={() => { selectLesson(l.id); setSidebarOpen(false); }}
                        className={`w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-right ${
                          l.id === selectedLessonId
                            ? 'bg-emerald-50 text-emerald-700 font-medium'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {completedLessons.includes(l.id) ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <Circle className="h-4 w-4 text-gray-300" />
                        )}
                        <span className="truncate">{i + 1}. {l.title}</span>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </aside>
            </div>
          )}

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Lesson Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  الدرس {lessonIndex + 1} من {course.lessons.length}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {lesson.duration}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{lesson.title}</h1>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mb-6">
                <Button
                  variant={isCompleted ? 'secondary' : 'default'}
                  onClick={() => toggleLessonComplete(lesson.id)}
                  className={`rounded-full ${isCompleted ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-emerald-600 hover:bg-emerald-700'}`}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle2 className="ml-2 h-4 w-4" />
                      مكتمل ✓
                    </>
                  ) : (
                    'تعليم كمكتمل'
                  )}
                </Button>
              </div>
            </div>

            {/* Lesson Content */}
            <Card className="mb-8">
              <CardContent className="p-6 md:p-8">
                <div
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-li:text-gray-700 prose-table:text-sm"
                  dangerouslySetInnerHTML={{ __html: lesson.content }}
                />
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4 pb-12">
              {prevLesson ? (
                <Button
                  variant="outline"
                  onClick={() => selectLesson(prevLesson.id)}
                  className="rounded-full"
                >
                  <ArrowRight className="ml-2 h-4 w-4" />
                  {prevLesson.title}
                </Button>
              ) : (
                <div />
              )}

              {nextLesson ? (
                <Button
                  onClick={() => selectLesson(nextLesson.id)}
                  className="rounded-full bg-emerald-600 hover:bg-emerald-700"
                >
                  {nextLesson.title}
                  <ArrowLeft className="mr-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={() => navigate('course-detail')}
                  className="rounded-full bg-amber-500 hover:bg-amber-600"
                >
                  إتمام المستوى
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
