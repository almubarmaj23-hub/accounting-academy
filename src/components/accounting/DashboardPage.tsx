'use client';
import { useAppStore } from '@/lib/store';
import { courseData } from '@/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Trophy, BookOpen, Target, TrendingUp, Star, Award
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const { completedLessons, quizScores } = useAppStore();

  const totalLessonsCount = courseData.reduce((sum, level) => sum + level.lessons.length, 0);
  const completedCount = Object.keys(completedLessons).length;
  const overallProgress = (completedCount / totalLessonsCount) * 100;

  const quizEntries = Object.entries(quizScores);
  const averageScore = quizEntries.length > 0
    ? Math.round(quizEntries.reduce((sum, [, score]) => sum + score, 0) / quizEntries.length)
    : 0;

  const levelProgress = courseData.map(level => {
    const completed = level.lessons.filter(l => completedLessons[l.id]).length;
    const total = level.lessons.length;
    return {
      id: level.id,
      title: level.title,
      color: level.color,
      completed,
      total,
      progress: (completed / total) * 100,
    };
  });

  const getGrade = (score: number) => {
    if (score >= 90) return { label: 'ممتاز', color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-900' };
    if (score >= 75) return { label: 'جيد جداً', color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900' };
    if (score >= 60) return { label: 'جيد', color: 'text-gold-600', bg: 'bg-gold-100 dark:bg-gold-900' };
    return { label: 'يحتاج تحسين', color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900' };
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">لوحة التقدم</h1>
        <p className="text-muted-foreground mb-8">تتبع تقدمك في رحلة تعلم المحاسبة المالية</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <BookOpen className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
              <div className="text-2xl font-extrabold">{completedCount}</div>
              <div className="text-xs text-muted-foreground">دروس مكتملة</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="w-6 h-6 mx-auto mb-2 text-gold-600" />
              <div className="text-2xl font-extrabold">{Math.round(overallProgress)}%</div>
              <div className="text-xs text-muted-foreground">نسبة الإنجاز</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="w-6 h-6 mx-auto mb-2 text-gold-600" />
              <div className="text-2xl font-extrabold">{quizEntries.length}</div>
              <div className="text-xs text-muted-foreground">اختبار مُنجز</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
              <div className="text-2xl font-extrabold">{averageScore}%</div>
              <div className="text-xs text-muted-foreground">متوسط الدرجات</div>
            </CardContent>
          </Card>
        </div>

        {/* Overall Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              التقدم العام
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={overallProgress} className="h-4 mb-3" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{completedCount} من {totalLessonsCount} درس</span>
              <span>{Math.round(overallProgress)}%</span>
            </div>
          </CardContent>
        </Card>

        {/* Level Progress */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-600" />
            التقدم حسب المستوى
          </h2>
          <div className="space-y-4">
            {levelProgress.map((lp) => (
              <Card key={lp.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">المستوى {lp.id}</Badge>
                      <span className="text-sm font-medium">{lp.title}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{lp.completed}/{lp.total}</span>
                  </div>
                  <Progress value={lp.progress} className="h-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quiz Results */}
        {quizEntries.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-gold-600" />
              نتائج الاختبارات
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quizEntries.map(([lessonId, score]) => {
                const grade = getGrade(score);
                const allLessons = courseData.flatMap(l => l.lessons);
                const lesson = allLessons.find(l => l.id === lessonId);
                return (
                  <Card key={lessonId}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{lesson?.title || lessonId}</p>
                          <Badge variant="outline" className={`text-[10px] mt-1 ${grade.color}`}>
                            {grade.label}
                          </Badge>
                        </div>
                        <div className="text-2xl font-extrabold mr-3" style={{ color: score >= 60 ? '#059669' : '#DC2626' }}>
                          {score}%
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
