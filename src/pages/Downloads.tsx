import React, { useState } from 'react';
import { Download, FileText, Search, BookOpen, Calendar, HelpCircle, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { DownloadItem } from '../types';

export const Downloads: React.FC = () => {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const downloads: DownloadItem[] = [
    {
      id: 'd1',
      title: 'BSEB Class 9 & 10 Hindi Medium Syllabus & Curriculum 2026-27',
      titleHi: 'बीएसईबी कक्षा 9 एवं 10 हिन्दी माध्यम पाठ्यक्रम एवं विवरणिका 2026-27',
      category: 'syllabus',
      fileUrl: '#',
      fileSize: '1.4 MB',
      fileType: 'PDF',
      isPublished: true,
      createdAt: '2026-03-25',
    },
    {
      id: 'd2',
      title: 'Offline Admission Application Form (Classes 9 & 10)',
      titleHi: 'ऑफलाइन नामांकन प्रपत्र (कक्षा 9 एवं 10)',
      category: 'admission_form',
      fileUrl: '#',
      fileSize: '450 KB',
      fileType: 'PDF',
      isPublished: true,
      createdAt: '2026-04-01',
    },
    {
      id: 'd3',
      title: 'School Academic Calendar & Holiday List 2026-2027',
      titleHi: 'विद्यालय शैक्षणिक कैलेंडर एवं अवकाश सूची 2026-2027',
      category: 'academic_calendar',
      fileUrl: '#',
      fileSize: '780 KB',
      fileType: 'PDF',
      isPublished: true,
      createdAt: '2026-01-10',
    },
    {
      id: 'd4',
      title: 'BSEB Matriculation Model Question Paper Set (Mathematics & Science)',
      titleHi: 'बीएसईबी मैट्रिक मॉडल प्रश्न पत्र सेट (गणित एवं विज्ञान)',
      category: 'model_paper',
      fileUrl: '#',
      fileSize: '2.1 MB',
      fileType: 'PDF',
      isPublished: true,
      createdAt: '2026-02-15',
    },
    {
      id: 'd5',
      title: 'Government Scholarship & Free Textbook Distribution Circular',
      titleHi: 'सरकारी छात्रवृत्ति एवं निःशुल्क पाठ्यपुस्तक वितरण मार्गदर्शिका',
      category: 'circular',
      fileUrl: '#',
      fileSize: '520 KB',
      fileType: 'PDF',
      isPublished: true,
      createdAt: '2026-03-18',
    },
  ];

  const categories = [
    { id: 'all', label: language === 'hi' ? 'सभी दस्तावेज' : 'All Files' },
    { id: 'syllabus', label: language === 'hi' ? 'पाठ्यक्रम' : 'Syllabus' },
    { id: 'admission_form', label: language === 'hi' ? 'नामांकन प्रपत्र' : 'Admission Form' },
    { id: 'academic_calendar', label: language === 'hi' ? 'शैक्षणिक कैलेंडर' : 'Calendar' },
    { id: 'model_paper', label: language === 'hi' ? 'मॉडल पेपर्स' : 'Model Papers' },
    { id: 'circular', label: language === 'hi' ? 'परिपत्र' : 'Circulars' },
  ];

  const filtered = downloads.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const title = language === 'hi' && item.titleHi ? item.titleHi : item.title;
    const matchesQuery = title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleDownload = (item: DownloadItem) => {
    // Generate simulated PDF text download
    const title = language === 'hi' && item.titleHi ? item.titleHi : item.title;
    const content = `Arun Bishwanath High School, Aran, Saharsa, Bihar - 852124\nDocument: ${title}\nCategory: ${item.category}\nDate: ${item.createdAt}\nOfficial Board: BSEB Patna\n(Verified school publication document)`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${item.id}_${item.category}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-semibold mb-2 border border-purple-200">
            <Download className="w-3.5 h-3.5" />
            <span>Document Repository</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0B2545] font-serif mb-2">
            {language === 'hi' ? 'दस्तावेज़ एवं प्रपत्र डाउनलोड' : 'Downloads & Forms'}
          </h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            {language === 'hi'
              ? 'बीएसईबी पाठ्यक्रम, ऑफलाइन नामांकन फॉर्म, मॉडल प्रश्नपत्र तथा शैक्षणिक कैलेंडर'
              : 'Official syllabus, admission forms, model question papers, and school calendars for Class 9 and 10.'}
          </p>
        </div>

        {/* Filter & Search */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
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

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'hi' ? 'दस्तावेज खोजें...' : 'Search downloads...'}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B2545] focus:bg-white"
            />
          </div>
        </div>

        {/* Downloads Table / Cards */}
        <div className="space-y-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-xs shrink-0 border border-purple-100">
                  {item.fileType}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {language === 'hi' && item.titleHi ? item.titleHi : item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                    <span className="uppercase font-semibold text-slate-500">{item.category}</span>
                    <span>·</span>
                    <span className="tabular-nums font-mono">{item.fileSize}</span>
                    <span>·</span>
                    <span className="tabular-nums">{item.createdAt}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDownload(item)}
                className="px-4 py-2 bg-[#0B2545] hover:bg-blue-900 text-white rounded-lg text-xs font-semibold flex items-center gap-2 self-start sm:self-auto transition-colors shadow-xs shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'डाउनलोड करें' : 'Download'}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
