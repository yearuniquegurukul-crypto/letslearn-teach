import React from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { Content } from './Content';
import { QASection } from './QASection';
import { useLanguage } from '../context/LanguageContext';

export const MainContent: React.FC<{ openModal: (type: 'login' | 'signup' | 'help') => void }> = ({ openModal }) => {
  const { t, language } = useLanguage();
  const isRTL = language === 'ar' || language === 'ur';

  return (
    <div className="font-sans text-slate-900 bg-pink-50 min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <Navbar onOpenModal={openModal} />
      <Hero />
      <div className="pattern-bg">
        <Content />
        <QASection />
        
        <footer className="bg-transparent text-slate-700 py-12 px-8 border-t border-pink-200">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{t.siteTitle || "Let's Learn and Teach"}</h3>
              <p className="text-sm leading-relaxed">{t.footerAbout}</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{t.contact}</h3>
              <p className="text-sm mb-2">📧 {t.emailLabel}: ymmollar@gmail.com</p>
              <p className="text-sm mb-2">📍 {t.addressLabel}: Vill. Ranigachi, PO. Shank Sahar, PS. Bhangar, Dist. 24 PGS (S), WB. India, PIN-743502</p>
            </div>
          </div>

          <div className="text-center text-sm mt-10 pt-6 border-t border-pink-200">
            <p>&copy; 2026 {t.siteTitle || "Let's Learn and Teach"} | {t.allRightsReserved}</p>
          </div>
        </footer>
      </div>
    </div>
  );
};
