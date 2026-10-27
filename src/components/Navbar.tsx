import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Menu,
  X,
  ShieldCheck,
  GraduationCap,
  Globe,
  Lock,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { currentUser, isAdmin } = useAuth();
  const location = useLocation();

  const navLinks = [
    { path: '/', label: t('navHome') },
    { path: '/about', label: t('navAbout') },
    { path: '/notices', label: t('navNotices') },
    { path: '/admission', label: t('navAdmission') },
    { path: '/results', label: t('navResults') },
    { path: '/gallery', label: t('navGallery') },
    { path: '/downloads', label: t('navDownloads') },
    { path: '/contact', label: t('navContact') },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="w-full bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      {/* Top Utility Ribbon */}
      <div className="bg-[#0B2545] text-white text-xs py-1.5 px-4 sm:px-8 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-slate-200">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-300" />
              <span>{t('addressText')}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-blue-300" />
              <a href="tel:7631083566" className="hover:text-white transition-colors">
                7631083566
              </a>
            </span>
            <span className="hidden md:flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-300" />
              <a
                href="mailto:arunvishwanathhighschoolaran@gmail.com"
                className="hover:text-white transition-colors"
              >
                arunvishwanathhighschoolaran@gmail.com
              </a>
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            {/* Language Switch */}
            <div className="flex items-center gap-1 bg-[#133E75] rounded px-2 py-0.5 text-xs">
              <Globe className="w-3 h-3 text-blue-200 mr-1" />
              <button
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-0.5 rounded transition-colors ${
                  language === 'en'
                    ? 'font-bold text-white bg-blue-700/60'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                English
              </button>
              <span className="text-blue-300/40">|</span>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-1.5 py-0.5 rounded transition-colors ${
                  language === 'hi'
                    ? 'font-bold text-white bg-blue-700/60'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                हिन्दी
              </button>
            </div>

            {/* Quick Admin Indicator */}
            {currentUser ? (
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-1 text-xs text-amber-300 hover:text-amber-200 font-medium"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin</span>
              </Link>
            ) : (
              <Link
                to="/admin/login"
                className="flex items-center gap-1 text-xs text-slate-300 hover:text-white transition-colors"
              >
                <Lock className="w-3 h-3" />
                <span>Admin Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Branding & Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-6">
        {/* School Seal & Title */}
        <Link to="/" className="flex items-center gap-3.5 group">
          <div className="w-14 h-14 rounded-full border-2 border-[#0B2545] p-1 flex items-center justify-center bg-blue-50/50 shrink-0">
            {/* Official School Seal Graphic */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#0B2545]" fill="currentColor">
              <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="3" />
              <circle cx="50" cy="50" r="41" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
              <path d="M50 20 L58 35 L75 38 L62 50 L66 68 L50 59 L34 68 L38 50 L25 38 L42 35 Z" fill="#0B2545" opacity="0.15" />
              <circle cx="50" cy="50" r="22" fill="#0B2545" opacity="0.9" />
              <path d="M40 50 L46 56 L60 42" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <text x="50" y="85" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#0B2545">ESTD BSEB</text>
            </svg>
          </div>

          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#0B2545] leading-tight font-serif group-hover:text-blue-900 transition-colors">
              {language === 'hi' ? 'अरुण बिशननाथ उच्च विद्यालय' : 'Arun Bishwanath High School'}
            </span>
            <div className="flex flex-wrap items-center gap-x-2 text-xs sm:text-sm font-medium text-slate-600">
              <span className="font-semibold text-slate-800">
                {language === 'hi' ? 'अरान, सहरसा' : 'Aran, Saharsa'}
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-500 text-xs hidden sm:inline">
                {language === 'hi'
                  ? 'सरकारी सहायता प्राप्त | बीएसईबी | कक्षा 9 - 10'
                  : 'Government Aided School | BSEB | Class 9 - 10'}
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-1.5 text-sm font-medium rounded transition-colors whitespace-nowrap ${
                  active
                    ? 'bg-[#0B2545] text-white shadow-xs'
                    : 'text-slate-700 hover:text-[#0B2545] hover:bg-slate-100'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Hamburger */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-[#0B2545] hover:bg-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-3 space-y-1 shadow-lg">
          {navLinks.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded text-base font-medium transition-colors ${
                  active
                    ? 'bg-[#0B2545] text-white'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-[#0B2545]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <Link
              to={currentUser ? '/admin/dashboard' : '/admin/login'}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-[#0B2545] flex items-center gap-1.5 py-1"
            >
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              <span>{currentUser ? 'Admin Dashboard' : 'Admin Login'}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
