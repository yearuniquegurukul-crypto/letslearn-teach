import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export const OrbitLabels: React.FC = () => {
  const { t } = useLanguage();

  const labels = [
    { name: t.hindu || 'হিন্দু ধর্ম', angle: 0 },
    { name: t.muslim || 'ইসলাম ধর্ম', angle: 45 },
    { name: t.christian || 'খ্রিস্ট ধর্ম', angle: 90 },
    { name: t.primary || 'ইতিহাস', angle: 135 },
    { name: t.secondary || 'ভূগোল', angle: 180 },
    { name: t.higher || 'গণিত', angle: 225 },
    { name: t.tech || 'বিজ্ঞান', angle: 270 },
    { name: t.stories || 'মজার গল্প', angle: 315 },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-30">
      <motion.div
        className="w-[84%] h-[84%] sm:w-[86%] sm:h-[86%] rounded-full border border-pink-300/80 relative"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 42, ease: "linear" }}
      >
        {labels.map((label, i) => {
          const rad = (label.angle * Math.PI) / 180;
          const x = 50 + 50 * Math.cos(rad);
          const y = 50 + 50 * Math.sin(rad);

          return (
            <div
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 42, ease: "linear" }}
                className="bg-white/98 backdrop-blur-md border-2 border-pink-300 text-pink-950 px-2 sm:px-3.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs md:text-sm font-black whitespace-nowrap shadow-xl pointer-events-auto hover:scale-110 hover:border-pink-500 transition-all cursor-pointer drop-shadow-md"
              >
                {label.name}
              </motion.div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};
