import React, { useState } from 'react';
import { Menu, X, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onOpenModal: (type: 'login' | 'signup' | 'help') => void;
}

const LANGUAGES = [
  'বাংলা', 'English', 'हिन्दी', 'العربية', 'اردو'
];

const LANGUAGE_MAP: Record<string, 'bn' | 'en' | 'hi' | 'ar' | 'ur'> = {
  'বাংলা': 'bn',
  'English': 'en',
  'हिन्दी': 'hi',
  'العربية': 'ar',
  'اردو': 'ur'
};

const getLanguageCode = (lang: string) => LANGUAGE_MAP[lang] || 'en';

export const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguagesExpanded, setIsLanguagesExpanded] = useState(false);
  const { setLanguage, t, language } = useLanguage();
  const currentLanguageName = LANGUAGES.find((l) => getLanguageCode(l) === language) || 'বাংলা';

  return (
    <header className="sticky top-0 z-[1000] bg-pink-50/90 backdrop-blur-md border-b border-pink-200">
      <div className="flex items-center justify-between px-3 sm:px-5 py-2 sm:py-2.5 max-w-7xl mx-auto">
        <div className="text-sm sm:text-base md:text-lg font-bold text-pink-900 flex items-center gap-1.5 sm:gap-2 tracking-tight shrink-0">
          <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-pink-400 to-rose-400 rounded-lg flex items-center justify-center text-white text-xs sm:text-sm shadow-xs">📚</div> 
          <span className="font-extrabold">{t.siteTitle || "Let's Learn and Teach"}</span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Language Selector - Compact text & padding */}
            <div className="relative">
              <button 
                className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-pink-900 hover:text-pink-700 bg-white/80 border border-pink-200 px-2 sm:px-2.5 py-1 rounded-full shadow-xs transition-colors"
                onClick={() => setIsLanguagesExpanded(!isLanguagesExpanded)}
              >
                <span className="text-xs sm:text-sm">🌐</span>
                <span>{currentLanguageName}</span>
                {isLanguagesExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </button>
              
              {isLanguagesExpanded && (
                <div className="absolute right-0 top-full mt-1.5 w-32 sm:w-36 bg-white shadow-xl rounded-xl border border-pink-100 p-1.5 z-50 max-h-[260px] overflow-y-auto">
                  {LANGUAGES.map((lang) => (
                    <button 
                      key={lang} 
                      onClick={() => { 
                        setLanguage(getLanguageCode(lang)); 
                        setIsLanguagesExpanded(false); 
                      }} 
                      className="w-full text-left text-xs p-1.5 hover:bg-pink-50 rounded-lg text-pink-900 font-medium"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Help / সাহায্য করুন Button - Compact */}
            <button
              onClick={() => onOpenModal('help')}
              className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-pink-900 hover:text-pink-700 bg-white/80 hover:bg-white border border-pink-200 px-2 sm:px-2.5 py-1 rounded-full shadow-xs transition-all"
              title={t.help || 'সাহায্য করুন'}
            >
              <HelpCircle size={13} className="text-pink-600 shrink-0" />
              <span>{t.help || 'সাহায্য করুন'}</span>
            </button>

            {/* Desktop Auth Buttons - Compact & Refined */}
            <div className="hidden md:flex items-center gap-2">
              <button onClick={() => onOpenModal('login')} className="text-xs font-bold text-pink-900 hover:text-pink-600 px-2 py-1 transition-colors">
                {t.signIn}
              </button>
              <button onClick={() => onOpenModal('signup')} className="text-xs font-bold bg-pink-600 text-white px-3 py-1.5 rounded-full hover:bg-pink-700 shadow-xs transition-colors">
                {t.signUp}
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-1 rounded-full hover:bg-pink-100 text-pink-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-pink-100 p-4 flex flex-col gap-2.5 shadow-lg">
          <button 
            onClick={() => { onOpenModal('help'); setIsMenuOpen(false); }} 
            className="flex items-center gap-2 text-left text-sm font-semibold text-pink-900 p-2.5 hover:bg-pink-50 rounded-lg border border-pink-100 bg-pink-50/40"
          >
            <HelpCircle size={17} className="text-pink-600" />
            <span>{t.help || 'সাহায্য করুন'}</span>
          </button>
          <button 
            onClick={() => { onOpenModal('login'); setIsMenuOpen(false); }} 
            className="text-left text-sm font-semibold text-pink-900 p-2.5 hover:bg-pink-50 rounded-lg"
          >
            {t.signIn}
          </button>
          <button 
            onClick={() => { onOpenModal('signup'); setIsMenuOpen(false); }} 
            className="text-left text-sm font-semibold text-white bg-pink-600 p-2.5 rounded-lg hover:bg-pink-700 shadow-sm"
          >
            {t.signUp}
          </button>
        </div>
      )}
    </header>
  );
};
