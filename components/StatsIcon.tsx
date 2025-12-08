import React, { useState } from 'react';
import { BarChart2 } from 'lucide-react';
import { getTotalWishes } from '../services/statsService';

const StatsIcon: React.FC = () => {
  const [count, setCount] = useState<number | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleMouseEnter = async () => {
    setShowTooltip(true);
    // Only fetch if we haven't fetched recently or to ensure freshness
    setLoading(true);
    const total = await getTotalWishes();
    setCount(total);
    setLoading(false);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className="fixed right-4 z-50 bottom-4 md:top-4 md:bottom-auto">
      <div 
        className="relative group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={showTooltip ? handleMouseLeave : handleMouseEnter}
      >
        <button 
          className="p-3 bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-full text-slate-400 hover:text-amber-300 hover:bg-slate-800/60 hover:border-amber-500/30 transition-all duration-300 shadow-lg group-hover:shadow-[0_0_15px_rgba(251,191,36,0.2)]"
          aria-label="Статистика"
        >
          <BarChart2 className="w-5 h-5" />
        </button>
        
        <div className={`
          absolute right-0 w-48 transition-all duration-300 transform 
          
          /* Mobile: Tooltip opens UPWARDS */
          bottom-full mb-3 origin-bottom-right
          
          /* Desktop: Tooltip opens DOWNWARDS */
          md:bottom-auto md:mb-0 md:top-full md:mt-3 md:origin-top-right

          ${showTooltip 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-2 md:-translate-y-2 pointer-events-none'
          }
        `}>
          <div className="bg-slate-900/95 backdrop-blur-xl border border-amber-500/20 rounded-xl p-4 shadow-2xl text-center relative overflow-hidden">
             {/* Decorative shine */}
             <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 to-transparent pointer-events-none"></div>
             
            <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-2 font-sans">Получено предсказаний</p>
            
            {loading && count === null ? (
              <div className="h-8 w-20 mx-auto bg-slate-800/50 rounded animate-pulse"></div>
            ) : (
              <p className="text-3xl font-normal text-amber-300 magic-font drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]">
                {count !== null ? count.toLocaleString() : '---'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsIcon;