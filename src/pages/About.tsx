import React from 'react';
import { Landmark, GraduationCap, Award, BookOpen, CheckCircle2, MapPin, Users, HeartHandshake } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const About: React.FC = () => {
  const { language, t } = useLanguage();

  const faculties = [
    {
      name: 'Dr. R. K. Jha',
      nameHi: 'डॉ. आर. के. झा',
      designation: 'Principal / Headmaster',
      designationHi: 'प्रधानाध्यापक',
      department: 'Administration & Sanskrit',
      qualification: 'M.A., Ph.D., B.Ed.',
    },
    {
      name: 'Shri B. N. Yadav',
      nameHi: 'श्री बी. एन. यादव',
      designation: 'Senior Teacher',
      designationHi: 'वरिष्ठ शिक्षक',
      department: 'Mathematics & Science',
      qualification: 'M.Sc. (Math), B.Ed.',
    },
    {
      name: 'Smt. Anjali Sharma',
      nameHi: 'श्रीमती अंजलि शर्मा',
      designation: 'Assistant Teacher',
      designationHi: 'सहायक शिक्षिका',
      department: 'Hindi & Social Science',
      qualification: 'M.A. (Hindi), B.Ed.',
    },
    {
      name: 'Shri Manoj Kumar',
      nameHi: 'श्री मनोज कुमार',
      designation: 'Assistant Teacher',
      designationHi: 'सहायक शिक्षक',
      department: 'English & Physical Education',
      qualification: 'B.A. (English), B.P.Ed.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-semibold text-blue-700 uppercase tracking-widest block mb-2">
            {language === 'hi' ? 'संक्षिप्त ऐतिहासिक परिचय' : 'Institutional Profile'}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0B2545] font-serif mb-3">
            {language === 'hi'
              ? 'अरुण बिशननाथ उच्च विद्यालय, अरान, सहरसा'
              : 'About Arun Bishwanath High School, Aran'}
          </h1>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            {language === 'hi'
              ? 'बिहार विद्यालय परीक्षा समिति (बीएसईबी) से संबद्ध, ग्रामीण बिहार में माध्यमिक शिक्षा का एक प्रतिष्ठित केंद्र।'
              : 'A distinguished government-aided secondary institution in Aran, Saharsa dedicated to academic excellence in Class 9 and 10.'}
          </p>
        </div>

        {/* Overview Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-10">
          <h2 className="text-xl font-bold text-[#0B2545] font-serif mb-4 flex items-center gap-2">
            <Landmark className="w-5 h-5 text-blue-700" />
            <span>{language === 'hi' ? 'हमारा ध्येय और पृष्ठभूमि' : 'Our Vision & Background'}</span>
          </h2>
          <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
            <p>
              {language === 'hi'
                ? 'अरुण बिशननाथ उच्च विद्यालय, अरान (सहरसा, बिहार - पिन 852124) एक सरकारी सहायता प्राप्त माध्यमिक विद्यालय है जो बिहार विद्यालय परीक्षा समिति (बीएसईबी) के पाठ्यक्रम का अनुसरण करता है। विद्यालय में कक्षा 9 और 10 के विद्यार्थियों को समर्पित एवं सुयोग्य शिक्षकों द्वारा हिन्दी माध्यम में गुणवत्तापूर्ण शिक्षा दी जाती है।'
                : 'Arun Bishwanath High School, Aran (Saharsa, Bihar - PIN 852124) is a recognized government-aided institution adhering strictly to the curriculum of the Bihar School Examination Board (BSEB). Providing instruction in Hindi medium for Class 9 and 10, the school is devoted to providing an egalitarian, academically stimulating environment for rural learners.'}
            </p>
            <p>
              {language === 'hi'
                ? 'हमारा उद्देश्य न केवल विद्यार्थियों को मैट्रिक परीक्षा में उत्कृष्ट सफलता दिलाना है, बल्कि उनके भीतर नैतिक संस्कार, सामाजिक उत्तरदायित्व और वैज्ञानिक दृष्टिकोण का संचार करना भी है।'
                : 'Beyond matriculation board success, our pedagogical focus emphasizes foundational scientific inquiry, linguistic proficiency, and moral discipline necessary for lifelong contribution to society.'}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100">
            <div className="p-3 bg-slate-50 rounded-lg text-center">
              <span className="text-xs text-slate-500 font-semibold block">Affiliation</span>
              <span className="text-sm font-bold text-[#0B2545]">BSEB Patna</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg text-center">
              <span className="text-xs text-slate-500 font-semibold block">Levels</span>
              <span className="text-sm font-bold text-[#0B2545]">Classes 9 & 10</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg text-center">
              <span className="text-xs text-slate-500 font-semibold block">Medium</span>
              <span className="text-sm font-bold text-[#0B2545]">Hindi</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg text-center">
              <span className="text-xs text-slate-500 font-semibold block">Location</span>
              <span className="text-sm font-bold text-[#0B2545]">Aran, Saharsa</span>
            </div>
          </div>
        </div>

        {/* Infrastructure Highlights */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-10">
          <h2 className="text-xl font-bold text-[#0B2545] font-serif mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>{language === 'hi' ? 'परिसर एवं शैक्षणिक सुविधाएं' : 'Campus Infrastructure & Facilities'}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50">
              <h3 className="font-bold text-sm text-slate-900 mb-2">
                {language === 'hi' ? 'विशाल कक्षाकक्ष' : 'Spacious Classrooms'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'hi'
                  ? 'उचित प्रकाश, पंखे तथा ब्लैकबोर्ड से युक्त हवादार कक्षाकक्ष जहां विद्यार्थी सुचारू रूप से अध्ययन करते हैं।'
                  : 'Well-ventilated classrooms with appropriate seating, lighting, and instructional boards.'}
              </p>
            </div>
            <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50">
              <h3 className="font-bold text-sm text-slate-900 mb-2">
                {language === 'hi' ? 'विज्ञान प्रायोगिक कक्ष' : 'Science Laboratory'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'hi'
                  ? 'भौतिकी, रसायन एवं जीव विज्ञान के प्रायोगिक अभ्यास हेतु आवश्यक मॉडल, चार्ट एवं उपकरण।'
                  : 'Essential laboratory apparatus, specimen charts, and practical demonstration kits.'}
              </p>
            </div>
            <div className="border border-slate-100 rounded-xl p-4 bg-slate-50/50">
              <h3 className="font-bold text-sm text-slate-900 mb-2">
                {language === 'hi' ? 'पुस्तकालय एवं खेल मैदान' : 'Library & Sports Ground'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'hi'
                  ? 'पाठ्यपुस्तकें, संदर्भ ग्रंथ तथा विद्यार्थियों के शारीरिक विकास हेतु विस्तृत खेल प्रांगण।'
                  : 'Collection of reference books, NCERT textbooks, and an open ground for physical development.'}
              </p>
            </div>
          </div>
        </div>

        {/* Faculty & Staff */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-[#0B2545] font-serif">
                {language === 'hi' ? 'शिक्षक एवं प्रशासनिक संकाय' : 'Teaching & Administrative Faculty'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {language === 'hi' ? 'योग्य एवं समर्पित शिक्षकगण' : 'Dedicated educators guiding Class 9 and 10 students'}
              </p>
            </div>
            <Users className="w-5 h-5 text-blue-700" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {faculties.map((f, i) => (
              <div key={i} className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl bg-slate-50">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-[#0B2545] flex items-center justify-center font-bold text-base shrink-0">
                  {f.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {language === 'hi' ? f.nameHi : f.name}
                  </h4>
                  <p className="text-xs font-semibold text-blue-700">
                    {language === 'hi' ? f.designationHi : f.designation}
                  </p>
                  <p className="text-[11px] text-slate-500">{f.department}</p>
                  <span className="text-[10px] text-slate-400 font-medium">{f.qualification}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
