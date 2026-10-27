import React, { useState } from 'react';
import { Image, Sparkles, X, Maximize2, Download, Tag, Loader2, Check } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const Gallery: React.FC = () => {
  const { language, t } = useLanguage();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<any | null>(null);

  // AI Image Generator State
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('An authentic rural high school science laboratory in Bihar with students observing a microscope experiment, natural sunlight, academic atmosphere.');
  const [aiResolution, setAiResolution] = useState<'1K' | '2K' | '4K'>('1K');
  const [aiAspectRatio, setAiAspectRatio] = useState<'16:9' | '4:3' | '1:1'>('16:9');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const realBuildingPhoto = '/assets/aistudio/Arun_Bishwanath_High_School_Homepage_5df6554f.png';

  const [galleryItems, setGalleryItems] = useState([
    {
      id: 'g1',
      title: 'Main School Building & Entrance Gate',
      titleHi: 'मुख्य विद्यालय भवन एवं प्रवेश द्वार',
      category: 'campus',
      imageUrl: realBuildingPhoto,
      caption: 'Arun Bishwanath High School building in Aran, Saharsa with distinctive blue and white pillars.',
    },
    {
      id: 'g2',
      title: 'Secondary Academic Classrooms',
      titleHi: 'माध्यमिक अध्ययन वर्ग-कक्ष',
      category: 'classroom',
      imageUrl: realBuildingPhoto,
      caption: 'Organized classroom benches and blackboard for Class 9 and 10 students.',
    },
    {
      id: 'g3',
      title: 'School Library & Reading Section',
      titleHi: 'विद्यालय पुस्तकालय एवं अध्ययन कक्ष',
      category: 'library',
      imageUrl: realBuildingPhoto,
      caption: 'Reference books, text materials, and reading shelves for students.',
    },
    {
      id: 'g4',
      title: 'School Sports Ground & Morning Assembly',
      titleHi: 'खेल प्रांगण एवं प्रातःकालीन प्रार्थना सभा',
      category: 'sports',
      imageUrl: realBuildingPhoto,
      caption: 'Open grounds for physical activities and cultural events.',
    },
  ]);

  const categories = [
    { id: 'all', label: language === 'hi' ? 'सभी चित्र' : 'All Photos' },
    { id: 'campus', label: language === 'hi' ? 'परिसर' : 'Campus' },
    { id: 'classroom', label: language === 'hi' ? 'कक्षाकक्ष' : 'Classrooms' },
    { id: 'library', label: language === 'hi' ? 'पुस्तकालय' : 'Library' },
    { id: 'sports', label: language === 'hi' ? 'खेलकूद' : 'Sports' },
  ];

  const filteredItems = galleryItems.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  const handleGenerateAiImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    setIsGenerating(true);
    setAiError(null);

    try {
      const response = await fetch('/api/images/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: aiPrompt,
          aspectRatio: aiAspectRatio,
          imageSize: aiResolution,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.imageUrl) {
        throw new Error(data.error || 'Failed to generate image');
      }

      const newItem = {
        id: `ai_${Date.now()}`,
        title: `AI Generated: ${aiPrompt.substring(0, 30)}...`,
        titleHi: `चित्र: ${aiPrompt.substring(0, 30)}...`,
        category: 'campus',
        imageUrl: data.imageUrl,
        caption: `Generated with Gemini (${aiResolution} resolution, ${aiAspectRatio})`,
      };

      setGalleryItems([newItem, ...galleryItems]);
      setShowAiModal(false);
    } catch (err: any) {
      setAiError(err.message || 'Generation error');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-widest block mb-1">
              Visual Archive
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0B2545] font-serif">
              {language === 'hi' ? 'विद्यालय चित्र दीर्घा' : 'School Photo Gallery'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {language === 'hi'
                ? 'अरुण बिशननाथ उच्च विद्यालय के परिसर, कक्षाकक्ष एवं आयोजनों के प्रामाणिक चित्र'
                : 'Photographs of Arun Bishwanath High School campus, facilities, and academic spaces.'}
            </p>
          </div>

          {/* AI Image Generation Studio Button */}
          <button
            onClick={() => setShowAiModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white text-xs font-bold rounded-xl shadow-sm flex items-center gap-2 self-start sm:self-auto transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{language === 'hi' ? 'AI चित्र निर्माण टूल' : 'AI Campus Visual Studio'}</span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-8 bg-white p-3 rounded-xl border border-slate-200">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeCategory === c.id
                  ? 'bg-[#0B2545] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col"
            >
              <div className="aspect-16/10 relative overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-9 h-9 rounded-full bg-white/80 text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
                <span className="absolute top-2 left-2 bg-[#0B2545]/80 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">
                  {item.category}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-700 transition-colors">
                  {language === 'hi' && item.titleHi ? item.titleHi : item.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col max-h-[90vh]">
            <div className="p-4 bg-[#0B2545] text-white flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                {selectedImage.category} · Arun Bishwanath High School
              </span>
              <button
                onClick={() => setSelectedImage(null)}
                className="text-slate-300 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-950 flex items-center justify-center overflow-hidden max-h-[65vh]">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="max-h-[65vh] w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-5 bg-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {language === 'hi' && selectedImage.titleHi
                    ? selectedImage.titleHi
                    : selectedImage.title}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">{selectedImage.caption}</p>
              </div>
              <button
                onClick={() => window.open(selectedImage.imageUrl, '_blank')}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Open Full</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Campus Image Generator Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="p-5 bg-[#0B2545] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-300" />
                <h3 className="font-bold text-sm">
                  {language === 'hi' ? 'AI विद्यालय छवि जनरेटर' : 'AI Campus Visual Studio'}
                </h3>
              </div>
              <button
                onClick={() => setShowAiModal(false)}
                className="text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleGenerateAiImage} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Image Prompt / दृश्य विवरण
                </label>
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  rows={3}
                  required
                  placeholder="Describe school facility, science fair, sports event..."
                  className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B2545]"
                />
              </div>

              {/* Resolution Affordance: 1K, 2K, 4K */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Resolution / छवि रिज़ॉल्यूशन (Gemini Pro Image)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['1K', '2K', '4K'] as const).map((res) => (
                    <button
                      key={res}
                      type="button"
                      onClick={() => setAiResolution(res)}
                      className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                        aiResolution === res
                          ? 'bg-[#0B2545] text-white border-[#0B2545] shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {res} Ultra-HD
                    </button>
                  ))}
                </div>
              </div>

              {/* Aspect Ratio */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Aspect Ratio / आयाम
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['16:9', '4:3', '1:1'] as const).map((ar) => (
                    <button
                      key={ar}
                      type="button"
                      onClick={() => setAiAspectRatio(ar)}
                      className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                        aiAspectRatio === ar
                          ? 'bg-[#0B2545] text-white border-[#0B2545] shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {ar}
                    </button>
                  ))}
                </div>
              </div>

              {aiError && (
                <p className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
                  {aiError}
                </p>
              )}

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAiModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="px-5 py-2 bg-[#0B2545] hover:bg-blue-900 text-white font-bold text-xs rounded-lg flex items-center gap-2 shadow-xs disabled:opacity-60"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Generating Image ({aiResolution})...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Generate Asset</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
