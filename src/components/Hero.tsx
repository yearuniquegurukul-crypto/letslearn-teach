import React from 'react';
import { motion } from 'motion/react';
import RotatingEarth from './RotatingEarth';
import { OrbitLabels } from './OrbitLabels';
import { useLanguage } from '../context/LanguageContext';

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const word1 = t.heroWord1 || "Let's";
  const word2 = t.heroWord2 || "Learn";
  const word3 = t.heroWord3 || "and";
  const word4 = t.heroWord4;

  return (
    <section 
      className="relative w-full min-h-[calc(100dvh-65px)] flex flex-col items-center justify-between pt-2 sm:pt-4 pb-4 sm:pb-6 px-2 sm:px-6 lg:px-8 bg-pink-50 text-slate-900 overflow-hidden border-b border-pink-200" 
      id="home"
    >
      {/* Background Natural Scenic Scene - Lush Green Mountains & River Area */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Crisp high-definition landscape with lush green trees, mountains, and pristine river */}
        <img
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=85&w=2560&auto=format&fit=crop"
          alt="Lush Green Tree Covered Mountains and River Landscape"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform scale-100 filter brightness-105 contrast-105 saturate-110"
        />
        {/* Subtle vignette for seamless top/bottom transition keeping nature vibrant and clean */}
        <div className="absolute inset-0 bg-gradient-to-b from-pink-900/15 via-transparent to-pink-950/25"></div>
      </div>
      
      {/* TOP HEADER: "Let's Learn and Teach" + Subtitle "Share knowledge globally and earn" - fully visible on PC, Tablet, & Mobile */}
      <motion.div 
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-30 w-full flex flex-col items-center justify-center shrink-0 mt-1 sm:mt-2 px-2 gap-1.5 sm:gap-2.5 max-w-4xl mx-auto"
      >
        {/* Main Title Pill (Side-by-side colorful words) */}
        <div className="px-4 sm:px-8 md:px-10 py-1.5 sm:py-2.5 md:py-3 rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-md border border-white/95 shadow-xl flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 md:gap-3.5 select-none max-w-[96vw]">
          <span className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 drop-shadow-sm whitespace-nowrap">
            {word1}
          </span>
          <span className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-700 via-purple-600 to-indigo-600 drop-shadow-sm whitespace-nowrap">
            {word2}
          </span>
          <span className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold italic bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 py-0.5 whitespace-nowrap">
            {word3}
          </span>
          {word4 ? (
            <span className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 drop-shadow-sm whitespace-nowrap">
              {word4}
            </span>
          ) : null}
        </div>

        {/* Subtitle Pill: "Share knowledge globally and earn" - 100% visible across all devices */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="px-3.5 sm:px-6 md:px-8 py-1 sm:py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-pink-200 shadow-md flex items-center justify-center gap-1.5 sm:gap-2 text-center max-w-[96vw]"
        >
          <span className="text-sm sm:text-base md:text-lg select-none shrink-0">🌍</span>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg font-black tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-pink-700 via-purple-700 to-indigo-700 text-center">
            {t.heroSubtitle || 'Share knowledge globally and earn'}
          </p>
          <span className="text-sm sm:text-base md:text-lg select-none shrink-0">💰</span>
        </motion.div>
      </motion.div>

      {/* CENTER: Grand Rotating 3D Earth and Orbiting Subject Nodes */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-center my-auto py-2 sm:py-4">
        <div className="relative w-[min(88vw,42vh,340px)] h-[min(88vw,42vh,340px)] sm:w-[min(82vw,48vh,420px)] sm:h-[min(82vw,48vh,420px)] lg:w-[min(52vw,52vh,480px)] lg:h-[min(52vw,52vh,480px)] xl:w-[500px] xl:h-[500px] flex items-center justify-center shrink-0">
          {/* Soft glowing background halo for depth */}
          <div className="absolute inset-0 bg-pink-400/20 blur-[70px] sm:blur-[90px] rounded-full pointer-events-none"></div>
          <RotatingEarth />
          <OrbitLabels />
        </div>
      </div>
    </section>
  );
};
