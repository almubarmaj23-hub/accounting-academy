'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

const faqs = [
  {
    q: 'هل المحتوى التعليمي مجاني؟',
    a: 'نعم! جميع الدروس والمحتوى التعليمي على المنصة متاح مجانًا بالكامل. نؤمن بأن التعليم يجب أن يكون متاحًا للجميع. يمكنك البدء فورًا دون الحاجة للتسجيل أو الدفع.',
  },
  {
    q: 'هل أحتاج خلفية محاسبية للبدء؟',
    a: 'لا تحتاج إلى أي خلفية محاسبية سابقة. المستوى التمهيدي مصمم خصيصًا للمبتدئين تمامًا ويبدأ معك من الصفر. سنتعرف معًا على المفاهيم الأساسية خطوة بخطوة.',
  },
  {
    q: 'كم يستغرق إتمام جميع المستويات؟',
    a: 'يعتمد ذلك على وتيرة تعلمك. كل درس يستغرق في المتوسط 25-35 دقيقة للقراءة والفهم، بالإضافة إلى وقت الاختبار. يمكنك إتمام مستوى كامل في أسبوع إلى أسبوعين إذا كنت تدرس بانتظام.',
  },
  {
    q: 'هل الشهادات معترف بها؟',
    a: 'شهادات الإتمام من منصتنا تُثبت إنجازك التعليمي وتُظهر كفاءاتك. هذه الشهادات تُعد إضافة قيمة لسيرتك الذاتية، ويمكن أن تُساعدك في التحضير للحصول على شهادات مهنية دولية مثل CPA وCMA.',
  },
  {
    q: 'كيف يمكنني التواصل مع فريق الدعم؟',
    a: 'يمكنك التواصل معنا عبر نموذج الاتصال في هذه الصفحة، أو عبر البريد الإلكتروني info@accounting-academy.com. نحرص على الرد على جميع الاستفسارات خلال 24-48 ساعة عمل.',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            تواصل <span className="text-emerald-600">معنا</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-600">
            نسعد بتواصلك معنا. سواء كان لديك استفسار أو اقتراح أو ملاحظة، فريقنا جاهز لمساعدتك.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            {[
              { icon: Mail, title: 'البريد الإلكتروني', value: 'info@accounting-academy.com', color: 'bg-emerald-100 text-emerald-700' },
              { icon: Phone, title: 'الهاتف', value: '+966 50 000 0000', color: 'bg-blue-100 text-blue-700' },
              { icon: MapPin, title: 'العنوان', value: 'الرياض، المملكة العربية السعودية', color: 'bg-amber-100 text-amber-700' },
              { icon: Clock, title: 'ساعات العمل', value: 'الأحد - الخميس: 9 صباحًا - 5 مساءً', color: 'bg-purple-100 text-purple-700' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <Card key={i}>
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{item.title}</p>
                      <p className="text-sm font-medium text-gray-900">{item.value}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <MessageCircle className="h-5 w-5 text-emerald-600" />
                  <h2 className="font-bold text-gray-900">أرسل لنا رسالة</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">الاسم الكامل</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="أدخل اسمك"
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="example@email.com"
                        required
                        className="mt-1"
                        dir="ltr"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="subject">الموضوع</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="موضوع الرسالة"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">الرسالة</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="اكتب رسالتك هنا..."
                      required
                      rows={5}
                      className="mt-1"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 rounded-full"
                    size="lg"
                    disabled={submitted}
                  >
                    {submitted ? (
                      '✅ تم الإرسال بنجاح!'
                    ) : (
                      <>
                        <Send className="ml-2 h-4 w-4" />
                        إرسال الرسالة
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            الأسئلة الشائعة
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border rounded-xl px-4 data-[state=open]:border-emerald-200 data-[state=open]:bg-emerald-50/30"
                >
                  <AccordionTrigger className="text-right font-medium hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
