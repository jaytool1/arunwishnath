import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  Send,
  CheckCircle2,
  ExternalLink,
  Compass,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const Contact: React.FC = () => {
  const { language, t } = useLanguage();

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Google Maps Grounding State with Gemini 3.8 Flash
  const [groundingInfo, setGroundingInfo] = useState<{
    text: string;
    links: Array<{ uri: string; title: string }>;
  } | null>(null);
  const [loadingGrounding, setLoadingGrounding] = useState(false);

  useEffect(() => {
    fetchGrounding();
  }, []);

  const fetchGrounding = async () => {
    setLoadingGrounding(true);
    try {
      const response = await fetch('/api/maps/grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: 'Provide detailed transport, road route directions, and landmark guidance from Saharsa Railway Station to Arun Bishwanath High School in Aran, Saharsa, Bihar 852124.',
        }),
      });
      const data = await response.json();
      if (data.success) {
        setGroundingInfo({
          text: data.text,
          links: data.links || [],
        });
      }
    } catch (err) {
      console.error('Failed to load maps grounding:', err);
    } finally {
      setLoadingGrounding(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormState({ name: '', email: '', phone: '', message: '' });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-semibold text-blue-700 uppercase tracking-widest block mb-2">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0B2545] font-serif mb-2">
            {language === 'hi' ? 'सम्पर्क एवं विद्यालय अवस्थिति' : 'Contact & Campus Location'}
          </h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Arun Bishwanath High School, Aran, Saharsa, Bihar - 852124, India
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          {/* Left Column: Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
              <h2 className="text-lg font-bold text-[#0B2545] font-serif border-b border-slate-100 pb-3">
                {language === 'hi' ? 'कार्यालय सम्पर्क विवरण' : 'Administrative Office'}
              </h2>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    {language === 'hi' ? 'विद्यालय का पता' : 'Postal Address'}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Arun Bishwanath High School<br />
                    Village & Post: Aran, District: Saharsa<br />
                    Bihar, India — PIN: 852124
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    {language === 'hi' ? 'दूरभाष सम्पर्क' : 'Telephone'}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    <a href="tel:7631083566" className="font-mono font-bold text-slate-900 hover:text-blue-700">
                      7631083566
                    </a>
                  </p>
                  <span className="text-[11px] text-slate-400">Available during working hours</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    {language === 'hi' ? 'ईमेल पता' : 'Official Email'}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    <a
                      href="mailto:arunvishwanathhighschoolaran@gmail.com"
                      className="text-blue-700 hover:underline break-all font-medium"
                    >
                      arunvishwanathhighschoolaran@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-2 border-t border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    {language === 'hi' ? 'कार्यालय समय' : 'Office Timings'}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Monday to Saturday: 09:30 AM – 04:00 PM<br />
                    Sunday & Gazetted Holidays: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Directions CTA */}
            <div className="bg-[#0B2545] text-white p-5 rounded-2xl shadow-sm flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm">
                  {language === 'hi' ? 'गूगल मैप्स पर देखें' : 'Navigate via Google Maps'}
                </h4>
                <p className="text-xs text-blue-200 mt-0.5">Aran, Saharsa, Bihar 852124</p>
              </div>
              <a
                href="https://maps.google.com/?q=Aran,+Saharsa,+Bihar+852124"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-white text-[#0B2545] font-bold text-xs rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1.5"
              >
                <span>Open Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Query Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
            <h2 className="text-xl font-bold text-[#0B2545] font-serif mb-2">
              {language === 'hi' ? 'पूछताछ एवं संदेश प्रपत्र' : 'Send an Enquiry'}
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              {language === 'hi'
                ? 'नामांकन, परीक्षा अथवा विद्यालय संबंधी किसी भी प्रश्न हेतु संदेश भेजें।'
                : 'For admissions, examinations, or general administrative queries.'}
            </p>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-emerald-900 mb-1">
                  {language === 'hi' ? 'संदेश सफलतापूर्वक प्राप्त हुआ!' : 'Enquiry Received Successfully!'}
                </h3>
                <p className="text-xs text-emerald-700 mb-4">
                  {language === 'hi'
                    ? 'हमारा प्रशासनिक दल शीघ्र ही आपसे सम्पर्क करेगा।'
                    : 'The school administration will review your query and respond shortly.'}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 text-xs font-semibold bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B2545] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      placeholder="10-digit mobile"
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B2545] focus:bg-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B2545] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Message / प्रश्न विवरण *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Enter your message or inquiry here..."
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B2545] focus:bg-white"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 bg-[#0B2545] hover:bg-blue-900 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-2 shadow-xs disabled:opacity-60"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submitting ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Google Maps Grounding Section with Gemini 3.8 Flash */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <Compass className="w-5 h-5 text-blue-700" />
              <div>
                <h2 className="text-lg font-bold text-[#0B2545] font-serif">
                  {language === 'hi' ? 'सहरसा जंक्शन से यात्रा मार्गदर्शिका (गूगल मैप्स ग्राउंडिंग)' : 'Route Guidance from Saharsa Junction (Google Maps Grounding)'}
                </h2>
                <p className="text-xs text-slate-500">
                  AI-assisted verified transit routes and landmarks to Arun Bishwanath High School, Aran
                </p>
              </div>
            </div>

            <button
              onClick={fetchGrounding}
              disabled={loadingGrounding}
              className="px-3.5 py-1.5 bg-blue-50 text-[#0B2545] hover:bg-blue-100 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>{loadingGrounding ? 'Updating Route...' : 'Refresh Route'}</span>
            </button>
          </div>

          {loadingGrounding ? (
            <div className="py-8 flex items-center justify-center gap-2 text-xs text-slate-500">
              <Loader2 className="w-4 h-4 animate-spin text-blue-700" />
              <span>Retrieving verified geographical data from Google Maps...</span>
            </div>
          ) : groundingInfo ? (
            <div className="space-y-4">
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/80 whitespace-pre-line">
                {groundingInfo.text}
              </div>

              {groundingInfo.links.length > 0 && (
                <div className="pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                    Verified Google Maps Links:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {groundingInfo.links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.uri}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-semibold rounded-lg border border-blue-200 transition-colors"
                      >
                        <MapPin className="w-3.5 h-3.5 text-blue-600" />
                        <span>{link.title}</span>
                        <ExternalLink className="w-3 h-3 text-blue-500" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
