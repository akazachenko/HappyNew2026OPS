import React, { useEffect, useState } from 'react';

interface Flake {
  id: number;
  left: number;
  size: number;
  opacity: number;
  blur: number;
  fallDuration: number;
  fallDelay: number;
  swayDuration: number;
  swayDelay: number;
}

const Snowfall: React.FC = () => {
  const [snowflakes, setSnowflakes] = useState<Flake[]>([]);

  useEffect(() => {
    // Generate snowflakes on mount
    const count = 100; 
    const flakes: Flake[] = Array.from({ length: count }, (_, i) => {
      const depth = Math.random(); // 0 to 1 for depth simulation
      let size, blur, opacity, speedMultiplier;

      if (depth < 0.3) {
        // Back layer: Small, blurry, slow (far away)
        size = 2 + Math.random() * 2;
        blur = 1 + Math.random();
        opacity = 0.3 + Math.random() * 0.2;
        speedMultiplier = 1.5; 
      } else if (depth < 0.7) {
        // Middle layer
        size = 3 + Math.random() * 3;
        blur = 0.5;
        opacity = 0.5 + Math.random() * 0.3;
        speedMultiplier = 1;
      } else {
        // Front layer: Large, clear, fast (close)
        size = 5 + Math.random() * 4;
        blur = 0;
        opacity = 0.8 + Math.random() * 0.2;
        speedMultiplier = 0.8;
      }

      return {
        id: i,
        left: Math.random() * 100, // Horizontal position %
        size,
        opacity,
        blur,
        // Fall duration between 10s and 25s base, modified by layer
        fallDuration: (10 + Math.random() * 15) * speedMultiplier,
        // Start animation at random point (negative delay) to fill screen immediately
        fallDelay: -Math.random() * 30,
        // Sway duration
        swayDuration: 3 + Math.random() * 4,
        swayDelay: Math.random() * 5,
      };
    });
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute top-[-50px] will-change-transform"
          style={{
            left: `${flake.left}%`,
            opacity: flake.opacity,
            filter: `blur(${flake.blur}px)`,
            zIndex: flake.blur === 0 ? 1 : 0, 
            animation: `fall ${flake.fallDuration}s linear infinite`,
            animationDelay: `${flake.fallDelay}s`,
          }}
        >
          {/* Inner div handles the swaying motion independent of falling */}
          <div
            className="rounded-full bg-white will-change-transform"
            style={{
              width: `${flake.size}px`,
              height: `${flake.size}px`,
              // Soft radial gradient for fluffy look
              background: 'radial-gradient(circle, rgba(255,255,255,1) 30%, rgba(255,255,255,0.4) 100%)',
              boxShadow: `0 0 ${flake.size / 2}px rgba(255, 255, 255, 0.6)`,
              animation: `sway ${flake.swayDuration}s ease-in-out infinite alternate`,
              animationDelay: `${flake.swayDelay}s`,
            }}
          />
        </div>
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(0); }
          100% { transform: translateY(120vh); }
        }
        @keyframes sway {
          0% { transform: translateX(-20px); }
          100% { transform: translateX(20px); }
        }
      `}</style>
    </div>
  );
};

export default Snowfall;