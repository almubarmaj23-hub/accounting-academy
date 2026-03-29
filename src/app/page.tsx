'use client';

import { useAppStore } from '@/lib/store';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import CoursesOverview from '@/components/CoursesOverview';
import CourseDetail from '@/components/CourseDetail';
import LessonView from '@/components/LessonView';
import QuizView from '@/components/QuizView';
import AboutPage from '@/components/AboutPage';
import ContactPage from '@/components/ContactPage';

export default function Home() {
  const { currentPage } = useAppStore();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            <HeroSection />
            <FeaturesSection />
            <CoursesOverview />
          </>
        )}
        {currentPage === 'courses' && <CoursesOverview />}
        {currentPage === 'course-detail' && <CourseDetail />}
        {currentPage === 'lesson' && <LessonView />}
        {currentPage === 'quiz' && <QuizView />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>
      <Footer />
    </div>
  );
}
