'use client';

import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, BookOpen, Award, Clock } from 'lucide-react';
import Image from 'next/image';

export default function HeroSection() {
  const { navigate } = useAppStore();

  const stats = [
    { icon: Users, label: 'طالب مسجل', value: '+5,000' },
    { icon: BookOpen, label: 'درس تعليمي', value: '24' },
    { icon: Award, label: 'شهادة إتمام', value: '4' },
    { icon: Clock, label: 'ساعة محتوى', value: '+30' },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Hero Banner */}
      <div className="relative h-[400px] md:h-[500px]">
        <Image
          src="/hero-banner.png"
          alt="أكاديمية المحاسبة"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-l from-emerald-900/90 via-emerald-800/70 to-transparent" />

        <div className="absolute inset-0 container mx-auto flex items-center px-4">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-xl text-white"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4 inline-block rounded-full bg-emerald-500/30 px-4 py-1.5 text-sm font-medium backdrop-blur-sm"
            >
              🎓 تعلّم المحاسبة المالية من الصفر إلى الاحتراف
            </motion.div>
            <h1 className="mb-4 text-3xl font-bold leading-tight md:text-5xl">
              احترف المحاسبة المالية
              <br />
              <span className="text-amber-300">وابنِ مستقبلك المهني</span>
            </h1>
            <p className="mb-6 text-base leading-relaxed text-emerald-100 md:text-lg">
              منصة تعليمية شاملة تأخذك في رحلة تعليمية متدرجة من المفاهيم الأساسية
              وحتى المعايير الدولية والتحليل المالي المتقدم. ابدأ الآن مجانًا!
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                onClick={() => navigate('courses')}
                className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold rounded-full px-8"
              >
                ابدأ التعلم الآن
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('about')}
                className="border-white/40 text-white hover:bg-white/10 rounded-full px-8"
              >
                تعرف علينا
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="relative -mt-12 z-10 mx-4 md:mx-auto md:max-w-4xl"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 rounded-2xl bg-white p-6 shadow-xl border">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="text-center">
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50">
                  <Icon className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
