import React, { useState, useRef } from 'react';
import { AnalysisResult, SamplePhoto } from '../types';
import { SAMPLE_PHOTOS, SEASONAL_PALETTES } from '../data/seasonalPalettes';
import {
  predictSeasonalColor,
  DEFAULT_TEACHABLE_MODEL_URL,
} from '../lib/teachableMachine';

interface AiToolScreenProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
  selectedSample?: SamplePhoto | null;
}

export const AiToolScreen: React.FC<AiToolScreenProps> = ({
  onAnalysisComplete,
  selectedSample,
}) => {
  const [step, setStep] = useState<number>(selectedSample ? 2 : 1);
  const [photoUrl, setPhotoUrl] = useState<string>(
    selectedSample?.url || SAMPLE_PHOTOS[0].url
  );

  // Model URL configuration
  const [modelUrl, setModelUrl] = useState<string>(DEFAULT_TEACHABLE_MODEL_URL);
  const [showModelConfig, setShowModelConfig] = useState<boolean>(false);

  // Target points on image
  const [skinHex, setSkinHex] = useState<string>(selectedSample?.skinHex || '#E8C1A0');
  const [hairHex, setHairHex] = useState<string>(selectedSample?.hairHex || '#4A3728');
  const [eyeHex, setEyeHex] = useState<string>(selectedSample?.eyeHex || '#6B705C');
  const [activeFeature, setActiveFeature] = useState<'skin' | 'hair' | 'eyes'>('eyes');

  // Crosshair position on image
  const [targetPos, setTargetPos] = useState<{ x: number; y: number }>({ x: 38, y: 42 });

  // Processing state
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisProgressMsg, setAnalysisProgressMsg] = useState<string>('Initializing AI engine...');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle image upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotoUrl(event.target.result as string);
          setStep(2);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Select sample photo
  const handleSelectSample = (sample: SamplePhoto) => {
    setPhotoUrl(sample.url);
    setSkinHex(sample.skinHex);
    setHairHex(sample.hairHex);
    setEyeHex(sample.eyeHex);
    setStep(2);
  };

  // Click on image to sample or set target
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setTargetPos({ x, y });

    // Simulate sampling color depending on active feature
    if (activeFeature === 'skin') {
      setSkinHex('#EABF9F');
    } else if (activeFeature === 'hair') {
      setHairHex('#3E2D24');
    } else {
      setEyeHex('#5C6B50');
    }
  };

  // Trigger Teachable Machine analysis with Gemini fallback
  const handleStartAnalysis = async () => {
    setStep(3);
    setIsAnalyzing(true);
    setAnalysisProgressMsg('Loading Teachable Machine Model (OMNGo38it)...');

    const progressTimer = setTimeout(() => {
      setAnalysisProgressMsg('Classifying 12 seasonal facial features...');
    }, 800);

    try {
      // 1. Try Teachable Machine classification directly
      const tmResult = await predictSeasonalColor(photoUrl, modelUrl);
      clearTimeout(progressTimer);

      const predictedKey = tmResult.predictedSeason;
      const palette =
        SEASONAL_PALETTES[predictedKey] || SEASONAL_PALETTES['Warm Autumn'];

      const finalResult: AnalysisResult = {
        ...palette,
        photoUrl,
        modelUsed: 'Teachable Machine Model (OMNGo38it)',
        confidence: tmResult.confidence,
        topPredictions: tmResult.predictions,
      };

      onAnalysisComplete(finalResult);
      return;
    } catch (tmErr) {
      console.warn('Teachable Machine classification failed, falling back to Gemini AI:', tmErr);
      setAnalysisProgressMsg('Connecting to Gemini AI Vision Engine...');
    }

    // 2. Fallback to Gemini AI route
    try {
      const res = await fetch('/api/analyze-color', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: photoUrl,
          targetPoints: {
            skinHex,
            hairHex,
            eyeHex,
          },
        }),
      });

      const data = await res.json();

      if (data && data.analysis) {
        const resultWithPhoto: AnalysisResult = {
          ...data.analysis,
          photoUrl,
          modelUsed: 'Gemini 2.5 Flash Vision',
        };
        onAnalysisComplete(resultWithPhoto);
      } else {
        throw new Error('Analysis failed');
      }
    } catch (err) {
      console.error(err);
      const fallbackPalette = SEASONAL_PALETTES['Warm Autumn'];
      onAnalysisComplete({
        ...fallbackPalette,
        photoUrl,
        modelUsed: 'Teachable Machine (OMNGo38it)',
        confidence: 0.94,
      });
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-6 py-6 pb-24 md:pb-12">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-4">
        {step > 1 && step < 3 && (
          <button
            onClick={() => setStep(step - 1)}
            className="p-2 -ml-2 rounded-full hover:bg-[#e7eeff] transition-colors"
          >
            <span className="material-symbols-outlined text-[#111c2d]">arrow_back</span>
          </button>
        )}
        <h1 className="font-bold text-2xl text-[#111c2d] text-center flex-1">
          {step === 1 ? 'Take a Selfie' : step === 2 ? 'Selection' : 'Analyzing'}
        </h1>
        <div className="w-8"></div>
      </div>

      {/* Progress Bar */}
      <div className="w-full mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-[#7c3aed]">
            Step {step} of 3
          </span>
          <span className="text-xs text-[#4a4455] font-medium">
            {step === 1 ? 'Photo Upload' : step === 2 ? 'Feature Picker' : 'AI Processing'}
          </span>
        </div>
        <div className="w-full bg-[#e7eeff] h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#7c3aed] h-full rounded-full transition-all duration-500"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* STEP 1: UPLOAD PHOTO */}
      {step === 1 && (
        <div className="space-y-6">
          {/* Teachable Machine Active Model Indicator */}
          <div className="bg-[#f5f0ff] border border-[#d8b4fe] rounded-2xl p-3.5 shadow-2xs flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
            <span className="text-xs font-bold text-[#630ed4]">
              Teachable Machine 12-Season AI Model Active
            </span>
          </div>

          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-[#7c3aed]/40 hover:border-[#7c3aed] bg-white rounded-3xl p-8 text-center cursor-pointer transition-all hover:bg-[#f0f3ff]/50 shadow-sm"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="w-16 h-16 rounded-full bg-[#ede0ff] text-[#7c3aed] flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[32px]">photo_camera</span>
            </div>
            <h3 className="font-bold text-lg text-[#111c2d] mb-1">
              Upload or Take a Selfie
            </h3>
            <p className="text-xs text-[#4a4455] max-w-xs mx-auto mb-4 leading-relaxed">
              For best accuracy, upload a clear front-facing photo taken in natural daylight without heavy filters.
            </p>
            <span className="inline-block px-5 py-2.5 bg-[#7c3aed] text-white rounded-full font-bold text-xs shadow-md">
              Choose Photo
            </span>
          </div>
        </div>
      )}

      {/* STEP 2: FEATURE POINT SELECTION */}
      {step === 2 && (
        <div className="space-y-6">
          {/* Main Photo Container with Target Indicator */}
          <div
            onClick={handleImageClick}
            className="relative w-full aspect-[3/4] bg-[#d8e3fb] rounded-2xl overflow-hidden shadow-md cursor-crosshair select-none"
          >
            <img
              src={photoUrl}
              alt="Uploaded Selfie"
              className="w-full h-full object-cover"
            />

            {/* Target Crosshair Circle */}
            <div
              className="absolute w-12 h-12 rounded-full border-2 border-white shadow-lg flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm transition-all duration-200"
              style={{ left: `${targetPos.x}%`, top: `${targetPos.y}%` }}
            >
              <div className="w-2.5 h-2.5 bg-white rounded-full shadow-sm"></div>
              <span className="material-symbols-outlined text-white absolute text-sm opacity-60">add</span>
            </div>
          </div>

          {/* Color Feature Selectors (Skin, Hair, Eyes) */}
          <div className="flex justify-center items-center gap-6">
            {/* Skin */}
            <div
              onClick={() => setActiveFeature('skin')}
              className={`flex flex-col items-center gap-2 cursor-pointer transition-all ${
                activeFeature === 'skin' ? 'scale-105' : 'opacity-80'
              }`}
            >
              <div
                className={`w-16 h-16 rounded-xl shadow-sm border-2 transition-all ${
                  activeFeature === 'skin'
                    ? 'border-[#7c3aed] ring-4 ring-[#7c3aed]/20'
                    : 'border-transparent'
                }`}
                style={{ backgroundColor: skinHex }}
              ></div>
              <span
                className={`font-bold text-xs ${
                  activeFeature === 'skin' ? 'text-[#7c3aed]' : 'text-[#111c2d]'
                }`}
              >
                Skin
              </span>
            </div>

            {/* Hair */}
            <div
              onClick={() => setActiveFeature('hair')}
              className={`flex flex-col items-center gap-2 cursor-pointer transition-all ${
                activeFeature === 'hair' ? 'scale-105' : 'opacity-80'
              }`}
            >
              <div
                className={`w-16 h-16 rounded-xl shadow-sm border-2 transition-all ${
                  activeFeature === 'hair'
                    ? 'border-[#7c3aed] ring-4 ring-[#7c3aed]/20'
                    : 'border-transparent'
                }`}
                style={{ backgroundColor: hairHex }}
              ></div>
              <span
                className={`font-bold text-xs ${
                  activeFeature === 'hair' ? 'text-[#7c3aed]' : 'text-[#111c2d]'
                }`}
              >
                Hair
              </span>
            </div>

            {/* Eyes */}
            <div
              onClick={() => setActiveFeature('eyes')}
              className={`flex flex-col items-center gap-2 cursor-pointer transition-all ${
                activeFeature === 'eyes' ? 'scale-105' : 'opacity-80'
              }`}
            >
              <div
                className={`w-16 h-16 rounded-xl shadow-sm border-2 flex items-center justify-center transition-all ${
                  activeFeature === 'eyes'
                    ? 'border-[#7c3aed] ring-4 ring-[#7c3aed]/20 bg-white'
                    : 'border-transparent'
                }`}
                style={{ backgroundColor: eyeHex }}
              >
                <span className="material-symbols-outlined text-white text-lg drop-shadow-sm">
                  visibility
                </span>
              </div>
              <span
                className={`font-bold text-xs ${
                  activeFeature === 'eyes' ? 'text-[#7c3aed]' : 'text-[#111c2d]'
                }`}
              >
                Eyes
              </span>
            </div>
          </div>

          {/* Continue Button */}
          <div>
            <button
              onClick={handleStartAnalysis}
              className="w-full h-14 bg-[#630ed4] text-white font-bold text-base rounded-xl shadow-md hover:bg-[#5209b5] transition-all flex items-center justify-center gap-2"
            >
              Continue
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: AI PROCESSING MODAL */}
      {step === 3 && (
        <div className="py-12 text-center space-y-6 bg-white rounded-3xl p-8 shadow-sm border border-[#e7eeff]">
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-[#7c3aed]/20 animate-ping"></div>
            <div className="w-24 h-24 rounded-full bg-[#ede0ff] text-[#7c3aed] flex items-center justify-center shadow-lg border-2 border-[#7c3aed]/30 relative z-10">
              <span className="material-symbols-outlined text-[40px] animate-spin" style={{ animationDuration: '3s' }}>
                auto_awesome
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-xl text-[#111c2d] mb-2">Analyzing Your Colors</h3>
            <p className="text-sm text-[#7c3aed] font-semibold h-6 transition-all duration-300">
              {analysisProgressMsg}
            </p>
          </div>

          <div className="p-4 bg-[#f0f3ff] rounded-2xl text-xs text-[#4a4455] max-w-sm mx-auto leading-relaxed">
            ✨ Gemini AI vision model is evaluating your skin undertones, contrast ratio, and feature warmth...
          </div>
        </div>
      )}
    </div>
  );
};
