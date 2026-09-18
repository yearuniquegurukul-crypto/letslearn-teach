import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`bg-white p-6 rounded-3xl shadow-sm border border-pink-100 transition-all hover:shadow-2xl hover:border-pink-300 ${className}`}>
    {children}
  </div>
);
