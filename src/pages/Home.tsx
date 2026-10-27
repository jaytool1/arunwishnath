import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  TrendingUp,
  Bell,
  Download,
  GraduationCap,
  BookOpen,
  Landmark,
  Users,
  ChevronRight,
  ArrowRight,
  UserCheck,
  Calendar,
  ExternalLink,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { NoticeTicker } from '../components/NoticeTicker';

export const Home: React.FC = () => {
  const { language, t } = useLanguage();

  // Reference school building asset from attachment
  const schoolHeroImage = '/assets/aistudio/Arun_Bishwanath_High_School_Homepage_5df6554f.png';

  // Authentic notices matching screenshot
  const latestNotices = [
    {
      id: '1',
      date: '10 Apr 2026',
      title: 'Online Admission for Class 9 and 10 is now open.',
      titleHi: 'कक्षा 9 एवं 10 में ऑनलाइन नामांकन प्रक्रिया प्रारंभ है।',
      category: 'Admission',
    },
    {
      id: '2',
      date: '05 Apr 2026',
      title: 'Annual Examination Result will be published soon.',
      titleHi: 'वार्षिक परीक्षा परिणाम शीघ्र ही घोषित किया जाएगा।',
      category: 'Examination',
    },
    {
      id: '3',
      date: '28 Mar 2026',
      title: 'School will remain closed on 31st March 2026.',
      titleHi: 'विद्यालय 31 मार्च 2026 को बंद रहेगा।',
      category: 'Holiday',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* 1. Hero Section Split Banner */}
      <section className="bg-[#0B2545] text-white overflow-hidden relative border-b border-blue-900/60">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[460px] items-stretch">
          {/* Left Text Column */}
          <div className="lg:col-span-5 px-6 sm:px-10 py-12 lg:py-16 flex flex-col justify-center z-10">
            <span className="text-blue-300 text-sm font-semibold tracking-wide uppercase mb-1">
              {t('welcomeTitle')}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3 font-serif leading-tight">
              {language === 'hi' ? 'अरुण बिशननाथ उच्च विद्यालय' : 'Arun Bishwanath High School'}
            </h1>
            <p className="text-amber-300 font-medium text-base sm:text-lg mb-4">
              {t('tagline')}
            </p>
            <p className="text-slate-200 text-sm leading-relaxed mb-8 max-w-xl">
              {t('heroDescription')}
            </p>
            <div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0B2545] font-semibold text-sm rounded-lg hover:bg-slate-100 transition-all shadow-md group"
              >
                <span>{t('learnMore')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Hero Image Column (Real school building photograph from attachment) */}
          <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-full overflow-hidden bg-slate-900">
            <img
              src={schoolHeroImage}
              alt="Arun Bishwanath High School Aran, Saharsa Building"
              className="w-full h-full object-cover object-top filter brightness-95"
              referrerPolicy="no-referrer"
            />
            {/* Visual gradient overlay for clean integration */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#0B2545] lg:via-transparent lg:to-transparent pointer-events-none" />

            <div className="absolute bottom-4 right-6 flex items-center gap-2 bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded-full text-xs text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{language === 'hi' ? 'मुख्य विद्यालय परिसर, अरान' : 'Main Campus, Aran'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Notice Ticker */}
      <NoticeTicker notices={latestNotices} />

      {/* 3. Four Quick Action Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 -mt-2 py-8 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Action 1: Admission */}
          <Link
            to="/admission"
            className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex items-center gap-4 group hover:border-blue-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <FileText className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                {t('actionAdmission')}
              </h3>
              <p className="text-xs text-slate-500 font-medium">{t('actionAdmissionSub')}</p>
            </div>
          </Link>

          {/* Action 2: Results */}
          <Link
            to="/results"
            className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex items-center gap-4 group hover:border-emerald-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <TrendingUp className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                {t('actionResults')}
              </h3>
              <p className="text-xs text-slate-500 font-medium">{t('actionResultsSub')}</p>
            </div>
          </Link>

          {/* Action 3: Notices */}
          <Link
            to="/notices"
            className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex items-center gap-4 group hover:border-amber-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Bell className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                {t('actionNotices')}
              </h3>
              <p className="text-xs text-slate-500 font-medium">{t('actionNoticesSub')}</p>
            </div>
          </Link>

          {/* Action 4: Downloads */}
          <Link
            to="/downloads"
            className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex items-center gap-4 group hover:border-purple-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Download className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                {t('actionDownloads')}
              </h3>
              <p className="text-xs text-slate-500 font-medium">{t('actionDownloadsSub')}</p>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. Middle Section: About Our School, Principal's Message, Classroom */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: About Our School (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#0B2545] font-serif mb-3">
                {t('aboutSchoolTitle')}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {t('aboutSchoolText')}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0B2545] flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-semibold">
                    {t('classesLabel')}
                  </span>
                  <span className="text-sm font-bold text-slate-900">{t('classesValue')}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0B2545] flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-semibold">
                    {t('mediumLabel')}
                  </span>
                  <span className="text-sm font-bold text-slate-900">{t('mediumValue')}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0B2545] flex items-center justify-center shrink-0">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-semibold">
                    {t('boardLabel')}
                  </span>
                  <span className="text-sm font-bold text-slate-900">{t('boardValue')}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0B2545] flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-semibold">
                    {t('typeLabel')}
                  </span>
                  <span className="text-xs font-bold text-slate-900">{t('typeValue')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column: Principal's Message (4 cols) */}
          <div className="lg:col-span-4 bg-gradient-to-br from-blue-50/70 to-slate-50 p-6 sm:p-7 rounded-xl border border-blue-100/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3 text-[#0B2545]">
                <UserCheck className="w-5 h-5 text-blue-700" />
                <h3 className="text-lg font-bold font-serif">{t('principalsMessage')}</h3>
              </div>
              <blockquote className="text-sm italic text-slate-700 leading-relaxed my-4 border-l-2 border-blue-300 pl-3">
                {language === 'hi'
                  ? '"शिक्षा वह सबसे शक्तिशाली शस्त्र है जिससे आप संसार को बदल सकते हैं। हमारा प्रयास प्रत्येक छात्र को सुसंस्कृत एवं स्वावलंबी बनाना है।"'
                  : '"Education is the most powerful weapon which you can use to change the world. Our objective is to impart academic rigor alongside strong ethical values."'}
              </blockquote>
              <p className="text-xs font-bold text-[#0B2545] mt-2">
                — {language === 'hi' ? 'प्रधानाध्यापक, अरुण बिशननाथ उच्च विद्यालय' : 'Principal, Arun Bishwanath High School'}
              </p>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <Link
                to="/about"
                className="px-4 py-2 bg-[#0B2545] text-white text-xs font-semibold rounded hover:bg-blue-900 transition-colors"
              >
                {t('readMore')}
              </Link>
              {/* Silhouette portrait icon matching screenshot */}
              <div className="w-14 h-14 rounded-full bg-slate-200 border-2 border-blue-200 flex items-center justify-center text-slate-400">
                <Users className="w-7 h-7" />
              </div>
            </div>
          </div>

          {/* Right Column: Classroom and Infrastructure Preview (3 cols) */}
          <div className="lg:col-span-3 rounded-xl overflow-hidden border border-slate-200 bg-white shadow-xs flex flex-col">
            <div className="h-48 relative overflow-hidden bg-slate-100">
              <img
                src={schoolHeroImage}
                alt="Classroom & campus"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-blue-950/20" />
              <div className="absolute bottom-2 left-2 bg-[#0B2545]/90 text-white text-[11px] px-2 py-0.5 rounded font-medium">
                {language === 'hi' ? 'कक्षाकक्ष एवं अध्ययन वातावरण' : 'Classroom & Library'}
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'hi'
                  ? 'विद्यार्थियों के अध्ययन हेतु सुसज्जित वर्ग-कक्ष, विज्ञान उपकरण तथा समृद्ध पुस्तकालय की सुविधा उपलब्ध है।'
                  : 'Equipped with spacious classrooms, dedicated science learning apparatus, and an open library for Class 9 and 10 students.'}
              </p>
              <Link
                to="/gallery"
                className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 mt-3"
              >
                <span>{language === 'hi' ? 'परिसर चित्र देखें' : 'View Campus Facilities'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bottom 3-Column Section: Latest Notices, Photo Gallery, Quick Links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Latest Notices List (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-500" />
                <h3 className="text-base font-bold text-slate-900 font-serif">
                  {t('latestNoticesTitle')}
                </h3>
              </div>
              <Link to="/notices" className="text-xs font-semibold text-blue-700 hover:underline flex items-center gap-0.5">
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {latestNotices.map((n) => (
                <Link
                  key={n.id}
                  to="/notices"
                  className="py-3 flex items-start justify-between gap-3 group hover:bg-slate-50/60 rounded px-1 -mx-1 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-mono font-semibold text-slate-500 shrink-0 mt-0.5">
                      {n.date}
                    </span>
                    <p className="text-xs font-medium text-slate-800 group-hover:text-blue-700 transition-colors leading-snug">
                      {language === 'hi' ? n.titleHi : n.title}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 shrink-0 mt-0.5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Photo Gallery Preview (4 cols) */}
          <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900 font-serif">
                  {t('photoGalleryTitle')}
                </h3>
              </div>
              <Link to="/gallery" className="text-xs font-semibold text-blue-700 hover:underline flex items-center gap-0.5">
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="aspect-4/3 rounded-md overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={schoolHeroImage}
                  alt="Campus view 1"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="aspect-4/3 rounded-md overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={schoolHeroImage}
                  alt="Campus view 2"
                  className="w-full h-full object-cover object-bottom"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="aspect-4/3 rounded-md overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={schoolHeroImage}
                  alt="Campus view 3"
                  className="w-full h-full object-cover object-right"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-3 text-center">
              {language === 'hi' ? 'अरुण बिशननाथ उच्च विद्यालय परिसर एवं गतिविधियां' : 'School building, classrooms & academic spaces'}
            </p>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 font-serif pb-4 border-b border-slate-100 mb-4">
              {t('quickLinksTitle')}
            </h3>

            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/admission"
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-blue-50 text-xs font-semibold text-slate-700 hover:text-blue-700 transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>{t('admissionFormLink')}</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </li>
              <li>
                <Link
                  to="/results"
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-emerald-50 text-xs font-semibold text-slate-700 hover:text-emerald-700 transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span>{t('resultPortalLink')}</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </li>
              <li>
                <Link
                  to="/notices"
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-amber-50 text-xs font-semibold text-slate-700 hover:text-amber-700 transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-amber-600" />
                    <span>{t('noticeBoardLink')}</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </li>
              <li>
                <Link
                  to="/downloads"
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-purple-50 text-xs font-semibold text-slate-700 hover:text-purple-700 transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-purple-600" />
                    <span>{t('actionDownloads')}</span>
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
