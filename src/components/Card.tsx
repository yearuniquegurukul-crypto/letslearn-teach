import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`bg-white/40 backdrop-blur-md border border-white/50 shadow-lg p-6 rounded-[24px] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.02] hover:border-white/70 ${className}`}>
    {children}
  </div>
);
