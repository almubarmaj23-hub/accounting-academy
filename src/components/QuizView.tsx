'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { courses } from '@/lib/courses-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  BookOpen,
  Target,
} from 'lucide-react';

export default function QuizView() {
  const {
    selectedLessonId,
    selectedCourseId,
    selectLesson,
    setQuizScore,
    navigate,
  } = useAppStore();

  const course = courses.find((c) => c.id === selectedCourseId);
  const lesson = course?.lessons.find((l) => l.id === selectedLessonId);

  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>([]);

  if (!course || !lesson) return null;

  const quiz = lesson.quiz;
  const totalQuestions = quiz.length;
  const progressPercent = ((currentQ + (showResult ? 1 : 0)) / totalQuestions) * 100;

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    setAnswers([...answers, index]);
    if (index === quiz[currentQ].correctIndex) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ + 1 >= totalQuestions) {
      const finalScore = Math.round(((score) / totalQuestions) * 100);
      setQuizScore(lesson.id, finalScore);
      setIsFinished(true);
    } else {
      setCurrentQ(currentQ + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const restart = () => {
    setCurrentQ(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setIsFinished(false);
    setAnswers([]);
  };

  const finalScorePercent = Math.round((score / totalQuestions) * 100);
  const lessonIndex = course.lessons.findIndex((l) => l.id === selectedLessonId);
  const nextLesson = lessonIndex < course.lessons.length - 1 ? course.lessons[lessonIndex + 1] : null;
  const prevLesson = lessonIndex > 0 ? course.lessons[lessonIndex - 1] : null;

  if (isFinished) {
    const passed = finalScorePercent >= 60;
    return (
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className={`mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full ${
              passed ? 'bg-emerald-100' : 'bg-red-100'
            }`}>
              <Trophy className={`h-12 w-12 ${passed ? 'text-emerald-600' : 'text-red-500'}`} />
            </div>

            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              {passed ? '🎉 أحسنت! نجحت في الاختبار' : 'تحتاج للمزيد من المراجعة'}
            </h2>
            <p className="mb-6 text-gray-600">اختبار: {lesson.title}</p>

            <Card className="mb-6">
              <CardContent className="p-6">
                <div className={`text-5xl font-bold mb-2 ${passed ? 'text-emerald-600' : 'text-red-500'}`}>
                  {finalScorePercent}%
                </div>
                <p className="text-gray-500">
                  {score} من {totalQuestions} إجابات صحيحة
                </p>

                <div className="mt-4 space-y-2">
                  {quiz.map((q, i) => {
                    const isCorrect = answers[i] === q.correctIndex;
                    return (
                      <div key={i} className={`flex items-center gap-2 text-sm ${isCorrect ? 'text-emerald-600' : 'text-red-500'}`}>
                        {isCorrect ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                        <span>{q.question}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-3">
              <Button onClick={restart} variant="outline" className="rounded-full">
                <RotateCcw className="ml-2 h-4 w-4" />
                إعادة الاختبار
              </Button>
              <Button onClick={() => selectLesson(lesson.id)} className="rounded-full bg-emerald-600 hover:bg-emerald-700">
                <BookOpen className="ml-2 h-4 w-4" />
                مراجعة الدرس
              </Button>
              {nextLesson && (
                <Button onClick={() => selectLesson(nextLesson.id)} className="rounded-full">
                  الانتقال للدرس التالي
                  <ArrowLeft className="mr-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  const question = quiz[currentQ];

  return (
    <section className="py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Back */}
        <Button
          variant="ghost"
          onClick={() => selectLesson(lesson.id)}
          className="mb-6 text-gray-600"
        >
          <ArrowRight className="mr-2 h-4 w-4" />
          العودة للدرس
        </Button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              السؤال {currentQ + 1} من {totalQuestions}
            </span>
            <span className="flex items-center gap-1 text-sm text-emerald-600 font-bold">
              <Target className="h-4 w-4" />
              النتيجة: {score}/{currentQ + (showResult ? 1 : 0)}
            </span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
          >
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">{question.question}</h2>

                <div className="space-y-3">
                  {question.options.map((option, index) => {
                    let optionStyle = 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 cursor-pointer';

                    if (showResult) {
                      if (index === question.correctIndex) {
                        optionStyle = 'border-emerald-500 bg-emerald-50';
                      } else if (index === selectedAnswer && index !== question.correctIndex) {
                        optionStyle = 'border-red-500 bg-red-50';
                      } else {
                        optionStyle = 'border-gray-200 opacity-60';
                      }
                    } else if (selectedAnswer === index) {
                      optionStyle = 'border-emerald-500 bg-emerald-50';
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        className={`w-full flex items-center gap-3 rounded-xl border-2 p-4 text-right transition-all ${optionStyle}`}
                      >
                        <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold flex-shrink-0 ${
                          showResult && index === question.correctIndex
                            ? 'bg-emerald-500 text-white'
                            : showResult && index === selectedAnswer && index !== question.correctIndex
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {String.fromCharCode(1571 + index)}
                        </span>
                        <span className="text-sm md:text-base">{option}</span>
                        {showResult && index === question.correctIndex && (
                          <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mr-auto" />
                        )}
                        {showResult && index === selectedAnswer && index !== question.correctIndex && (
                          <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mr-auto" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                <AnimatePresence>
                  {showResult && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4"
                    >
                      <div className={`rounded-xl p-4 ${
                        selectedAnswer === question.correctIndex
                          ? 'bg-emerald-50 border border-emerald-200'
                          : 'bg-amber-50 border border-amber-200'
                      }`}>
                        <p className="text-sm font-bold mb-1">
                          {selectedAnswer === question.correctIndex ? '✅ إجابة صحيحة!' : '❌ إجابة خاطئة'}
                        </p>
                        <p className="text-sm text-gray-700">{question.explanation}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Next Button */}
        {showResult && (
          <div className="flex justify-center">
            <Button
              onClick={nextQuestion}
              className="rounded-full bg-emerald-600 hover:bg-emerald-700 px-8"
              size="lg"
            >
              {currentQ + 1 >= totalQuestions ? 'عرض النتيجة' : 'السؤال التالي'}
              <ArrowLeft className="mr-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
