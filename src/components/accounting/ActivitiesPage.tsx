'use client';
import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { activities, activitiesByCategory, type Activity } from '@/data/activities';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  ArrowRight, Dumbbell, BookOpen, Calculator, MonitorPlay,
  CheckCircle, XCircle, Trophy, RotateCcw, ChevronLeft,
  Lightbulb, Target, Award, FileText, PenTool, Package,
  BarChart3, Waves, TrendingDown, Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PageType } from '@/data/types';

const iconMap: Record<string, React.ElementType> = {
  Scale: Target, FileText, PenTool, Calculator, TrendingDown,
  Package, BarChart3, Waves, MonitorPlay, Dumbbell, Award
};

const categoryLabels: Record<string, string> = {
  exercise: 'تمارين عملية',
  'case-study': 'قضايا دراسية',
  calculation: 'تحديات حسابية',
  simulation: 'محاكاة تفاعلية',
};

const categoryColors: Record<string, string> = {
  exercise: '#059669',
  'case-study': '#D97706',
  calculation: '#7C3AED',
  simulation: '#0891B2',
};

const difficultyLabels: Record<string, string> = {
  beginner: 'مبتدئ',
  intermediate: 'متوسط',
  advanced: 'متقدم',
};

const difficultyColors: Record<string, string> = {
  beginner: 'bg-emerald-100 text-emerald-700',
  intermediate: 'bg-gold-100 text-gold-700',
  advanced: 'bg-red-100 text-red-700',
};

