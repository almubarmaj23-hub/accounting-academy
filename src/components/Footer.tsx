'use client';

import { useAppStore } from '@/lib/store';
import { GraduationCap, Heart, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const { navigate } = useAppStore();

  return (
    <footer className="border-t bg-gray-50 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold text-emerald-800">أكاديمية المحاسبة</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              منصة تعليمية متخصصة في تعليم المحاسبة المالية من الصفر حتى الاحتراف. نساعدك على بناء مستقبلك المهني في عالم المحاسبة.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              {[
                { label: 'الرئيسية', page: 'home' as const },
                { label: 'المسارات التعليمية', page: 'courses' as const },
                { label: 'عن المنصة', page: 'about' as const },
                { label: 'اتصل بنا', page: 'contact' as const },
              ].map((item) => (
                <li key={item.page}>
                  <button
                    onClick={() => navigate(item.page)}
                    className="text-sm text-gray-600 hover:text-emerald-600 transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">المسارات التعليمية</h3>
            <ul className="space-y-2">
              {[
                'المستوى التمهيدي',
                'المستوى المتوسط',
                'المستوى المتقدم',
                'المستوى الاحترافي',
              ].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => navigate('courses')}
                    className="text-sm text-gray-600 hover:text-emerald-600 transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">تواصل معنا</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4 text-emerald-600" />
                info@accounting-academy.com
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4 text-emerald-600" />
                +966 50 000 0000
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4 text-emerald-600" />
                الرياض، المملكة العربية السعودية
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} أكاديمية المحاسبة. جميع الحقوق محفوظة.
          </p>
          <p className="flex items-center gap-1 text-sm text-gray-500">
            صُنع بـ <Heart className="h-3 w-3 text-red-500 fill-red-500" /> لعشاق المحاسبة
          </p>
        </div>
      </div>
    </footer>
  );
}
