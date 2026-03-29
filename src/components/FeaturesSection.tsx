'use client';

import { motion } from 'framer-motion';
import { BookOpen, Brain, BarChart3, Award, MessageCircle, RefreshCw } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'محتوى شامل',
    description: '24 درسًا تعليميًا غنيًا بالأمثلة والجداول والشروحات المفصلة، يغطي كل جوانب المحاسبة المالية من الأساسيات حتى المعايير الدولية.',
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    icon: Brain,
    title: 'اختبارات تفاعلية',
    description: '120 سؤالًا موزعة على جميع الدروس لاختبار فهمك وتعزيز استيعابك للمفاهيم المحاسبية مع تغذية راجعة فورية لكل إجابة.',
    color: 'bg-blue-100 text-blue-700',
  },
  {
    icon: BarChart3,
    title: 'تتبع التقدم',
    description: 'تابع تقدمك في كل مستوى ودرس، واحصل على مؤشرات واضحة عن إنجازاتك ومستوى استيعابك للمادة العلمية.',
    color: 'bg-amber-100 text-amber-700',
  },
  {
    icon: Award,
    title: 'شهادات إتمام',
    description: 'احصل على شهادة إتمام لكل مستوى تُنهيه بنجاح، مما يعزز سيرتك الذاتية ويثبت كفاءاتك المحاسبية.',
    color: 'bg-purple-100 text-purple-700',
  },
  {
    icon: MessageCircle,
    title: 'دعم مستمر',
    description: 'فريق من المحاسبين المتخصصين جاهز للإجابة على استفساراتك وتوضيح أي مفاهيم تحتاج إلى مساعدة إضافية.',
    color: 'bg-rose-100 text-rose-700',
  },
  {
    icon: RefreshCw,
    title: 'تحديثات مستمرة',
    description: 'محتوى تعليمي يُحدّث بانتظام وفقًا لأحدث المعايير المحاسبية الدولية والتطورات في عالم المحاسبة.',
    color: 'bg-teal-100 text-teal-700',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FeaturesSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            لماذا تختار <span className="text-emerald-600">أكاديمية المحاسبة</span>؟
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            نوفر لك تجربة تعليمية فريدة تجمع بين المحتوى الأكاديمي العالي والأسلوب العملي التطبيقي
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group rounded-2xl border bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
              >
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.color} mb-4`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
