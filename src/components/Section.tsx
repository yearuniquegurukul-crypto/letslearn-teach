import React from 'react';

interface SectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ id, title, subtitle, children, className = "" }) => (
  <section id={id} className={`py-20 px-8 ${className}`}>
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-pink-900 tracking-tight">{title}</h2>
        {subtitle && <p className="mt-4 text-lg text-slate-700 max-w-2xl mx-auto">{subtitle}</p>}
      </div>
      {children}
    </div>
  </section>
);
