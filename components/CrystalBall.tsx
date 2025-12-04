import React from 'react';

interface CrystalBallProps {
  isLoading: boolean;
  onClick?: (e?: React.MouseEvent | React.KeyboardEvent) => void;
}

const CrystalBall: React.FC<CrystalBallProps> = ({ isLoading, onClick }) => {
  const isInteractive = !!onClick && !isLoading;

  const handleInteraction = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (isInteractive && onClick) {
      e.stopPropagation();
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <div 
      className={`relative w-72 h-72 mx-auto my-12 ${isInteractive ? 'cursor-pointer group' : ''}`}
      onClick={isInteractive ? handleInteraction : undefined}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onKeyDown={(e) => {
        if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
          handleInteraction(e);
        }
      }}
    >
      {/* 1. Ground Shadow (Perspective anchor) - Lighter color */}
      <div className={`
        absolute -bottom-8 left-1/2 transform -translate-x-1/2 
        w-48 h-10 bg-indigo-950/40 blur-xl rounded-[100%] 
        transition-all duration-1000
        ${isLoading 
          ? 'scale-50 opacity-20' 
          : 'animate-[pulse_6s_ease-in-out_infinite] group-hover:scale-90 group-hover:opacity-50'
        }
      `}></div>

      {/* 2. Outer Aura (Magical Glow) */}
      <div className={`
        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-[130%] h-[130%] rounded-full
        bg-[radial-gradient(circle,_rgba(139,92,246,0.3)_0%,_rgba(59,130,246,0.1)_50%,_transparent_70%)]
        blur-2xl
        transition-all duration-1000 pointer-events-none
        ${isLoading ? 'opacity-100 scale-110 animate-pulse-glow' : 'opacity-40 group-hover:opacity-80 group-hover:scale-105'}
      `}></div>

       {/* 2.1 Secondary Golden Glow */}
       <div className={`
        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-[150%] h-[150%] rounded-full
        bg-[radial-gradient(circle,_rgba(251,191,36,0.1)_0%,_transparent_60%)]
        blur-3xl
        transition-all duration-700 pointer-events-none mix-blend-screen
        ${isLoading ? 'opacity-50 scale-125' : 'opacity-0 group-hover:opacity-40'}
      `}></div>

      {/* 3. THE BALL CONTAINER */}
      <div className={`
        relative w-full h-full rounded-full 
        flex items-center justify-center
        transition-all duration-1000 ease-in-out
        ${isLoading ? 'scale-105' : 'animate-float group-hover:scale-[1.02]'}
        /* Replaced dark shadow with colored glow */
        shadow-[0_0_30px_rgba(167,139,250,0.1)]
        ${isInteractive ? 'group-hover:shadow-[0_0_50px_rgba(167,139,250,0.3)]' : ''}
        /* Very subtle light border */
        border border-white/20
      `}>
        
        {/* A. Back Glass Layer - Much more transparent and colored */}
        <div className="absolute inset-0 rounded-full bg-slate-900/40 overflow-hidden shadow-[inset_0_0_40px_rgba(76,29,149,0.3)]">
          {/* Gradient fades to transparent at edges to remove dark ring */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(46,16,101,0.8)_0%,_rgba(30,27,75,0.4)_60%,_transparent_100%)]"></div>
        </div>

        {/* B. Internal Volumetric Fog */}
        <div className="absolute inset-1 rounded-full overflow-hidden mask-image-circle">
            {/* Layer 1: Nebula */}
            <div className={`
                absolute -top-[50%] -left-[50%] w-[200%] h-[200%]
                bg-[conic-gradient(from_0deg,_transparent_0%,_rgba(168,85,247,0.3)_25%,_transparent_50%,_rgba(79,70,229,0.3)_75%,_transparent_100%)]
                blur-2xl mix-blend-screen
                transition-all duration-1000
                ${isLoading ? 'animate-[spin_2s_linear_infinite] opacity-100' : 'animate-[spin_15s_linear_infinite] opacity-60'}
            `}></div>

            {/* Layer 2: Mist */}
            <div className={`
                absolute -top-[50%] -left-[50%] w-[200%] h-[200%]
                bg-[radial-gradient(ellipse_at_center,_rgba(34,211,238,0.2)_0%,_transparent_60%)]
                blur-xl mix-blend-plus-lighter
                transition-all duration-1000
                ${isLoading ? 'animate-[spin_3s_linear_infinite_reverse] scale-110' : 'animate-[spin_20s_linear_infinite_reverse] scale-100 opacity-40'}
            `}></div>
            
            {/* Layer 3: Hotspot */}
            <div className={`
                absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                w-24 h-24 rounded-full
                bg-[radial-gradient(circle,_rgba(251,191,36,0.8)_0%,_rgba(245,158,11,0)_70%)]
                blur-xl mix-blend-screen transition-all duration-500
                ${isLoading ? 'scale-150 opacity-100 animate-pulse' : 'scale-75 opacity-20 animate-inner-glow'}
            `}></div>
        </div>

        {/* C. Front Glass Shell - Refined highlights, no dark insets */}
        <div className="absolute inset-0 rounded-full z-20 pointer-events-none">
            {/* 1. Inner Shadow - replaced black with deep purple/blue to remove "muddy" edge */}
            <div className="absolute inset-0 rounded-full shadow-[inset_-10px_-10px_40px_rgba(30,27,75,0.4),inset_5px_5px_20px_rgba(255,255,255,0.2)]"></div>
            
            {/* 2. Top-Left Highlight */}
            <div className="absolute top-8 left-10 w-24 h-12 bg-gradient-to-b from-white to-transparent opacity-40 blur-sm rounded-[100%] rotate-[-45deg]"></div>
            <div className="absolute top-10 left-12 w-12 h-6 bg-white opacity-70 blur-[2px] rounded-[100%] rotate-[-45deg]"></div>

            {/* 3. Bottom-Right Rim Light - Brighter blue for glass effect */}
            <div className="absolute bottom-6 right-8 w-32 h-32 bg-[radial-gradient(circle_at_bottom_right,_rgba(147,197,253,0.3),_transparent_70%)] blur-md rounded-full"></div>
            
            {/* 4. Surface Gloss */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-40"></div>
            
            {/* 5. Rim highlight - made slightly stronger/sharper to define edge without darkness */}
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_3px_rgba(255,255,255,0.3)]"></div>
        </div>

        {/* D. Center Icon/Content */}
        <div className="relative z-10 mix-blend-overlay">
           <div className={`transition-all duration-700 transform ${isLoading ? 'scale-0 opacity-0' : 'scale-100 opacity-80 group-hover:scale-110 group-hover:opacity-100'}`}>
              <span className="text-7xl filter drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] group-hover:drop-shadow-[0_0_35px_rgba(255,255,255,1)] group-hover:brightness-150 transition-all duration-500 block">✨</span>
           </div>
           <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 transform ${isLoading ? 'scale-110 opacity-100' : 'scale-0 opacity-0'}`}>
              <span className="text-7xl">🔮</span>
           </div>
        </div>

      </div>
    </div>
  );
};

export default CrystalBall;