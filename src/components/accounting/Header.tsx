'use client';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { BookOpen, Menu, GraduationCap, Home, BarChart3, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { currentPage, navigate } = useAppStore();
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: 'الرئيسية', icon: Home, page: 'home' as const },
    { label: 'المسارات التعليمية', icon: BookOpen, page: 'courses' as const },
    { label: 'لوحة التقدم', icon: BarChart3, page: 'dashboard' as const },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <button onClick={() => navigate('home')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-lg hidden sm:block">أكاديمية المحاسبة</span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Button
              key={item.page}
              variant={currentPage === item.page ? 'default' : 'ghost'}
              onClick={() => navigate(item.page)}
              className="gap-2"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Button>
          ))}
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <div className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => (
                <Button
                  key={item.page}
                  variant={currentPage === item.page ? 'default' : 'ghost'}
                  onClick={() => { navigate(item.page); setOpen(false); }}
                  className="justify-start gap-2"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
