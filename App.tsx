import React, { useState } from 'react';
import { generateNewYearPrediction } from './services/geminiService';
import Snowfall from './components/Snowfall';
import MagicButton from './components/MagicButton';
import CrystalBall from './components/CrystalBall';
import { LoadingState, PredictionResponse } from './types';
import { Star, Wand2, RefreshCw, Moon } from 'lucide-react';

const App: React.FC = () => {
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [result, setResult] = useState<PredictionResponse | null>(null);

  const handlePredict = async () => {
    setStatus(LoadingState.LOADING);
    setResult(null);

    try {
      const data = await generateNewYearPrediction();
      setResult(data);
      setStatus(LoadingState.SUCCESS);
    } catch (error) {
      console.error(error);
      setStatus(LoadingState.ERROR);
    }
  };

  const reset = () => {
    setStatus(LoadingState.IDLE);
    setResult(null);
  };

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
          <div className="flex justify-center items-center gap-3 mb-2 text-amber-300">
            <Star className="w-6 h-6 animate-pulse" />
            <span className="text-sm tracking-[0.3em] uppercase opacity-80">Новогодний Оракул</span>
            <Star className="w-6 h-6 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]">
            Предсказание 2026
          </h1>
          <p className="mt-4 text-slate-300 max-w-md mx-auto">
            Загляни в будущее! Узнай, что готовят звезды в грядущем году.
          </p>
        </header>

        {/* Main Content Area */}
        <div className="w-full max-w-lg">
          
          <CrystalBall isLoading={status === LoadingState.LOADING} />

          {/* Idle State - Button Only */}
          {status === LoadingState.IDLE && (
            <div className="glass-panel p-8 rounded-2xl shadow-2xl text-center transition-all duration-500 transform hover:scale-[1.01]">
              <p className="text-lg text-amber-100 mb-8 font-light leading-relaxed">
                Магический шар заряжен энергией праздника. <br/>
                Нажми кнопку, чтобы получить свое персональное пророчество!
              </p>
              
              <div className="flex justify-center">
                <MagicButton 
                  onClick={handlePredict} 
                  disabled={false}
                >
                  Узнать Судьбу
                </MagicButton>
              </div>
            </div>
          )}

          {/* Loading State - Text */}
          {status === LoadingState.LOADING && (
            <div className="text-center mt-8 space-y-3">
              <p className="text-xl text-amber-200 magic-font animate-pulse">Связываемся с космосом...</p>
              <p className="text-sm text-slate-400">Калибруем магические потоки на 2026 год</p>
            </div>
          )}

          {/* Result State */}
          {status === LoadingState.SUCCESS && result && (
            <div className="glass-panel p-1 rounded-2xl shadow-[0_0_50px_rgba(251,191,36,0.2)] animate-[sparkle_0.5s_ease-out]">
              <div className="bg-slate-900/80 rounded-xl p-8 text-center border border-amber-500/20">
                <div className="inline-block p-4 rounded-full bg-amber-500/10 mb-6 border border-amber-500/30 text-4xl">
                  {getThemeIcon(result.theme)}
                </div>
                
                <h3 className="text-2xl font-bold text-amber-100 mb-4 magic-font">
                  В 2026 году тебя ждет...
                </h3>
                
                <p className="text-lg leading-relaxed text-slate-200 italic mb-8">
                  "{result.prediction}"
                </p>

                <button 
                  onClick={reset}
                  className="text-sm text-amber-400/80 hover:text-amber-300 flex items-center justify-center gap-2 mx-auto transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Погадать еще раз
                </button>
              </div>
            </div>
          )}

          {/* Error State */}
          {status === LoadingState.ERROR && (
            <div className="glass-panel p-8 rounded-2xl text-center border-red-500/30">
              <Moon className="w-12 h-12 text-red-400 mx-auto mb-4 opacity-80" />
              <h3 className="text-xl font-bold text-red-200 mb-2">Магическая помеха</h3>
              <p className="text-slate-300 mb-6">Звезды сейчас не в духе. Попробуйте чуть позже.</p>
              <button 
                onClick={() => setStatus(LoadingState.IDLE)}
                className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Вернуться
              </button>
            </div>
          )}

        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-slate-500 text-sm">
          <p className="flex items-center justify-center gap-2">
            <Wand2 className="w-4 h-4" /> 
            Создано с помощью магии Gemini
          </p>
        </footer>

      </main>
    </div>
  );
};

export default App;