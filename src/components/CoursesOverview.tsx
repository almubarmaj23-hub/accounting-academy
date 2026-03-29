'use client';

import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { courses } from '@/lib/courses-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, CheckCircle2, BookOpen, Clock } from 'lucide-react';
import Image from 'next/image';

const levelLabels = ['المستوى التمهيدي', 'المستوى المتوسط', 'المستوى المتقدم', 'المستوى الاحترافي'];
const levelColors = [
  { bg: 'bg-emerald-600', light: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', progress: 'bg-emerald-500' },
  { bg: 'bg-teal-600', light: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200', progress: 'bg-teal-500' },
  { bg: 'bg-green-700', light: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', progress: 'bg-green-500' },
  { bg: 'bg-amber-600', light: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', progress: 'bg-amber-500' },
];

export default function CoursesOverview() {
  const { selectCourse, completedLessons } = useAppStore();

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            المسارات <span className="text-emerald-600">التعليمية</span>
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            أربعة مستويات تعليمية متدرجة تأخذك من الصفر حتى الاحتراف في المحاسبة المالية
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {courses.map((course, index) => {
            const colors = levelColors[index];
            const completedInCourse = course.lessons.filter((l) =>
              completedLessons.includes(l.id)
            ).length;
            const progress = (completedInCourse / course.lessons.length) * 100;

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                <Card
                  className="group cursor-pointer overflow-hidden border-2 transition-all hover:shadow-lg hover:-translate-y-1"
                  style={{ borderColor: 'var(--tw-border-opacity)' }}
                  onClick={() => selectCourse(course.id)}
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      {/* Image */}
                      <div className={`relative h-48 sm:h-auto sm:w-48 flex-shrink-0 ${colors.light}`}>
                        <Image
                          src={course.image}
                          alt={course.title}
                          fill
                          className="object-contain p-4"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-5">
                        <div className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${colors.bg} text-white mb-3`}>
                          {levelLabels[index]}
                        </div>

                        <h3 className="mb-1 text-xl font-bold text-gray-900">{course.title}</h3>
                        <p className="mb-3 text-sm font-medium text-gray-500">{course.subtitle}</p>
                        <p className="mb-4 text-sm text-gray-600 leading-relaxed line-clamp-2">
                          {course.description}
                        </p>

                        <div className="flex items-center gap-4 mb-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <BookOpen className="h-3.5 w-3.5" />
                            {course.lessons.length} دروس
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {course.lessons.length * 25}+ دقيقة
                          </span>
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                            {completedInCourse}/{course.lessons.length}
                          </span>
                        </div>

                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-500">التقدم</span>
                            <span className="text-xs font-bold text-gray-700">{Math.round(progress)}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>

                        <Button className={`w-full ${colors.bg} hover:opacity-90 text-white rounded-full`}>
                          ابدأ المستوى
                          <ArrowLeft className="mr-2 h-4 w-4" />
                        </Button>
                      </div>
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
