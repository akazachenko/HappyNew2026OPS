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
    <div className="fixed top-4 right-4 z-50">
      <div 
        className="relative group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button 
          className="p-3 bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-full text-slate-400 hover:text-amber-300 hover:bg-slate-800/60 hover:border-amber-500/30 transition-all duration-300 shadow-lg group-hover:shadow-[0_0_15px_rgba(251,191,36,0.2)]"
          aria-label="Статистика"
        >
          <BarChart2 className="w-5 h-5" />
        </button>
        
        <div className={`absolute top-full right-0 mt-3 transition-all duration-300 transform origin-top-right ${showTooltip ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
          <div className="bg-slate-900/95 backdrop-blur-xl border border-amber-500/20 rounded-xl p-4 shadow-2xl w-48 text-center relative overflow-hidden">
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