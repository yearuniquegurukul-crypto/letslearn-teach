import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface ModalsProps {
  modalType: 'login' | 'signup' | 'help' | null;
  closeModal: () => void;
}

export const Modals: React.FC<ModalsProps> = ({ modalType, closeModal }) => {
  const { t } = useLanguage();
  if (!modalType) return null;

  if (modalType === 'help') {
    return (
      <div className="fixed inset-0 bg-black/60 z-[2000] flex justify-center items-center p-4" onClick={closeModal}>
        <div className="bg-white p-6 sm:p-8 rounded-2xl w-[520px] max-w-full relative shadow-2xl border border-pink-100 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
          <button 
            className="absolute right-4 top-4 text-2xl text-slate-400 hover:text-slate-900 w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors"
            onClick={closeModal}
            aria-label="Close"
          >
            ×
          </button>
          
          <div className="flex items-center gap-2.5 mb-4">
            <span className="text-2xl">💡</span>
            <h2 className="text-2xl font-bold text-pink-900">{t.helpTitle || 'সাহায্য ও নির্দেশিকা'}</h2>
          </div>

          <div className="space-y-4 text-slate-700 text-sm sm:text-base">
            <div className="bg-pink-50/70 p-4 rounded-xl border border-pink-200">
              <h3 className="font-bold text-pink-900 mb-1 flex items-center gap-1.5">
                <span>❓</span> {t.helpFaq1Q || 'কীভাবে প্রশ্ন করবেন?'}
              </h3>
              <p className="text-slate-600 text-sm">
                {t.helpFaq1A || 'যেকোনো বিষয়ের বক্সে গিয়ে "প্রশ্ন করুন" বাটনে ক্লিক করে আপনার জিজ্ঞাসা পোস্ট করতে পারেন।'}
              </p>
            </div>

            <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200">
              <h3 className="font-bold text-emerald-900 mb-1 flex items-center gap-1.5">
                <span>💰</span> {t.helpFaq2Q || 'কীভাবে জ্ঞান দিয়ে আয় করবেন?'}
              </h3>
              <p className="text-slate-600 text-sm">
                {t.helpFaq2A || 'অন্যদের প্রশ্নের সঠিক উত্তর দিন এবং মূল্যবান জ্ঞানের মাধ্যমে পয়েন্ট ও আয় অর্জন করুন।'}
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-600">
              <p className="font-semibold text-slate-800 mb-1">{t.supportDirect || '📬 সরাসরি সাপোর্ট:'}</p>
              <p>{t.helpSupport || 'প্রয়োজনে আমাদের সাথে সরাসরি যোগাযোগ করুন: support@learnandteach.org'}</p>
            </div>
          </div>

          <div className="mt-6">
            <button 
              onClick={closeModal}
              className="w-full py-3 rounded-xl bg-pink-600 text-white font-bold hover:bg-pink-700 transition-colors shadow-sm"
            >
              {t.close || 'বন্ধ করুন'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-[2000] flex justify-center items-center" onClick={closeModal}>
      <div className="bg-white p-9 rounded-2xl w-[400px] max-w-[90%] relative shadow-xl" onClick={e => e.stopPropagation()}>
        <span className="absolute right-5 top-4 cursor-pointer text-2xl text-slate-400 hover:text-slate-900" onClick={closeModal}>×</span>
        <h2 className="text-2xl font-bold text-pink-900">{modalType === 'login' ? t.loginTitle : t.signupTitle}</h2>
        <br />
        <input type="email" placeholder={t.email} className="w-full p-4 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none" />
        <br /><br />
        {modalType === 'signup' && (
          <>
            <input type="text" placeholder={t.yourName} className="w-full p-4 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none" />
            <br /><br />
          </>
        )}
        <input type="password" placeholder={t.password} className="w-full p-4 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none" />
        <br /><br />
        <button className="w-full p-4 rounded-xl bg-pink-600 text-white font-bold hover:bg-pink-700">
          {modalType === 'login' ? t.loginTitle.replace('🔐 ', '') : t.accountCreate}
        </button>
      </div>
    </div>
  );
};
