import React, { useState } from 'react';
import { TabType, AnalysisResult, SamplePhoto, ColorSwatch } from './types';
import { Navigation } from './components/Navigation';
import { HomeScreen } from './components/HomeScreen';
import { AiToolScreen } from './components/AiToolScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { VirtualTryOnModal } from './components/VirtualTryOnModal';
import { IosAppModal } from './components/IosAppModal';
import { DisqusComments } from './components/DisqusComments';
import { SEASONAL_PALETTES } from './data/seasonalPalettes';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedSample, setSelectedSample] = useState<SamplePhoto | null>(null);
  const [hasCompletedAnalysis, setHasCompletedAnalysis] = useState<boolean>(false);

  // Default initial analysis state
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult>(
    SEASONAL_PALETTES['Warm Autumn']
  );

  // Modals state
  const [activeTryOnSwatch, setActiveTryOnSwatch] = useState<ColorSwatch | null>(null);
  const [showIosModal, setShowIosModal] = useState<boolean>(false);

  // Selecting a sample from home
  const handleSelectSampleFromHome = (sample: SamplePhoto) => {
    setSelectedSample(sample);
    setActiveTab('aitool');
  };

  // Complete analysis from AI Tool screen
  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
    setHasCompletedAnalysis(true);
    setActiveTab('results');
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#111c2d] flex flex-col font-body selection:bg-[#7c3aed] selection:text-white">
      {/* Top Header Navigation */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasCompletedAnalysis={hasCompletedAnalysis}
      />

      {/* View Screens */}
      <div className="flex-1 w-full">
        {activeTab === 'home' && (
          <HomeScreen
            setActiveTab={setActiveTab}
            onSelectSamplePhoto={handleSelectSampleFromHome}
            onOpenIosModal={() => setShowIosModal(true)}
          />
        )}

        {activeTab === 'aitool' && (
          <AiToolScreen
            onAnalysisComplete={handleAnalysisComplete}
            selectedSample={selectedSample}
          />
        )}

        {activeTab === 'results' && (
          <ResultsScreen
            analysis={analysisResult}
            onOpenVirtualTryOn={(swatch) => setActiveTryOnSwatch(swatch)}
            setActiveTab={setActiveTab}
          />
        )}
      </div>

      {/* Disqus Comments Section */}
      <DisqusComments />

      {/* Interactive Modals */}
      {activeTryOnSwatch && (
        <VirtualTryOnModal
          swatch={activeTryOnSwatch}
          onClose={() => setActiveTryOnSwatch(null)}
          photoUrl={analysisResult.photoUrl}
        />
      )}

      {showIosModal && (
        <IosAppModal onClose={() => setShowIosModal(false)} />
      )}
    </div>
  );
}
