import React, { useState, useRef, useCallback } from 'react';
import { generateNewYearPrediction } from './services/geminiService';
import Snowfall from './components/Snowfall';
import CrystalBall from './components/CrystalBall';
import { LoadingState, PredictionResponse } from './types';
import { Star, Wand2, RefreshCw, Moon } from 'lucide-react';

const App: React.FC = () => {
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const isProcessing = useRef(false);

  const handlePredict = useCallback(async (e?: React.MouseEvent | React.KeyboardEvent) => {
    // Prevent default browser behavior and stop propagation
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Strict check: only allow prediction if IDLE and not currently processing
    if (status !== LoadingState.IDLE || isProcessing.current) return;
    
    isProcessing.current = true;
    setStatus(LoadingState.LOADING);
    setResult(null);

    try {
      const data = await generateNewYearPrediction();
      setResult(data);
      setStatus(LoadingState.SUCCESS);
    } catch (error) {
      console.error(error);
      setStatus(LoadingState.ERROR);
    } finally {
      isProcessing.current = false;
    }
  }, [status]);

  const reset = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setStatus(LoadingState.IDLE);
    setResult(null);
  }, []);

  const getThemeIcon = (theme: string) => {
    switch(theme) {
      case 'wealth': return '💰';
      case 'travel': return '✈️';
      case 'love': return '❤️';
      case 'wisdom': return '🧠';
      case 'success': return '🏆';
      default: return '✨';
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#1a1c2e] to-black text-white selection:bg-amber-500/30">
      <Snowfall />

      <main className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
        
        {/* Header */}
        <header className="text-center mb-8 animate-float">
          <div className="flex justify-center items-center gap-3 mb-4 text-amber-300">
            <Star className="w-5 h-5 animate-pulse" />
            <span className="text-xs font-bold tracking-[0.4em] uppercase opacity-80 font-sans">Новогодний Оракул</span>
            <Star className="w-5 h-5 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-7xl font-normal bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(251,191,36,0.3)] leading-tight magic-font">
            Предсказания <br className="md:hidden" /> на 2026 год
          </h1>
          <p className="mt-6 text-slate-300 max-w-lg mx-auto text-lg font-light leading-relaxed">
            Загляни в будущее! Узнай, что готовят звезды в грядущем году.
          </p>
        </header>

        {/* Main Content Area */}
        <div className="w-full max-w-xl">
          
          {/* Stack Container using CSS Grid to overlay elements */}
          <div className="grid grid-cols-1 grid-rows-1 place-items-center min-h-[400px]">
            
            {/* Layer 1: Crystal Ball (Background) */}
            <div className={`col-start-1 row-start-1 transition-all duration-1000 ease-in-out ${
              status === LoadingState.SUCCESS ? 'opacity-0 scale-75 blur-md pointer-events-none' : 'opacity-100 scale-100'
            }`}>
              <CrystalBall 
                isLoading={status === LoadingState.LOADING} 
                onClick={status === LoadingState.IDLE ? handlePredict : undefined}
              />
            </div>

            {/* Layer 2: Result Card (Foreground - appears on success) */}
            {status === LoadingState.SUCCESS && result && (
              <div className="col-start-1 row-start-1 z-20 w-full animate-pop-in">
                <div className="glass-panel p-1 rounded-2xl shadow-[0_0_50px_rgba(251,191,36,0.2)] transform transition-all hover:scale-[1.02]">
                  <div className="bg-slate-900/95 rounded-xl p-8 text-center border border-amber-500/20 backdrop-blur-xl relative overflow-hidden">
                    {/* Decorative background glow behind text */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-amber-500/10 blur-[50px] rounded-full pointer-events-none"></div>

                    <div className="relative z-10">
                      <div className="inline-block p-4 rounded-full bg-amber-500/10 mb-6 border border-amber-500/30 text-4xl shadow-inner animate-[pulse_3s_infinite]">
                        {getThemeIcon(result.theme)}
                      </div>
                      
                      <p className="text-xl md:text-2xl leading-relaxed text-slate-100 mb-8 magic-font drop-shadow-md">
                        "{result.prediction}"
                      </p>

                      <button 
                        onClick={reset}
                        className="group text-sm text-amber-400/80 hover:text-amber-300 flex items-center justify-center gap-2 mx-auto transition-colors font-medium tracking-wide uppercase font-sans cursor-pointer py-2 px-4 rounded-full hover:bg-amber-500/10"
                      >
                        <RefreshCw className="w-4 h-4 transition-transform group-hover:rotate-180" />
                        Погадать еще раз
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Layer 3: Error Message (Foreground) */}
            {status === LoadingState.ERROR && (
               <div className="col-start-1 row-start-1 z-20 w-full glass-panel p-8 rounded-2xl text-center border-red-500/30 animate-pop-in">
                  <Moon className="w-12 h-12 text-red-400 mx-auto mb-4 opacity-80" />
                  <h3 className="text-2xl font-normal text-red-200 mb-2 magic-font">Магическая помеха</h3>
                  <p className="text-slate-300 mb-6">Звезды сейчас не в духе. Попробуйте чуть позже.</p>
                  <button 
                    onClick={() => setStatus(LoadingState.IDLE)}
                    className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg transition-colors font-medium"
                  >
                    Вернуться
                  </button>
               </div>
            )}
          </div>

          {/* Helper Texts (Below the stack) */}
          
          {/* Idle Instruction */}
          {status === LoadingState.IDLE && (
            <div className="text-center -mt-8 transition-all duration-500 relative z-10">
              <p 
                className="text-xl text-amber-100 font-normal leading-relaxed magic-font animate-pulse cursor-pointer hover:text-amber-200 select-none"
                onClick={handlePredict}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handlePredict(e);
                }}
              >
                Коснитесь магического шара...
              </p>
              <p className="text-sm text-slate-400 font-sans mt-2 opacity-60">
                ...чтобы узнать свою судьбу
              </p>
            </div>
          )}

          {/* Loading Text */}
          {status === LoadingState.LOADING && (
            <div className="text-center -mt-8 space-y-4 relative z-10">
              <p className="text-2xl text-amber-200 magic-font animate-pulse">Связываемся с космосом...</p>
              <p className="text-sm text-slate-400 font-sans">Калибруем магические потоки на 2026 год</p>
            </div>
          )}

        </div>

        {/* Footer */}
        <footer className="mt-20 text-center text-slate-500 text-sm">
          <p className="text-amber-400/90 text-lg mb-4 magic-font animate-pulse drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">
            От DAC Team для Operations с любовью ❤️
          </p>
          <p className="flex items-center justify-center gap-2 opacity-50 font-sans text-xs uppercase tracking-widest">
            <Wand2 className="w-3 h-3" /> 
            Создано с помощью магии Gemini
          </p>
        </footer>

      </main>
    </div>
  );
};

export default App;