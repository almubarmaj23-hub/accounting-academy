'use client';
import { GraduationCap, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-emerald-950 text-emerald-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-lg text-white">أكاديمية المحاسبة</span>
            </div>
            <p className="text-emerald-300 text-sm leading-relaxed">
              منصة تعليمية عربية متخصصة في تعليم المحاسبة المالية من الصفر إلى الاحتراف. 10 مستويات شاملة مع أنشطة تفاعلية وتطبيقات عملية و 60 درساً تعليمياً.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">المسارات التعليمية</h3>
            <ul className="space-y-1.5 text-sm text-emerald-300">
              <li>المستوى 1: مدخل إلى المحاسبة المالية</li>
              <li>المستوى 2: القوائم المالية الأساسية</li>
              <li>المستوى 3: المحاسبة المتوسطة</li>
              <li>المستوى 4: محاسبة التكاليف</li>
              <li>المستوى 5: التدقيق والمراجعة</li>
              <li>المستوى 6: المعايير الدولية IFRS</li>
              <li>المستوى 7: المحاسبة الإدارية</li>
              <li>المستوى 8: الزكاة والضرائب</li>
              <li>المستوى 9: المحاسبة الإلكترونية</li>
              <li>المستوى 10: القطاعات المتخصصة</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">تواصل معنا</h3>
            <ul className="space-y-2 text-sm text-emerald-300">
              <li>almubarmaj23@gmail.com</li>
              <li>الرياض، المملكة العربية السعودية</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-emerald-800 text-center text-sm text-emerald-400">
          <p>صُنع بكل {<Heart className="w-3 h-3 inline text-red-400" />} أكاديمية المحاسبة &copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
