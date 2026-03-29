'use client';
import { useAppStore } from '@/lib/store';
import { courseData, getLevel } from '@/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen, ArrowRight, CheckCircle, ChevronLeft,
  Lock, Star, GraduationCap
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function CoursesPage() {
  const { selectedLevel, selectLevel, selectLesson, navigate, completedLessons, quizScores } = useAppStore();
  const currentLevel = selectedLevel ? getLevel(selectedLevel) : null;

  if (!currentLevel) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">المسارات التعليمية</h2>
          <p className="text-muted-foreground">اختر المستوى الذي تريد البدء به</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseData.map((level, i) => {
            const completedCount = level.lessons.filter(l => completedLessons[l.id]).length;
            const progress = (completedCount / level.lessons.length) * 100;
            return (
              <motion.div key={level.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <Card
                  className="h-full hover:shadow-lg transition-all cursor-pointer group"
                  onClick={() => selectLevel(level.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="text-xs" style={{ backgroundColor: level.color + '20', color: level.color }}>المستوى {level.id}</Badge>
                      <Badge variant="outline" className="text-xs">{level.lessons.length} دروس</Badge>
                    </div>
                    <h3 className="font-bold text-lg mb-2">{level.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{level.description}</p>
                    <Progress value={progress} className="h-2 mb-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{completedCount} / {level.lessons.length} دروس</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  const completedCount = currentLevel.lessons.filter(l => completedLessons[l.id]).length;
  const progress = (completedCount / currentLevel.lessons.length) * 100;

  const handleLessonClick = (lessonId: string) => {
    selectLesson(currentLevel.lessons.findIndex(l => l.id === lessonId));
    navigate('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={() => selectLevel(null)} className="mb-6 gap-1">
        <ArrowRight className="w-4 h-4" />
        العودة للمستويات
      </Button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8">
          <Badge className="mb-3" style={{ backgroundColor: currentLevel.color + '20', color: currentLevel.color }}>
            المستوى {currentLevel.id}
          </Badge>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{currentLevel.title}</h1>
          <p className="text-muted-foreground mb-4">{currentLevel.description}</p>
          <Progress value={progress} className="h-3 max-w-md" />
          <div className="text-sm text-muted-foreground mt-2">
            التقدم: {completedCount} / {currentLevel.lessons.length} دروس ({Math.round(progress)}%)
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentLevel.lessons.map((lesson, i) => {
            const isCompleted = completedLessons[lesson.id];
            const hasQuizScore = quizScores[lesson.id] !== undefined;
            return (
              <motion.div key={lesson.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card
                  className={`h-full hover:shadow-lg transition-all cursor-pointer group ${isCompleted ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20' : ''}`}
                  onClick={() => handleLessonClick(lesson.id)}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isCompleted ? 'bg-emerald-600' : 'bg-muted'}`}>
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : (
                          <span className="text-sm font-bold text-muted-foreground">{i + 1}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sm mb-1 group-hover:text-emerald-700 transition-colors">
                          {lesson.title}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{lesson.description}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <Badge variant="outline" className="text-[10px] px-1.5">{lesson.quiz.length} أسئلة</Badge>
                          {hasQuizScore && (
                            <span className="text-[10px] font-bold text-emerald-600">
                              <Star className="w-3 h-3 inline ml-0.5" />
                              {quizScores[lesson.id]}%
                            </span>
                          )}
                        </div>
                      </div>
                      <ChevronLeft className="w-4 h-4 text-muted-foreground shrink-0 group-hover:text-emerald-600 transition-colors mt-1" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
