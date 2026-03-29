'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  GraduationCap,
  Menu,
  X,
  Home,
  BookOpen,
  Info,
  Phone,
  Search,
} from 'lucide-react';

const navItems = [
  { id: 'home' as const, label: 'الرئيسية', icon: Home },
  { id: 'courses' as const, label: 'المسارات التعليمية', icon: BookOpen },
  { id: 'about' as const, label: 'عن المنصة', icon: Info },
  { id: 'contact' as const, label: 'اتصل بنا', icon: Phone },
];

export default function Header() {
  const { navigate, currentPage, setSearchOpen } = useAppStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (page: typeof navItems[number]['id']) => {
    navigate(page);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold text-emerald-800">أكاديمية المحاسبة</span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={currentPage === item.id ? 'default' : 'ghost'}
              onClick={() => handleNav(item.id)}
              className={`rounded-full text-sm ${
                currentPage === item.id
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'text-gray-600 hover:text-emerald-700'
              }`}
            >
              {item.label}
            </Button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(true)}
            className="rounded-full"
          >
            <Search className="h-5 w-5 text-gray-600" />
          </Button>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 pt-12">
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNav(item.id)}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                        currentPage === item.id
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
