'use client';
import { useAppStore } from '@/lib/store';
import { getLevel } from '@/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, CheckCircle, XCircle, Trophy, RotateCcw, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import type { QuizQuestion, PageType } from '@/data/types';

function QuizInner({ lessonId, questions, title, navigate, markLessonComplete, setQuizScore, sessionId }: {
  lessonId: string;
  questions: QuizQuestion[];
  title: string;
  navigate: (page: PageType) => void;
  markLessonComplete: (id: string) => void;
  setQuizScore: (id: string, score: number) => void;
  sessionId: string;
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [quizFinished, setQuizFinished] = useState(false);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = index;
    setAnswers(newAnswers);
    if (index === question.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      const finalScore = Math.round((score / questions.length) * 100);
      setQuizFinished(true);
      setQuizScore(lessonId, finalScore);
      markLessonComplete(lessonId);
      fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, lessonId, completed: true, score: finalScore })
      }).catch(() => {});
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers(Array(questions.length).fill(null));
    setQuizFinished(false);
  };

  const finalScore = quizFinished ? Math.round((score / questions.length) * 100) : 0;

  if (quizFinished) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="text-center">
            <CardContent className="p-8 md:p-12">
              <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${finalScore >= 60 ? 'bg-emerald-100 dark:bg-emerald-900' : 'bg-red-100 dark:bg-red-900'}`}>
                <Trophy className={`w-12 h-12 ${finalScore >= 60 ? 'text-emerald-600' : 'text-red-600'}`} />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {finalScore >= 80 ? 'ممتاز!' : finalScore >= 60 ? 'جيد جداً!' : finalScore >= 40 ? 'لا بأس' : 'تحتاج مراجعة'}
              </h2>
              <p className="text-muted-foreground mb-6">{title}</p>
              <div className={`text-5xl font-extrabold mb-2 ${finalScore >= 60 ? 'text-emerald-600' : 'text-red-600'}`}>{finalScore}%</div>
              <p className="text-sm text-muted-foreground mb-8">{score} إجابة صحيحة من {questions.length} أسئلة</p>
              <div className="space-y-3 text-right mb-8">
                {questions.map((q, i) => {
                  const isCorrect = answers[i] === q.correctIndex;
                  return (
                    <div key={i} className={`flex items-start gap-2 p-3 rounded-lg text-sm ${isCorrect ? 'bg-emerald-50 dark:bg-emerald-950' : 'bg-red-50 dark:bg-red-950'}`}>
                      {isCorrect ? <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> : <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />}
                      <div>
                        <p className="font-medium">{q.question}</p>
                        {!isCorrect && <p className="text-xs text-muted-foreground mt-1">الإجابة الصحيحة: {q.options[q.correctIndex]}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={restartQuiz} variant="outline" className="gap-2"><RotateCcw className="w-4 h-4" />إعادة الاختبار</Button>
                <Button onClick={() => navigate('courses')} className="gap-2"><BookOpen className="w-4 h-4" />العودة للدروس</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Button variant="ghost" onClick={() => { navigate('lesson'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="mb-6 gap-1">
        <ArrowRight className="w-4 h-4" />العودة للدرس
      </Button>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-xl font-bold">اختبار: {title}</h1>
            <Badge variant="outline">السؤال {currentQuestion + 1} من {questions.length}</Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={currentQuestion} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold mb-6">{question.question}</h2>
                <div className="space-y-3">
                  {question.options.map((option, i) => {
                    let btnClass = 'border hover:border-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950 cursor-pointer';
                    if (showResult) {
                      if (i === question.correctIndex) btnClass = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950 text-emerald-700';
                      else if (i === selectedAnswer && i !== question.correctIndex) btnClass = 'border-red-500 bg-red-50 dark:bg-red-950 text-red-700';
                      else btnClass = 'border opacity-50';
                    } else if (i === selectedAnswer) btnClass = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950';
                    return (
                      <button key={i} onClick={() => handleAnswer(i)} disabled={showResult} className={`w-full text-right p-4 rounded-xl border transition-all flex items-center gap-3 ${btnClass}`}>
                        <span className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-sm font-bold shrink-0">{String.fromCharCode(1571 + i)}</span>
                        <span className="text-sm leading-relaxed">{option}</span>
                        {showResult && i === question.correctIndex && <CheckCircle className="w-5 h-5 text-emerald-600 mr-auto shrink-0" />}
                        {showResult && i === selectedAnswer && i !== question.correctIndex && <XCircle className="w-5 h-5 text-red-600 mr-auto shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
        {showResult && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex justify-between items-center">
              <p className="text-sm">
                {selectedAnswer === question.correctIndex ? (
                  <span className="text-emerald-600 font-medium">إجابة صحيحة! أحسنت</span>
                ) : (
                  <span className="text-red-600 font-medium">إجابة خاطئة. الإجابة الصحيحة موضحة بالأخضر.</span>
                )}
              </p>
              <Button onClick={nextQuestion} className="bg-emerald-600 hover:bg-emerald-700 gap-2">
                {currentQuestion < questions.length - 1 ? 'السؤال التالي' : 'عرض النتيجة'}
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default function QuizPage() {
  const { selectedLevel, selectedLesson, navigate, completedLessons, quizScores, markLessonComplete, setQuizScore, sessionId } = useAppStore();
  const level = selectedLevel ? getLevel(selectedLevel) : null;
  const lesson = level && selectedLesson !== null ? level.lessons[selectedLesson] : null;

  if (!level || !lesson) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground">لم يتم تحديد درس</p>
        <Button onClick={() => navigate('courses')} className="mt-4">العودة للمسارات</Button>
      </div>
    );
  }

  return <QuizInner key={lesson.id} lessonId={lesson.id} questions={lesson.quiz} title={lesson.title} navigate={navigate} markLessonComplete={markLessonComplete} setQuizScore={setQuizScore} sessionId={sessionId} />;
}
