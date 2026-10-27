import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Shield, Award, BookOpen } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();
  const currentYear = 2026;

  return (
    <footer className="bg-[#0B2545] text-slate-300 border-t border-blue-900/60 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-blue-900/40">
          {/* Column 1: School Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#0B2545] font-bold">
                <BookOpen className="w-5 h-5 text-[#0B2545]" />
              </div>
              <div>
                <h3 className="text-white font-bold text-base leading-tight font-serif">
                  {language === 'hi' ? 'अरुण बिशननाथ उच्च विद्यालय' : 'Arun Bishwanath High School'}
                </h3>
                <p className="text-xs text-blue-200">
                  {language === 'hi' ? 'अरान, सहरसा, बिहार' : 'Aran, Saharsa, Bihar'}
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'hi'
                ? 'बिहार विद्यालय परीक्षा समिति (बीएसईबी) से संबद्ध सरकारी सहायता प्राप्त विद्यालय। कक्षा 9 एवं 10 के विद्यार्थियों के लिए समर्पित।'
                : 'Government Aided School under BSEB, providing quality secondary education to students of Class 9 and 10 with dedication and discipline.'}
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-amber-300">
              <Award className="w-4 h-4" />
              <span>BSEB Code: Secondary 852124</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              {language === 'hi' ? 'महत्वपूर्ण लिंक' : 'Quick Links'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/admission" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-blue-400">›</span> {t('navAdmission')}
                </Link>
              </li>
              <li>
                <Link to="/results" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-blue-400">›</span> {t('navResults')}
                </Link>
              </li>
              <li>
                <Link to="/notices" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-blue-400">›</span> {t('navNotices')}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-blue-400">›</span> {t('navGallery')}
                </Link>
              </li>
              <li>
                <Link to="/downloads" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-blue-400">›</span> {t('navDownloads')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span className="text-blue-400">›</span> {t('navAbout')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Timings */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              {language === 'hi' ? 'सम्पर्क विवरण' : 'Contact Details'}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Aran, Saharsa, Bihar - 852124, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="tel:7631083566" className="hover:text-white transition-colors">
                  7631083566
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <a
                  href="mailto:arunvishwanathhighschoolaran@gmail.com"
                  className="hover:text-white transition-colors break-all"
                >
                  arunvishwanathhighschoolaran@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  {language === 'hi'
                    ? 'कार्यालय समय: प्रातः 09:30 से अपराह्न 04:00 (सोमवार - शनिवार)'
                    : 'Office Hours: 09:30 AM - 04:00 PM (Mon - Sat)'}
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: School Administration */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              {language === 'hi' ? 'प्रशासन एवं सहायता' : 'Administration & Help'}
            </h4>
            <p className="text-xs text-slate-300 mb-3 leading-relaxed">
              {language === 'hi'
                ? 'अधिकृत शिक्षक एवं प्रशासनिक कर्मी अपने क्रेडेंशियल्स के साथ पोर्टल में लॉगिन कर सकते हैं।'
                : 'Authorized teaching and administrative staff can sign in to manage school records and notices.'}
            </p>
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-white bg-[#133E75] hover:bg-blue-600 rounded transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-blue-200" />
              <span>{language === 'hi' ? 'प्रशासन पोर्टल में प्रवेश' : 'Access Admin Portal'}</span>
            </Link>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>
            © {currentYear} {language === 'hi' ? 'अरुण बिशननाथ उच्च विद्यालय, अरान, सहरसा' : 'Arun Bishwanath High School, Aran, Saharsa'}. {t('allRightsReserved')}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/" className="hover:text-slate-200 transition-colors">{t('navHome')}</Link>
            <span>·</span>
            <Link to="/about" className="hover:text-slate-200 transition-colors">{t('navAbout')}</Link>
            <span>·</span>
            <Link to="/notices" className="hover:text-slate-200 transition-colors">{t('navNotices')}</Link>
            <span>·</span>
            <Link to="/admission" className="hover:text-slate-200 transition-colors">{t('navAdmission')}</Link>
            <span>·</span>
            <Link to="/results" className="hover:text-slate-200 transition-colors">{t('navResults')}</Link>
            <span>·</span>
            <Link to="/contact" className="hover:text-slate-200 transition-colors">{t('navContact')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
