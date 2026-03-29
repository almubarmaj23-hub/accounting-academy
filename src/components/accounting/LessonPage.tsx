'use client';
import { useAppStore } from '@/lib/store';
import { getLevel, getLesson } from '@/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ArrowRight, ChevronLeft, ChevronRight, CheckCircle,
  BookOpen, Lightbulb, ClipboardList
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function LessonPage() {
  const { selectedLevel, selectedLesson, selectLesson, navigate, markLessonComplete, completedLessons } = useAppStore();

  const level = selectedLevel ? getLevel(selectedLevel) : null;
  const lesson = level && selectedLesson !== null ? level.lessons[selectedLesson] : null;

  useEffect(() => {
    if (lesson) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [lesson]);

  if (!level || !lesson) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground">لم يتم اختيار درس</p>
        <Button onClick={() => navigate('courses')} className="mt-4">العودة للمسارات</Button>
      </div>
    );
  }

  const isCompleted = completedLessons[lesson.id];
  const currentIndex = level.lessons.findIndex(l => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? level.lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < level.lessons.length - 1 ? level.lessons[currentIndex + 1] : null;

  const goToLesson = (index: number) => {
    selectLesson(index);
  };

  const handleComplete = () => {
    if (!isCompleted) {
      markLessonComplete(lesson.id);
      fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: useAppStore.getState().sessionId,
          lessonId: lesson.id,
          completed: true,
          score: 0
        })
      }).catch(() => {});
    }
    navigate('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Button variant="ghost" onClick={() => { navigate('courses'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="mb-6 gap-1">
        <ArrowRight className="w-4 h-4" />
        العودة للدروس
      </Button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className="text-xs">المستوى {level.id}</Badge>
            <Badge variant="outline" className="text-xs">الدرس {currentIndex + 1} من {level.lessons.length}</Badge>
            {isCompleted && (
              <Badge className="bg-emerald-600 text-xs">
                <CheckCircle className="w-3 h-3 ml-1" />
                مكتمل
              </Badge>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-3">{lesson.title}</h1>
          <p className="text-muted-foreground leading-relaxed">{lesson.description}</p>
        </div>

        {/* Sidebar navigation for lessons */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="hidden lg:block w-64 shrink-0">
            <Card className="sticky top-20">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  قائمة الدروس
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <div className="max-h-[60vh] overflow-y-auto space-y-1">
                  {level.lessons.map((l, i) => (
                    <button
                      key={l.id}
                      onClick={() => goToLesson(i)}
                      className={`w-full text-right text-xs px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                        l.id === lesson.id
                          ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 font-bold'
                          : 'hover:bg-muted text-muted-foreground'
                      }`}
                    >
                      {completedLessons[l.id] ? (
                        <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" />
                      ) : (
                        <span className="w-3 h-3 rounded-full border shrink-0" />
                      )}
                      <span className="truncate">{l.title}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lesson Content */}
          <div className="flex-1 min-w-0">
            <Card className="mb-8">
              <CardContent className="p-6 md:p-8">
                <div className="lesson-content" dangerouslySetInnerHTML={{ __html: lesson.content }} />
              </CardContent>
            </Card>

            {/* Key Points */}
            <Card className="mb-8 border-emerald-200 dark:border-emerald-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lightbulb className="w-5 h-5 text-gold-600" />
                  النقاط الرئيسية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {lesson.keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Separator className="my-8" />

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {prevLesson ? (
                <Button variant="outline" onClick={() => goToLesson(currentIndex - 1)} className="gap-2">
                  <ArrowRight className="w-4 h-4" />
                  {prevLesson.title}
                </Button>
              ) : <div />}

              <Button onClick={handleComplete} className="bg-emerald-600 hover:bg-emerald-700 gap-2 min-w-[180px]">
                {isCompleted ? (
                  <>
                    <ClipboardList className="w-4 h-4" />
                    إعادة الاختبار
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    أكمل الدرس واختبر نفسك
                  </>
                )}
              </Button>

              {nextLesson ? (
                <Button variant="outline" onClick={() => goToLesson(currentIndex + 1)} className="gap-2">
                  {nextLesson.title}
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              ) : <div />}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
