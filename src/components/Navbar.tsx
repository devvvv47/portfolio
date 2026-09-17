import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Lock, Settings, LogOut, Menu, X, LayoutGrid, Layers } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  viewMode: 'pages' | 'all';
  onToggleViewMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAdmin,
  currentPage,
  onNavigate,
  viewMode,
  onToggleViewMode,
}) => {
  const { data, isAdmin, logoutAdmin } = usePortfolio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const defaultNavItems = [
    { id: 'home', label: 'HOME', visible: true },
    { id: 'profile', label: 'PROFILE', visible: true },
    { id: 'career', label: 'CAREER', visible: true },
    { id: 'projects', label: 'PROJECTS', visible: true },
    { id: 'awards', label: 'AWARDS', visible: true },
    { id: 'contact', label: 'CONTACT', visible: true },
  ];

  const navItems = (data?.navItems && data.navItems.length > 0 ? data.navItems : defaultNavItems).filter(
    (item) => item.visible !== false
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAFAFA]/95 backdrop-blur-md border-b border-black/10 py-3 shadow-xs'
          : 'bg-[#FAFAFA]/90 backdrop-blur-xs py-4 border-b border-black/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Logo / Name */}
        <button
          id="logo-button"
          onClick={() => handleNavClick('home')}
          className="group text-left flex items-baseline focus:outline-hidden"
        >
          <span className="font-display text-lg sm:text-xl font-extrabold tracking-wider text-[#111111] group-hover:text-[#7C3AED] transition-colors">
            DEBORAH KIM
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav" className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`text-xs font-mono tracking-widest uppercase transition-colors relative py-1 focus:outline-hidden ${
                  isActive
                    ? 'text-[#7C3AED] font-bold'
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#7C3AED]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Controls: Mode Switcher */}
        <div className="hidden md:flex items-center gap-3">
          {/* View Mode Switcher: Dedicated Pages vs All-in-one Scroll */}
          <button
            onClick={onToggleViewMode}
            title={
              viewMode === 'pages'
                ? '현재: 메뉴별 개별 페이지 보기 (클릭시 전체 스크롤 모드로 전환)'
                : '현재: 원페이지 스크롤 보기 (클릭시 개별 페이지 모드로 전환)'
            }
            className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono border border-black/15 hover:border-black transition-colors bg-white text-neutral-700"
          >
            {viewMode === 'pages' ? (
              <>
                <Layers className="w-3.5 h-3.5 text-[#7C3AED]" />
                <span className="text-black font-semibold">PAGES</span>
                <span className="text-neutral-400">/ SCROLL</span>
              </>
            ) : (
              <>
                <LayoutGrid className="w-3.5 h-3.5 text-[#7C3AED]" />
                <span className="text-neutral-400">PAGES /</span>
                <span className="text-black font-semibold">SCROLL</span>
              </>
            )}
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onToggleViewMode}
            className="text-[10px] font-mono px-2 py-1 border border-black/15 text-neutral-700"
          >
            {viewMode === 'pages' ? 'PAGES' : 'SCROLL'}
          </button>
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-black focus:outline-hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer"
          className="md:hidden bg-[#FAFAFA] border-b border-black/20 px-6 py-6 space-y-4 animate-fade-in"
        >
          <div className="flex items-center justify-between pb-3 border-b border-black/10">
            <span className="text-[11px] font-mono tracking-widest text-neutral-600 uppercase">
              PORTFOLIO // NAVIGATION
            </span>
            <button
              onClick={onToggleViewMode}
              className="text-[10px] font-mono px-2 py-1 bg-black text-white"
            >
              모드: {viewMode === 'pages' ? '개별 페이지' : '전체 스크롤'}
            </button>
          </div>

          <div className="flex flex-col space-y-3">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left text-sm font-mono tracking-wider uppercase py-1.5 flex items-center justify-between ${
                    isActive ? 'text-[#7C3AED] font-bold' : 'text-neutral-700'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="text-xs text-[#7C3AED]">● ACTIVE</span>}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-black/10 flex items-center justify-between">
            {isAdmin ? (
              <div className="flex items-center gap-3 w-full justify-between">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="text-xs font-mono text-[#7C3AED] font-bold flex items-center gap-1.5"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>ADMIN CMS 열기</span>
                </button>
                <button
                  onClick={logoutAdmin}
                  className="text-xs font-mono text-neutral-600 hover:text-red-600"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="text-xs font-mono text-neutral-600 flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>관리자 로그인 (4747)</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
