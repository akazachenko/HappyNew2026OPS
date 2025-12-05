import React from 'react';
import { RefreshCw } from 'lucide-react';
import { PredictionResponse } from '../types';

interface PredictionResultProps {
  result: PredictionResponse;
  onReset: (e: React.MouseEvent) => void;
}

export const PredictionResult: React.FC<PredictionResultProps> = ({ result, onReset }) => {
  const getThemeIcon = (theme: string) => {
    switch(theme) {
      case 'wealth': return '💰';
      case 'travel': return '✈️';
      case 'love': return '❤️';
      case 'wisdom': return '🧠';
      case 'success': return '🏆';
      case 'slot_machine': return '🎰';
      default: return '✨';
    }
  };

  return (
    <div className="col-start-1 row-start-1 z-20 w-full animate-pop-in">
      <div className="glass-panel p-1 rounded-2xl shadow-[0_0_50px_rgba(251,191,36,0.2)] transform transition-all hover:scale-[1.02]">
        <div className="bg-slate-900/95 rounded-xl p-8 text-center border border-amber-500/20 backdrop-blur-xl relative overflow-hidden">
          {/* Decorative background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-amber-500/10 blur-[50px] rounded-full pointer-events-none"></div>

          <div className="relative z-10">
            <div className="inline-block p-4 rounded-full bg-amber-500/10 mb-6 border border-amber-500/30 text-4xl shadow-inner animate-[pulse_3s_infinite]">
              {getThemeIcon(result.theme)}
            </div>
            
            <p className="text-xl md:text-2xl leading-relaxed text-slate-100 mb-8 magic-font drop-shadow-md">
              {result.prediction}
            </p>

            <button 
              onClick={onReset}
              className="group text-sm text-amber-400/80 hover:text-amber-300 flex items-center justify-center gap-2 mx-auto transition-colors font-medium tracking-wide uppercase font-sans cursor-pointer py-2 px-4 rounded-full hover:bg-amber-500/10"
            >
              <RefreshCw className="w-4 h-4 transition-transform group-hover:rotate-180" />
              Погадать еще раз
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};