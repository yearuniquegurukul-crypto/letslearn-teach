import React from 'react';
import { Section } from './Section';
import { Card } from './Card';
import { useLanguage } from '../context/LanguageContext';

const RELIGION_CATEGORIES = [
  { icon: '🕉️', key: 'hindu', bg: 'bg-orange-500/20', border: 'border-orange-500', text: 'text-orange-950' },
  { icon: '🕌', key: 'muslim', bg: 'bg-blue-500/20', border: 'border-blue-500', text: 'text-blue-950' },
  { icon: '✝️', key: 'christian', bg: 'bg-emerald-500/20', border: 'border-emerald-500', text: 'text-emerald-950' },
  { icon: '🕊️', key: 'other', bg: 'bg-red-500/20', border: 'border-red-500', text: 'text-red-950' }
];

const EDUCATION_CATEGORIES = [
  { title: 'primary', bg: 'bg-gradient-to-br from-amber-100 to-amber-50', border: 'border-amber-200', text: 'text-amber-950' },
  { title: 'secondary', bg: 'bg-gradient-to-br from-sky-100 to-sky-50', border: 'border-sky-200', text: 'text-sky-950' },
  { title: 'higher', bg: 'bg-gradient-to-br from-indigo-100 to-indigo-50', border: 'border-indigo-200', text: 'text-indigo-950' },
  { title: 'tech', bg: 'bg-gradient-to-br from-emerald-100 to-emerald-50', border: 'border-emerald-200', text: 'text-emerald-950' },
  { title: 'general', bg: 'bg-gradient-to-br from-rose-100 to-rose-50', border: 'border-rose-200', text: 'text-rose-950' },
  { title: 'stories', bg: 'bg-gradient-to-br from-orange-100 to-orange-50', border: 'border-orange-200', text: 'text-orange-950' }
];

export const Content: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      <Section id="religion" title={t.religion} subtitle={t.relSubtitle}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {RELIGION_CATEGORIES.map((item, i) => (
            <div key={i} className={`subject-card religion-subject-card text-center ${item.bg} border ${item.border} backdrop-blur-md shadow-lg p-6 rounded-[24px] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.02] hover:border-white/70`}>
              <div className={`text-4xl mb-4 p-4 bg-white/50 rounded-2xl inline-block shadow-inner`}>{item.icon}</div>
              <h2 className="subject-title text-xl font-bold mb-3 text-slate-900">{t[item.key]}</h2>
              <div className="flex flex-col gap-2 mt-3">
                <button className="ask-button bg-white/40 hover:bg-white/60 text-slate-800 font-semibold text-sm py-2 px-4 rounded-xl transition">{t.askQuestion}</button>
                <button className="answer-button bg-white/40 hover:bg-white/60 text-slate-800 font-semibold text-sm py-2 px-4 rounded-xl transition">{t.giveAnswer}</button>
                <div className="rating mt-3 text-xs font-medium text-slate-600 bg-white/30 py-1 px-3 rounded-full inline-block mx-auto">{t.rate}: ⭐⭐⭐⭐⭐</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="education" title={t.education} subtitle={t.subtitle} className="bg-transparent backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EDUCATION_CATEGORIES.map((item, i) => (
            <div key={i} className={`subject-card education-subject-card text-center ${item.bg} border ${item.border} backdrop-blur-md shadow-lg p-6 rounded-[24px] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.02] hover:border-white/70`}>
              <h2 className={`subject-title text-2xl font-extrabold mb-4 ${item.text}`}>{t[item.title]}</h2>
              <div className="flex flex-col gap-2 mt-3">
                {item.title !== 'stories' && (
                  <>
                    <button className="ask-button bg-white/40 hover:bg-white/60 text-slate-800 font-semibold text-sm py-2 px-4 rounded-xl transition">{t.askQuestion}</button>
                    <button className="answer-button bg-white/40 hover:bg-white/60 text-slate-800 font-semibold text-sm py-2 px-4 rounded-xl transition">{t.giveAnswer}</button>
                  </>
                )}
                <div className="rating mt-3 text-xs font-medium text-slate-600 bg-white/30 py-1 px-3 rounded-full inline-block mx-auto">{t.rate}: ⭐⭐⭐⭐⭐</div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
};
