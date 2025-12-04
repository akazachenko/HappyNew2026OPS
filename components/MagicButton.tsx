import React from 'react';
import { Sparkles } from 'lucide-react';

interface MagicButtonProps {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}

const MagicButton: React.FC<MagicButtonProps> = ({ onClick, disabled, children }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative group px-8 py-4 rounded-full font-bold text-lg transition-all duration-300
        ${disabled 
          ? 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-50' 
          : 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:shadow-[0_0_40px_rgba(245,158,11,0.7)] hover:scale-105'
        }
      `}
    >
      <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      <span className="flex items-center justify-center gap-2 magic-font tracking-wide">
        <Sparkles className={`w-5 h-5 ${!disabled && 'animate-pulse'}`} />
        {children}
        <Sparkles className={`w-5 h-5 ${!disabled && 'animate-pulse'}`} />
      </span>
    </button>
  );
};

export default MagicButton;