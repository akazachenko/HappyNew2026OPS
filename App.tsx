import React, { useState, useRef, useCallback } from 'react';
import { generateNewYearPrediction } from './services/geminiService';
import Snowfall from './components/Snowfall';
import CrystalBall from './components/CrystalBall';
import { PredictionResult } from './components/PredictionResult';
import { LoadingState, PredictionResponse } from './types';
import { Star, Wand2, Moon } from 'lucide-react';

// --- Sub-components for cleaner layout ---

const Header: React.FC = () => (
  <header className="text-center mb-8 animate-float">
    <div className="flex justify-center items-center gap-3 mb-4 text-amber-300">
      <Star className="w-5 h-5 animate-pulse" />
      <span className="text-xs font-bold tracking-[0.4em] uppercase opacity-80 font-sans">Новогодний Agile-оракул</span>
      <Star className="w-5 h-5 animate-pulse" />
    </div>
    <h1 className="text-4xl md:text-7xl font-normal bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(251,191,36,0.3)] leading-tight magic-font">
      Предсказания <br className="md:hidden" /> на 2026 год
    </h1>
  </header>
);

const Footer: React.FC = () => (
  <footer className="mt-20 text-center text-slate-500 text-sm">
    <p className="text-amber-400/90 text-lg mb-4 magic-font animate-pulse drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">
      От DAC Team с любовью ❤️
    </p>
    <p className="flex items-center justify-center gap-2 opacity-50 font-sans text-xs uppercase tracking-widest">
      <Wand2 className="w-3 h-3" /> 
      Создано с помощью магии Gemini
    </p>
  </footer>
);

const ErrorMessage: React.FC<{ onRetry: () => void }> = ({ onRetry }) => (
  <div className="col-start-1 row-start-1 z-20 w-full glass-panel p-8 rounded-2xl text-center border-red-500/30 animate-pop-in">
    <Moon className="w-12 h-12 text-red-400 mx-auto mb-4 opacity-80" />
    <h3 className="text-2xl font-normal text-red-200 mb-2 magic-font">Магическая помеха</h3>
    <p className="text-slate-300 mb-6">Звезды сейчас не в духе. Попробуйте чуть позже.</p>
    <button 
      onClick={onRetry}
      className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg transition-colors font-medium"
    >
      Вернуться
    </button>
  </div>
);

// --- Main App Component ---

const App: React.FC = () => {
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const isProcessing = useRef(false);

  const handlePredict = useCallback(async (e?: React.MouseEvent | React.KeyboardEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

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

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#1a1c2e] to-black text-white selection:bg-amber-500/30">
      <Snowfall />

      <main className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
        
        <Header />

        <div className="w-full max-w-xl">
          {/* Interactive Area */}
          <div className="grid grid-cols-1 grid-rows-1 place-items-center min-h-[400px]">
            
            {/* Background Layer: Crystal Ball */}
            <div className={`col-start-1 row-start-1 transition-all duration-1000 ease-in-out ${
              status === LoadingState.SUCCESS ? 'opacity-0 scale-75 blur-md pointer-events-none' : 'opacity-100 scale-100'
            }`}>
              <CrystalBall 
                isLoading={status === LoadingState.LOADING} 
                onClick={status === LoadingState.IDLE ? handlePredict : undefined}
              />
            </div>

            {/* Foreground Layer: Result or Error */}
            {status === LoadingState.SUCCESS && result && (
              <PredictionResult result={result} onReset={reset} />
            )}

            {status === LoadingState.ERROR && (
               <ErrorMessage onRetry={() => setStatus(LoadingState.IDLE)} />
            )}
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default App;