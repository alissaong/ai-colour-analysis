import React from 'react';
import { TabType } from '../types';

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  hasCompletedAnalysis?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  hasCompletedAnalysis = false,
}) => {
  const showResultsTab = hasCompletedAnalysis || activeTab === 'results';

  return (
    <>
      {/* Top Header for Desktop */}
      <header className="hidden md:flex justify-between items-center w-full max-w-[1200px] mx-auto px-6 py-4 bg-[#f9f9ff]/80 backdrop-blur-md sticky top-0 z-50 border-b border-[#e7eeff]">
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-full bg-[#7c3aed] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              flare
            </span>
          </div>
          <div>
            <span className="font-bold text-lg text-[#111c2d] tracking-tight group-hover:text-[#630ed4] transition-colors">
              HueAI
            </span>
          </div>
        </div>

        <nav className="flex items-center gap-1 bg-[#f0f3ff] p-1.5 rounded-full border border-[#d8e3fb]">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-5 py-2 rounded-full font-bold text-sm transition-all duration-200 flex items-center gap-2 ${
              activeTab === 'home'
                ? 'bg-[#7c3aed] text-white shadow-sm'
                : 'text-[#4a4455] hover:text-[#630ed4] hover:bg-white/60'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">home</span>
            Home
          </button>

          <button
            onClick={() => setActiveTab('aitool')}
            className={`px-5 py-2 rounded-full font-bold text-sm transition-all duration-200 flex items-center gap-2 ${
              activeTab === 'aitool'
                ? 'bg-[#7c3aed] text-white shadow-sm'
                : 'text-[#4a4455] hover:text-[#630ed4] hover:bg-white/60'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">flare</span>
            AI Tool
          </button>

          {showResultsTab && (
            <button
              onClick={() => setActiveTab('results')}
              className={`px-5 py-2 rounded-full font-bold text-sm transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'results'
                  ? 'bg-[#7c3aed] text-white shadow-sm'
                  : 'text-[#4a4455] hover:text-[#630ed4] hover:bg-white/60'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">palette</span>
              Results
            </button>
          )}
        </nav>
      </header>

      {/* Fixed Bottom Navigation Bar for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-2 backdrop-blur-xl bg-[#f9f9ff]/85 border-t border-[#d8e3fb] shadow-[0_-10px_25px_-5px_rgba(30,41,59,0.06)] rounded-t-2xl">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center px-4 py-1.5 transition-all duration-200 rounded-full ${
            activeTab === 'home'
              ? 'bg-[#7c3aed] text-white px-5 py-1.5 shadow-md scale-105'
              : 'text-[#4a4455] hover:text-[#630ed4]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: activeTab === 'home' ? "'FILL' 1" : "'FILL' 0" }}>
            home
          </span>
          <span className="text-[11px] font-bold mt-0.5">Home</span>
        </button>

        <button
          onClick={() => setActiveTab('aitool')}
          className={`flex flex-col items-center justify-center px-4 py-1.5 transition-all duration-200 rounded-full ${
            activeTab === 'aitool'
              ? 'bg-[#7c3aed] text-white px-5 py-1.5 shadow-md scale-105'
              : 'text-[#4a4455] hover:text-[#630ed4]'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: activeTab === 'aitool' ? "'FILL' 1" : "'FILL' 0" }}>
            flare
          </span>
          <span className="text-[11px] font-bold mt-0.5">AI Tool</span>
        </button>

        {showResultsTab && (
          <button
            onClick={() => setActiveTab('results')}
            className={`flex flex-col items-center justify-center px-4 py-1.5 transition-all duration-200 rounded-full ${
              activeTab === 'results'
                ? 'bg-[#7c3aed] text-white px-5 py-1.5 shadow-md scale-105'
                : 'text-[#4a4455] hover:text-[#630ed4]'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: activeTab === 'results' ? "'FILL' 1" : "'FILL' 0" }}>
              palette
            </span>
            <span className="text-[11px] font-bold mt-0.5">Results</span>
          </button>
        )}
      </nav>
    </>
  );
};
