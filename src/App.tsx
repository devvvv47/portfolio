import React, { useState, useEffect } from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProfileSection } from './components/ProfileSection';
import { CareerSection } from './components/CareerSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AwardsSection } from './components/AwardsSection';
import { ContactSection } from './components/ContactSection';
import { AdminModal } from './components/AdminModal';
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';
import { CareerPage } from './pages/CareerPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { AwardsPage } from './pages/AwardsPage';
import { ContactPage } from './pages/ContactPage';

function PortfolioApp() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [viewMode, setViewMode] = useState<'pages' | 'all'>('pages');

  // Handle URL hash changes for direct linking & back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validPages = ['home', 'profile', 'career', 'projects', 'awards', 'contact'];

      if (hash === 'all') {
        setViewMode('all');
      } else if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    // Initial check
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.location.hash = page;

    if (viewMode === 'all') {
      const el = document.getElementById(page);
      if (el) {
        const topOffset = 80;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - topOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleToggleViewMode = () => {
    if (viewMode === 'pages') {
      setViewMode('all');
      window.location.hash = 'all';
    } else {
      setViewMode('pages');
      window.location.hash = currentPage;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111111] relative selection:bg-[#7C3AED] selection:text-white flex flex-col justify-between">
      {/* Editorial Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        viewMode={viewMode}
        onToggleViewMode={handleToggleViewMode}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {viewMode === 'pages' ? (
          /* Dedicated Pages Mode */
          <>
            {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
            {currentPage === 'profile' && <ProfilePage onNavigate={handleNavigate} />}
            {currentPage === 'career' && <CareerPage onNavigate={handleNavigate} />}
            {currentPage === 'projects' && <ProjectsPage onNavigate={handleNavigate} />}
            {currentPage === 'awards' && <AwardsPage onNavigate={handleNavigate} />}
            {currentPage === 'contact' && (
              <ContactPage
                onNavigate={handleNavigate}
                onOpenAdmin={() => setIsAdminOpen(true)}
              />
            )}
          </>
        ) : (
          /* All-in-One Scroll Stream Mode */
          <div className="space-y-0">
            <Hero />
            <ProfileSection />
            <CareerSection />
            <ProjectsSection />
            <AwardsSection />
            <ContactSection onOpenAdmin={() => setIsAdminOpen(true)} />
          </div>
        )}
      </main>

      {/* Admin CMS Modal */}
      <AdminModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioApp />
    </PortfolioProvider>
  );
}
