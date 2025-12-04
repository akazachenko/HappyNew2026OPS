import React from 'react';

interface CrystalBallProps {
  isLoading: boolean;
}

const CrystalBall: React.FC<CrystalBallProps> = ({ isLoading }) => {
  return (
    <div className="relative w-48 h-48 mx-auto my-8 perspective-1000">
      {/* Outer Glow */}
      <div className={`absolute inset-0 rounded-full bg-blue-500 blur-3xl opacity-20 transition-all duration-1000 ${isLoading ? 'scale-125 opacity-40' : 'scale-100'}`}></div>
      
      {/* The Ball */}
      <div className={`
        relative w-full h-full rounded-full 
        bg-gradient-to-br from-blue-200/30 via-purple-500/20 to-indigo-900/80
        shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.5),inset_10px_10px_20px_rgba(255,255,255,0.4)]
        backdrop-blur-sm border border-white/20
        flex items-center justify-center
        overflow-hidden
        transition-all duration-1000
        ${isLoading ? 'animate-pulse shadow-[0_0_50px_rgba(147,197,253,0.6)]' : 'animate-float'}
      `}>
        
        {/* Swirling mist inside (only visible when loading) */}
        {isLoading && (
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[spin_3s_linear_infinite] opacity-50 blur-xl origin-center transform scale-150"></div>
          </div>
        )}

        {/* Reflection */}
        <div className="absolute top-4 left-8 w-8 h-4 bg-white/40 blur-md rounded-[50%] rotate-[-45deg]"></div>
        
        {/* Center content */}
        <div className="z-10 text-6xl">
          {isLoading ? '🔮' : '✨'}
        </div>
      </div>
      
      {/* Base */}
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-black/40 blur-lg rounded-[50%]"></div>
    </div>
  );
};

export default CrystalBall;