export default function ActivitiesPage() {
  const { navigate, completedActivities } = useAppStore();
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const totalActivities = activities.length;
  const completedCount = Object.keys(completedActivities).length;

  const startActivity = (activity: Activity) => {
    setSelectedActivity(activity);
    setAnswers({});
    setShowResults(false);
    setCurrentQ(0);
    setShowHint(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submitAnswer = () => {
    setShowHint(false);
    if (currentQ < selectedActivity!.questions.length - 1) {
      setCurrentQ(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const restart = () => {
    setAnswers({});
    setShowResults(false);
    setCurrentQ(0);
    setShowHint(false);
  };

  const finishActivity = () => {
    if (selectedActivity) {
      useAppStore.getState().markActivityComplete(selectedActivity.id);
    }
    setSelectedActivity(null);
  };

  if (selectedActivity) {
    const question = selectedActivity.questions[currentQ];
    const isLast = currentQ === selectedActivity.questions.length - 1;
    const progress = ((currentQ + 1) / selectedActivity.questions.length) * 100;

    if (showResults) {
      const score = selectedActivity.questions.reduce((s, q, i) => {
        const answer = answers[i] || '';
        const isCorrect = answer.toLowerCase().includes(q.correctAnswer.toLowerCase()) ||
                          q.correctAnswer.toLowerCase().includes(answer.toLowerCase());
        return s + (isCorrect ? 1 : 0);
      }, 0);
      const percentage = Math.round((score / selectedActivity.questions.length) * 100);

      return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <Button variant="ghost" onClick={() => { setSelectedActivity(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="mb-6 gap-1">
            <ArrowRight className="w-4 h-4" />العودة للأنشطة
          </Button>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <Card className="text-center">
              <CardContent className="p-8 md:p-12">
                <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${percentage >= 60 ? 'bg-emerald-100 dark:bg-emerald-900' : 'bg-red-100 dark:bg-red-900'}`}>
                  <Trophy className={`w-10 h-10 ${percentage >= 60 ? 'text-emerald-600' : 'text-red-600'}`} />
                </div>
                <h2 className="text-2xl font-bold mb-2">{selectedActivity.title}</h2>
                <div className={`text-4xl font-extrabold my-4 ${percentage >= 60 ? 'text-emerald-600' : 'text-red-600'}`}>{percentage}%</div>
                <p className="text-muted-foreground mb-6">{score} إجابة صحيحة من {selectedActivity.questions.length} أسئلة</p>
                <div className="space-y-2 text-right mb-8">
                  {selectedActivity.questions.map((q, i) => {
                    const userAnswer = answers[i] || 'لم تُجب';
                    const isCorrect = userAnswer.toLowerCase().includes(q.correctAnswer.toLowerCase()) ||
                                      q.correctAnswer.toLowerCase().includes(userAnswer.toLowerCase());
                    return (
                      <div key={i} className={`flex items-start gap-2 p-3 rounded-lg text-sm ${isCorrect ? 'bg-emerald-50 dark:bg-emerald-950' : 'bg-red-50 dark:bg-red-950'}`}>
                        {isCorrect ? <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> : <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />}
                        <div className="flex-1">
                          <p className="font-medium">{q.question}</p>
                          {!isCorrect && <p className="text-xs text-muted-foreground mt-1">إجابتك: {userAnswer} | الإجابة الصحيحة: {q.correctAnswer}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={restart} variant="outline" className="gap-2"><RotateCcw className="w-4 h-4" />إعادة المحاولة</Button>
                  <Button onClick={finishActivity} className="bg-emerald-600 hover:bg-emerald-700 gap-2"><CheckCircle className="w-4 h-4" />إنهاء النشاط</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Button variant="ghost" onClick={() => { setSelectedActivity(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="mb-6 gap-1">
          <ArrowRight className="w-4 h-4" />العودة للأنشطة
        </Button>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge style={{ backgroundColor: categoryColors[selectedActivity.category] + '20', color: categoryColors[selectedActivity.category] }}>
                {categoryLabels[selectedActivity.category]}
              </Badge>
              <Badge className={difficultyColors[selectedActivity.difficulty]}>
                {difficultyLabels[selectedActivity.difficulty]}
              </Badge>
            </div>
            <h1 className="text-2xl font-bold mb-2">{selectedActivity.title}</h1>
            <p className="text-muted-foreground">{selectedActivity.description}</p>
          </div>

          <div className="bg-muted/50 rounded-xl p-4 mb-6">
            <h3 className="text-sm font-bold mb-2 flex items-center gap-1"><Lightbulb className="w-4 h-4 text-gold-600" />التعليمات:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
              {selectedActivity.instructions.map((inst, i) => <li key={i}>{inst}</li>)}
            </ol>
          </div>

          <div dangerouslySetInnerHTML={{ __html: selectedActivity.content }} className="lesson-content mb-6" />

          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">السؤال {currentQ + 1} من {selectedActivity.questions.length}</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={currentQ} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <Card className="mb-4">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {question.type === 'multiple-choice' ? 'اختيار من متعدد' :
                       question.type === 'true-false' ? 'صح أم خطأ' :
                       question.type === 'fill-blank' ? 'أكمل الفراغ' : 'حساب'}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold mb-4">{question.question}</h3>

                  {question.type === 'multiple-choice' && question.options && (
                    <div className="space-y-2">
                      {question.options.map((opt, i) => (
                        <button key={i} onClick={() => setAnswers(prev => ({ ...prev, [currentQ]: opt }))}
                          className={`w-full text-right p-3 rounded-xl border transition-all flex items-center gap-3 text-sm
                            ${answers[currentQ] === opt ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950 font-bold' : 'hover:border-emerald-300 hover:bg-emerald-50/50 cursor-pointer'}`}>
                          <span className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center text-xs font-bold shrink-0">
                            {String.fromCharCode(1571 + i)}
                          </span>
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {question.type === 'true-false' && (
                    <div className="flex gap-3">
                      {[{ label: 'صحيح', value: 'صحيح' }, { label: 'خطأ', value: 'خطأ' }].map(opt => (
                        <button key={opt.value} onClick={() => setAnswers(prev => ({ ...prev, [currentQ]: opt.value }))}
                          className={`flex-1 p-4 rounded-xl border text-center font-bold transition-all
                            ${answers[currentQ] === opt.value ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950' : 'hover:border-emerald-300 cursor-pointer'}`}>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {(question.type === 'fill-blank' || question.type === 'calculation') && (
                    <Input placeholder="أكتب إجابتك هنا..."
                      value={answers[currentQ] || ''}
                      onChange={(e) => setAnswers(prev => ({ ...prev, [currentQ]: e.target.value }))}
                      className="text-lg" dir="ltr" />
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between">
            <div>
              {question.hint && (
                <Button variant="ghost" size="sm" onClick={() => setShowHint(!showHint)} className="text-gold-600 gap-1">
                  <Lightbulb className="w-4 h-4" />{showHint ? 'إخفاء التلميح' : 'عرض التلميح'}
                </Button>
              )}
            </div>
            <Button onClick={submitAnswer} disabled={!answers[currentQ]} className="bg-emerald-600 hover:bg-emerald-700 gap-2">
              {isLast ? 'عرض النتيجة' : 'السؤال التالي'}
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </div>

          {showHint && question.hint && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="mt-3 p-3 bg-gold-50 dark:bg-gold-950/30 rounded-lg border border-gold-200 dark:border-gold-900 text-sm">
                <span className="font-bold text-gold-700">💡 تلميح: </span>
                <span className="text-gold-900">{question.hint}</span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">الأنشطة والتطبيقات العملية</h1>
        <p className="text-muted-foreground">طوّر مهاراتك من خلال تمارين عملية، قضايا دراسية، ومحاكاة تفاعلية</p>
        <div className="flex items-center gap-4 mt-4">
          <Badge variant="outline">{completedCount} من {totalActivities} مكتمل</Badge>
          <Badge variant="outline">{Math.round((completedCount / totalActivities) * 100)}% إنجاز</Badge>
        </div>
      </div>

      {(['exercise', 'case-study', 'calculation', 'simulation'] as const).map((cat) => (
        <section key={cat} className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <div className="w-2 h-6 rounded-full" style={{ backgroundColor: categoryColors[cat] }} />
            {categoryLabels[cat]}
            <Badge variant="secondary" className="text-xs">{activitiesByCategory[cat].length}</Badge>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activitiesByCategory[cat].map((activity) => {
              const IconComp = iconMap[activity.icon] || Dumbbell;
              const isComplete = completedActivities[activity.id];
              return (
                <motion.div key={activity.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <Card className={`h-full hover:shadow-lg transition-all cursor-pointer group ${isComplete ? 'border-emerald-200 dark:border-emerald-800' : ''}`}
                    onClick={() => startActivity(activity)}>
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isComplete ? 'bg-emerald-600' : ''}`}
                          style={!isComplete ? { backgroundColor: categoryColors[activity.category] + '15' } : {}}>
                          {isComplete ? <CheckCircle className="w-5 h-5 text-white" /> : <IconComp className="w-5 h-5" style={{ color: categoryColors[activity.category] }} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-sm mb-1 group-hover:text-emerald-700 transition-colors">{activity.title}</h3>
                          <p className="text-xs text-muted-foreground line-clamp-2">{activity.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-[10px] px-1.5">{activity.questions.length} أسئلة</Badge>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded ${difficultyColors[activity.difficulty]}`}>
                              {difficultyLabels[activity.difficulty]}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
