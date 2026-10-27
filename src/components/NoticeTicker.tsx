import React from 'react';
import { Link } from 'react-router-dom';
import { Megaphone, ChevronRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface NoticeTickerProps {
  notices?: Array<{ id: string; title: string; titleHi?: string }>;
}

export const NoticeTicker: React.FC<NoticeTickerProps> = ({ notices }) => {
  const { language, t } = useLanguage();

  const defaultNotices = [
    {
      id: 'n1',
      title: 'Online Admission for Class 9 and 10 is now open for academic session 2026-27.',
      titleHi: 'शैक्षणिक सत्र 2026-27 हेतु कक्षा 9 एवं 10 में ऑनलाइन नामांकन प्रारंभ है।',
    },
    {
      id: 'n2',
      title: 'Annual BSEB Examination Model Papers and syllabus updated in Downloads section.',
      titleHi: 'वार्षिक परीक्षा के मॉडल प्रश्नपत्र एवं पाठ्यक्रम डाउनलोड अनुभाग में उपलब्ध हैं।',
    },
    {
      id: 'n3',
      title: 'Parent-Teacher Meeting scheduled for upcoming Saturday at 10:00 AM.',
      titleHi: 'अभिभावक-शिक्षक संगोष्ठी आगामी शनिवार प्रातः 10:00 बजे आयोजित की जाएगी।',
    },
  ];

  const displayList = notices && notices.length > 0 ? notices : defaultNotices;

  return (
    <div className="bg-slate-100 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2 flex items-center justify-between gap-4">
        {/* Ticker Badge */}
        <div className="flex items-center gap-2 bg-[#0B2545] text-white px-3.5 py-1.5 rounded-md text-xs font-semibold shrink-0 shadow-xs">
          <Megaphone className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
          <span>{t('latestNoticeKicker')}</span>
        </div>

        {/* Marquee or Scrolling text */}
        <div className="overflow-hidden flex-1 relative h-6 flex items-center">
          <div className="whitespace-nowrap flex items-center gap-8 text-xs text-slate-800 font-medium animate-marquee hover:pause">
            {displayList.map((item, idx) => (
              <span key={item.id || idx} className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
                <span>{language === 'hi' && item.titleHi ? item.titleHi : item.title}</span>
                <span className="text-slate-300 ml-4">|</span>
              </span>
            ))}
          </div>
        </div>

        {/* View All link */}
        <Link
          to="/notices"
          className="text-xs font-semibold text-[#0B2545] hover:text-blue-700 flex items-center gap-1 shrink-0 whitespace-nowrap"
        >
          <span>{t('viewAllNotices')}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
