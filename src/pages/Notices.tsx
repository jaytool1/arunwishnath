import React, { useState } from 'react';
import { Bell, Search, Calendar, FileText, Download, Tag, ChevronRight, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Notice } from '../types';

export const Notices: React.FC = () => {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalNotice, setActiveModalNotice] = useState<Notice | null>(null);

  const initialNotices: Notice[] = [
    {
      id: 'n1',
      title: 'Online Admission Open for Class 9 and 10 (Session 2026-27)',
      titleHi: 'शैक्षणिक सत्र 2026-27 हेतु कक्षा 9 एवं 10 में ऑनलाइन नामांकन प्रक्रिया प्रारंभ',
      description:
        'Online admission application portal is now active for Class 9 and Class 10. Prospective students are requested to fill out the online admission form with accurate personal and previous academic details. Keep a printed copy of the generated acknowledgment reference slip for office submission during document verification.',
      descriptionHi:
        'कक्षा 9 और 10 में प्रवेश हेतु ऑनलाइन नामांकन पोर्टल प्रारंभ हो चुका है। इच्छुक छात्र-छात्राएं पोर्टल पर अपना विवरण भरकर आवेदन जमा कर सकते हैं। आवेदन उपरांत प्राप्त संदर्भ रसीद को विद्यालय कार्यालय में सत्यापन हेतु सुरक्षित रखें।',
      category: 'admission',
      publicationDate: '2026-04-10',
      isPublished: true,
      attachmentUrl: '/assets/sample-notice.pdf',
    },
    {
      id: 'n2',
      title: 'Annual Examination 2026 Schedule & Evaluation Guidelines',
      titleHi: 'वार्षिक परीक्षा 2026 की समय सारणी एवं मूल्यांकन निर्देशिका',
      description:
        'Bihar School Examination Board (BSEB) matriculation practice and annual term examinations will be conducted according to the scheduled timetable. Students must reach the school campus 15 minutes prior to the commencement of the exam with their admit cards.',
      descriptionHi:
        'बिहार विद्यालय परीक्षा समिति द्वारा निर्धारित कार्यक्रम के अनुसार विद्यालय की वार्षिक परीक्षाएं संपन्न होंगी। परीक्षार्थी समय से 15 मिनट पूर्व अपने प्रवेश पत्र के साथ उपस्थित हों।',
      category: 'examination',
      publicationDate: '2026-04-05',
      isPublished: true,
      attachmentUrl: '/assets/exam-schedule.pdf',
    },
    {
      id: 'n3',
      title: 'School Closure Notice on Account of Public Holiday',
      titleHi: 'सार्वजनिक अवकाश के उपलक्ष्य में विद्यालय बंद रहने की सूचना',
      description:
        'The school shall remain closed on 31st March 2026 on account of government declared holiday. Regular academic classes will resume from the following working day at 09:30 AM.',
      descriptionHi:
        'सार्वजनिक अवकाश के कारण 31 मार्च 2026 को विद्यालय में पठन-पाठन स्थगित रहेगा। अगले कार्यदिवस से कक्षाएं समयानुसार संचालित होंगी।',
      category: 'holiday',
      publicationDate: '2026-03-28',
      isPublished: true,
    },
    {
      id: 'n4',
      title: 'Distribution of Free Textbooks and Academic Materials for Class 9',
      titleHi: 'कक्षा 9 के विद्यार्थियों हेतु निःशुल्क पाठ्यपुस्तक वितरण कार्यक्रम',
      description:
        'Under the state education welfare scheme, all enrolled students of Class 9 are informed that government textbooks and curriculum guides are being distributed in the school library.',
      descriptionHi:
        'राज्य सरकार की योजना के तहत कक्षा 9 के सभी नामांकित विद्यार्थियों को विद्यालय पुस्तकालय में निःशुल्क पाठ्यपुस्तकें वितरित की जा रही हैं।',
      category: 'academic',
      publicationDate: '2026-03-20',
      isPublished: true,
    },
    {
      id: 'n5',
      title: 'Parent-Teacher Meeting (PTM) for Secondary Classes',
      titleHi: 'माध्यमिक कक्षाओं हेतु अभिभावक-शिक्षक संगोष्ठी (पी.टी.एम.)',
      description:
        'A comprehensive Parent-Teacher Meeting is scheduled to discuss the student academic performance, attendance, and preparation for board examinations.',
      descriptionHi:
        'विद्यार्थियों की शैक्षणिक प्रगति एवं बोर्ड परीक्षा की तैयारी पर विमर्श हेतु अभिभावक-शिक्षक संगोष्ठी आयोजित की जा रही है। सभी अभिभावकों की उपस्थिति सादर प्रार्थित है।',
      category: 'general',
      publicationDate: '2026-03-15',
      isPublished: true,
    },
  ];

  const categories = [
    { id: 'all', label: language === 'hi' ? 'सभी सूचनाएं' : 'All Notices' },
    { id: 'admission', label: language === 'hi' ? 'नामांकन' : 'Admissions' },
    { id: 'examination', label: language === 'hi' ? 'परीक्षा' : 'Examinations' },
    { id: 'academic', label: language === 'hi' ? 'शैक्षणिक' : 'Academic' },
    { id: 'holiday', label: language === 'hi' ? 'अवकाश' : 'Holidays' },
    { id: 'general', label: language === 'hi' ? 'सामान्य' : 'General' },
  ];

  const filteredNotices = initialNotices.filter((notice) => {
    const matchesCategory = selectedCategory === 'all' || notice.category === selectedCategory;
    const title = language === 'hi' && notice.titleHi ? notice.titleHi : notice.title;
    const desc = language === 'hi' && notice.descriptionHi ? notice.descriptionHi : notice.description;
    const matchesQuery =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-semibold mb-2 border border-amber-200">
            <Bell className="w-3.5 h-3.5" />
            <span>{t('latestNoticeKicker')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0B2545] font-serif mb-2">
            {language === 'hi' ? 'आधिकारिक सूचना पट्ट' : 'Official Notice Board'}
          </h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            {language === 'hi'
              ? 'अरुण बिशननाथ उच्च विद्यालय की समस्त आधिकारिक घोषणाएं, परीक्षा कार्यक्रम एवं सूचनाएं'
              : 'Official circulars, examination schedules, and announcements from Arun Bishwanath High School, Aran.'}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  selectedCategory === c.id
                    ? 'bg-[#0B2545] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'hi' ? 'सूचना खोजें...' : 'Search notices...'}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B2545] focus:bg-white"
            />
          </div>
        </div>

        {/* Notices List */}
        <div className="space-y-4">
          {filteredNotices.length > 0 ? (
            filteredNotices.map((n) => (
              <div
                key={n.id}
                className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0B2545] flex flex-col items-center justify-center shrink-0 border border-blue-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                      {new Date(n.publicationDate).toLocaleString('default', { month: 'short' })}
                    </span>
                    <span className="text-base font-extrabold tabular-nums leading-none">
                      {new Date(n.publicationDate).getDate()}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        {n.category}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs text-slate-500 tabular-nums">
                        {n.publicationDate}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {language === 'hi' && n.titleHi ? n.titleHi : n.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                      {language === 'hi' && n.descriptionHi ? n.descriptionHi : n.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0">
                  <button
                    onClick={() => setActiveModalNotice(n)}
                    className="px-3.5 py-1.5 text-xs font-semibold text-[#0B2545] bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <span>{language === 'hi' ? 'पूरा पढ़ें' : 'Read Notice'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-12 rounded-xl border border-slate-200 text-center">
              <Bell className="w-8 h-8 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-700">{t('emptyState')}</p>
              <p className="text-xs text-slate-500 mt-1">
                {language === 'hi' ? 'कृपया अन्य श्रेणी अथवा खोज शब्द चुनें।' : 'Try selecting another category or clearing your search.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Notice Detail Lightbox Modal */}
      {activeModalNotice && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-xl w-full rounded-2xl shadow-xl overflow-hidden border border-slate-200 flex flex-col">
            <div className="bg-[#0B2545] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-300" />
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                  Official Circular · {activeModalNotice.category}
                </span>
              </div>
              <button
                onClick={() => setActiveModalNotice(null)}
                className="text-slate-300 hover:text-white p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <span className="text-xs text-slate-500 font-semibold mb-2 block tabular-nums">
                Date of Issue: {activeModalNotice.publicationDate}
              </span>
              <h2 className="text-xl font-bold text-slate-900 font-serif mb-4 leading-snug">
                {language === 'hi' && activeModalNotice.titleHi
                  ? activeModalNotice.titleHi
                  : activeModalNotice.title}
              </h2>
              <div className="text-sm text-slate-700 leading-relaxed space-y-3 whitespace-pre-line border-t border-slate-100 pt-4">
                {language === 'hi' && activeModalNotice.descriptionHi
                  ? activeModalNotice.descriptionHi
                  : activeModalNotice.description}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Authority: Office of the Headmaster
                </span>
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'प्रिंट / सेव करें' : 'Print / Save'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
