'use client';

import { useAppStore } from '@/lib/store';
import Header from '@/components/accounting/Header';
import Footer from '@/components/accounting/Footer';
import HomePage from '@/components/accounting/HomePage';
import CoursesPage from '@/components/accounting/CoursesPage';
import LessonPage from '@/components/accounting/LessonPage';
import QuizPage from '@/components/accounting/QuizPage';
import DashboardPage from '@/components/accounting/DashboardPage';

export default function Home() {
  const { currentPage } = useAppStore();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'courses' && <CoursesPage />}
        {currentPage === 'lesson' && <LessonPage />}
        {currentPage === 'quiz' && <QuizPage />}
        {currentPage === 'dashboard' && <DashboardPage />}
      </main>
      <Footer />
    </div>
  );
}
