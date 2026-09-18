import React from 'react';
import { Section } from './Section';
import { Card } from './Card';
import { useLanguage } from '../context/LanguageContext';

const RELIGION_CATEGORIES = [
  { icon: '🕉️', key: 'hindu', bg: 'bg-orange-100', text: 'text-orange-600' },
  { icon: '🕌', key: 'muslim', bg: 'bg-blue-100', text: 'text-blue-600' },
  { icon: '✝️', key: 'christian', bg: 'bg-emerald-100', text: 'text-emerald-600' },
  { icon: '🕊️', key: 'other', bg: 'bg-red-100', text: 'text-red-600' }
];

const EDUCATION_CATEGORIES = [
  { title: 'primary', bg: 'bg-yellow-50', border: 'border-yellow-400' },
  { title: 'secondary', bg: 'bg-cyan-50', border: 'border-cyan-400' },
  { title: 'higher', bg: 'bg-violet-50', border: 'border-violet-400' },
  { title: 'tech', bg: 'bg-emerald-50', border: 'border-emerald-400' },
  { title: 'general', bg: 'bg-rose-50', border: 'border-rose-400' },
  { title: 'stories', bg: 'bg-amber-50', border: 'border-amber-400' }
];

export const Content: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      <Section id="religion" title={t.religion} subtitle={t.relSubtitle}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {RELIGION_CATEGORIES.map((item, i) => (
            <Card key={i} className={`text-center ${item.bg}`}>
              <div className={`text-4xl mb-4 p-4 ${item.bg.replace('100', '200')} ${item.text} rounded-2xl inline-block`}>{item.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-pink-900">{t[item.key]}</h3>
              <div className="flex flex-col gap-2 mt-3">
                <button className="text-pink-600 font-semibold text-sm hover:underline">{t.askQuestion}</button>
                <button className="text-pink-600 font-semibold text-sm hover:underline">{t.giveAnswer}</button>
                <div className="mt-2 text-sm text-slate-500">{t.rate}: ⭐⭐⭐⭐⭐</div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="education" title={t.education} subtitle={t.subtitle} className="bg-pink-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EDUCATION_CATEGORIES.map((item, i) => (
            <Card key={i} className={`border-l-4 ${item.border} text-center ${item.bg}`}>
              <h3 className="text-xl font-bold mb-3 text-pink-900">{t[item.title]}</h3>
              <div className="flex flex-col gap-2 mt-3">
                {item.title !== 'stories' && (
                  <>
                    <button className="text-pink-600 font-semibold text-sm hover:underline">{t.askQuestion}</button>
                    <button className="text-pink-600 font-semibold text-sm hover:underline">{t.giveAnswer}</button>
                  </>
                )}
                <div className="mt-2 text-sm text-slate-500">{t.rate}: ⭐⭐⭐⭐⭐</div>
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
};
