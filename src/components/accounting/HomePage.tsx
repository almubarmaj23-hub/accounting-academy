'use client';
import { useAppStore } from '@/lib/store';
import { courseData, totalLessons, totalQuizzes } from '@/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen, GraduationCap, Trophy, Users, Star, ChevronLeft,
  FileText, Calculator, Shield, Globe, TrendingUp, ArrowLeft, CheckCircle,
  Dumbbell, PieChart, Receipt, Monitor, Building
} from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap: Record<string, React.ElementType> = {
  BookOpen, FileText, TrendingUp, Calculator, Shield, Globe,
  PieChart, Receipt, Monitor, Building
};

export default function HomePage() {
  const { navigate, selectLevel } = useAppStore();

  const handleLevelClick = (levelId: number) => {
    selectLevel(levelId);
    navigate('courses');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-bl from-emerald-900 via-emerald-800 to-emerald-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-emerald-400 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-gold-400 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge className="mb-6 bg-emerald-700 text-emerald-100 border-emerald-600 hover:bg-emerald-700 px-4 py-1.5 text-sm">
              <Star className="w-3.5 h-3.5 ml-1.5" />
              منصة تعليمية احترافية
            </Badge>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
              تعلّم المحاسبة المالية
              <br />
              <span className="text-gold-400">من الصفر إلى الاحتراف</span>
            </h1>
            <p className="text-lg md:text-xl text-emerald-100 mb-8 leading-relaxed max-w-2xl mx-auto">
              60 درساً تعليمياً شاملاً عبر 10 مستويات متدرجة مع أنشطة تفاعلية وتطبيقات عملية تغطي كل ما تحتاجه للتفوق في عالم المحاسبة المالية، من المبادئ الأساسية إلى المعايير الدولية المتقدمة.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('courses')}
                className="bg-gold-600 hover:bg-gold-700 text-white text-lg px-8 py-6 gap-2 font-bold">
                ابدأ التعلّم الآن
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('dashboard')}
                className="border-emerald-400 text-emerald-100 hover:bg-emerald-800 text-lg px-8 py-6 gap-2">
                لوحة التقدم
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-emerald-50 dark:bg-emerald-950/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, label: 'درس تعليمي', value: totalLessons.toString() },
              { icon: GraduationCap, label: 'مستوى تعليمي', value: courseData.length.toString() },
              { icon: Trophy, label: 'سؤال اختباري', value: totalQuizzes.toString() },
              { icon: Dumbbell, label: 'نشاط تفاعلي', value: '10' },
              { icon: Users, label: 'ساعة محتوى', value: '200+' },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="border-0 shadow-md text-center py-6">
                  <CardContent>
                    <stat.icon className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
                    <div className="text-3xl font-extrabold text-emerald-700">{stat.value}</div>
                    <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">لماذا أكاديمية المحاسبة؟</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">نقدم لك تجربة تعليمية فريدة تجمع بين المحتوى الأكاديمي العميق والتطبيق العملي الواقعي</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: CheckCircle, title: 'محتوى أكاديمي معتمد', desc: 'محتوى محاضر ومُراجع من خبراء في المحاسبة المالية والمعايير الدولية' },
              { icon: BookOpen, title: '10 مستويات متدرجة', desc: 'من المبادئ الأساسية للمبتدئين إلى المعايير الدولية المتقدمة ومحاسبة القطاعات المتخصصة' },
              { icon: Trophy, title: 'اختبارات تفاعلية', desc: 'اختبارات متنوعة في نهاية كل درس لتثبيت المعلومات وقياس مستوى الفهم' },
              { icon: TrendingUp, title: 'تتبع التقدم', desc: 'لوحة تحكم ذكية تتيح لك متابعة تقدمك وتحديد نقاط القوة والضعف' },
              { icon: Globe, title: 'معايير دولية', desc: 'تغطية شاملة للمعايير الدولية IFRS والمعايير المحاسبية المعمول بها' },
              { icon: FileText, title: 'أمثلة عملية', desc: 'أمثلة وحالات دراسية واقعية من بيئة الأعمال لربط النظرية بالتطبيق' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card className="h-full hover:shadow-lg transition-shadow border-emerald-100 dark:border-emerald-900">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Levels Section */}
      <section className="py-16 md:py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">المسارات التعليمية</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">عشرة مستويات شاملة مع أنشطة تطبيقية تأخذك من الصفر إلى الاحتراف في المحاسبة المالية</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courseData.map((level, i) => {
              const IconComponent = iconMap[level.icon] || BookOpen;
              return (
                <motion.div key={level.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <Card
                    className="h-full hover:shadow-xl transition-all cursor-pointer group border-emerald-100 dark:border-emerald-900 hover:border-emerald-300 dark:hover:border-emerald-700"
                    onClick={() => handleLevelClick(level.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: level.color + '15' }}>
                          <IconComponent className="w-7 h-7" style={{ color: level.color }} />
                        </div>
                        <Badge variant="secondary" className="text-xs">{level.lessons.length} دروس</Badge>
                      </div>
                      <div className="text-xs font-bold mb-1" style={{ color: level.color }}>المستوى {level.id}</div>
                      <h3 className="font-bold text-lg mb-2 group-hover:text-emerald-700 transition-colors">{level.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{level.description}</p>
                      <div className="flex items-center text-sm font-medium" style={{ color: level.color }}>
                        ابدأ التعلم
                        <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
