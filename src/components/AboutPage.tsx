'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Target, Eye, Users, BookOpen, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-emerald-100 mb-4">
            <GraduationCap className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            عن <span className="text-emerald-600">أكاديمية المحاسبة</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-600 leading-relaxed">
            نحن منصة تعليمية رائدة متخصصة في تعليم المحاسبة المالية باللغة العربية. نؤمن بأن كل شخص يستحق الوصول إلى تعليم محاسبي عالي الجودة يمكّنه من بناء مستقبل مهني ناجح ومستقر.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full border-2 border-emerald-100">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 mb-4">
                  <Target className="h-6 w-6 text-emerald-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">رسالتنا</h2>
                <p className="text-gray-600 leading-relaxed">
                  توفير تعليم محاسبي متكامل ومتاح للجميع باللغة العربية، يجمع بين الأصالة الأكاديمية والتطبيق العملي، ويمكّن المتعلمين من فهم المحاسبة المالية بعمق واتساع يُؤهلهم لسوق العمل المحلي والدولي. نسعى لأن نكون المرجع العربي الأول في تعليم المحاسبة المالية عبر الإنترنت.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="h-full border-2 border-amber-100">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 mb-4">
                  <Eye className="h-6 w-6 text-amber-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">رؤيتنا</h2>
                <p className="text-gray-600 leading-relaxed">
                  أن نصبح المنصة التعليمية الرائدة في العالم العربي لتعليم المحاسبة المالية، وأن نساهم في بناء جيل من المحاسبين المحترفين القادرين على المنافسة في الأسواق المالية العالمية. نطمح لنشر الثقافة المحاسبية في المجتمع العربي وتمكين الشباب من بناء مسارات مهنية ناجحة.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Why Accounting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            لماذا تتعلم المحاسبة المالية؟
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: Users,
                title: 'طلب عالي في السوق',
                desc: 'المحاسبة من أكثر المهن طلبًا في العالم العربي والعالم، مع فرص عمل متنوعة في جميع القطاعات.',
                color: 'bg-emerald-100 text-emerald-700',
              },
              {
                icon: Award,
                title: 'شهادات مهنية دولية',
                desc: 'المحاسبة بوابة للحصول على شهادات عالمية مثل CPA وCMA وACCA التي تفتح آفاقًا عالمية.',
                color: 'bg-amber-100 text-amber-700',
              },
              {
                icon: BookOpen,
                title: 'أساس لإدارة الأعمال',
                desc: 'فهم المحاسبة ضروري لأي شخص يريد فهم الأعمال والاستثمار وريادة الأعمال بنجاح.',
                color: 'bg-blue-100 text-blue-700',
              },
              {
                icon: Target,
                title: 'نمو مهني مستمر',
                desc: 'مجال المحاسبة يوفر مسارات نمو مهني واضحة مع إمكانية الوصول إلى مناصب قيادية عليا.',
                color: 'bg-purple-100 text-purple-700',
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <Card key={i} className="text-center">
                  <CardContent className="p-5">
                    <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            فريقنا التعليمي
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { name: 'د. محمد الأحمد', role: 'محاسب أول معتمد CPA', exp: '15+ سنة خبرة في التدقيق المحاسبي' },
              { name: 'أ. سارة المنصور', role: 'خبيرة في المعايير الدولية IFRS', exp: '12+ سنة في إعداد التقارير المالية' },
              { name: 'د. خالد العتيبي', role: 'أستاذ محاسبة في الجامعة', exp: '20+ سنة في التدريس والبحث الأكاديمي' },
            ].map((member, i) => (
              <Card key={i}>
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-3 h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center">
                    <span className="text-2xl">👤</span>
                  </div>
                  <h3 className="font-bold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-emerald-600 font-medium">{member.role}</p>
                  <p className="text-xs text-gray-500 mt-1">{member.exp}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
