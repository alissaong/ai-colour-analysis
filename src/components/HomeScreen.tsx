import React from 'react';
import { TabType, SamplePhoto } from '../types';

interface HomeScreenProps {
  setActiveTab: (tab: TabType) => void;
  onSelectSamplePhoto?: (sample: SamplePhoto) => void;
  onOpenIosModal: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  setActiveTab,
  onOpenIosModal,
}) => {
  return (
    <div className="w-full pb-24 md:pb-12">
      {/* Hero Section */}
      <header className="relative w-full min-h-[85vh] flex flex-col items-center justify-center px-6 pt-8 pb-16 overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0 bg-[#F8FAFC]">
          <img
            src="https://lh3.googleusercontent.com/aida/AP1WRLv5PhwyEAXx5JBy7r1ErMkmGzQLO1iqP958mEd4ZHCLzratg9BEb5et6ImpQw_MtcxuVBG-v9ryDDX7XgqPRE5AUMeWzLsBJBVkR1_Ux751ozss3VryBDGtBNOUFuSWATXDSfZLXpAyybeWOBmOvxeoTXnHB2YSenvkiLqdf3Mx0Yp5_PsGYK8q6L6OfIS9T6mi3cXaquYPfOsNUusKFzob8tI6PdchaE29Tm1aagfLMfXbn7HcQSS9Bow"
            alt="Reveal Your Natural Beauty"
            className="w-full h-full object-cover opacity-70 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f9f9ff]/40 via-[#f9f9ff]/80 to-[#f9f9ff]"></div>
        </div>

        <div className="relative z-10 w-full max-w-lg mx-auto text-center flex flex-col items-center gap-6 mt-6">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-[#630ed4] font-bold text-xs tracking-wider shadow-sm border border-[#7c3aed]/20">
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              flare
            </span>
            The #1 Free AI Color Analysis Tool
          </div>

          {/* Main Heading */}
          <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#111c2d] leading-tight tracking-tight">
            Confidence Starts with the Right Colours
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#4a4455] max-w-md leading-relaxed font-normal">
            Get your personalized seasonal color palette in less than 60 seconds.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col w-full gap-3.5 mt-2">
            <button
              onClick={() => setActiveTab('aitool')}
              className="w-full h-14 bg-[#630ed4] text-white rounded-full font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-[#630ed4]/25 hover:shadow-xl hover:bg-[#5209b5] transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Find My Colors
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>

            <button
              onClick={onOpenIosModal}
              className="w-full h-14 bg-white/90 text-[#630ed4] border border-[#630ed4]/20 rounded-full font-bold text-base flex items-center justify-center gap-2 hover:bg-[#630ed4]/5 transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined">phone_iphone</span>
              Download iOS App
            </button>
          </div>
        </div>
      </header>

      {/* Singapore Market Insights Section */}
      <section className="py-8 px-6 max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ede0ff] shadow-sm text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ede0ff] text-[#630ed4] text-xs font-bold uppercase tracking-wider mb-3">
            <span>🇸🇬</span> Singapore Market Insights
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-[#111c2d] mb-2">
            Average Cost of Colour Analysis in Singapore
          </h2>
          <p className="text-sm text-[#4a4455] max-w-lg mx-auto mb-6">
            In-person consultations at studios in Orchard, Tanjong Pagar, or Bugis average <strong className="text-[#630ed4] font-bold">S$180 – S$350+ SGD</strong> with weeks of waiting time.
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto p-4 rounded-2xl bg-[#f8f6ff] border border-[#ede0ff] mb-6">
            <div className="text-center">
              <span className="block text-[11px] font-bold uppercase text-[#666] mb-1">Traditional Studio</span>
              <span className="text-lg font-extrabold text-rose-600 font-mono">S$180 - S$350+</span>
            </div>
            <div className="text-center border-l border-[#ede0ff]">
              <span className="block text-[11px] font-bold uppercase text-[#7c3aed] mb-1">HueAI App</span>
              <span className="text-lg font-black text-emerald-600 font-mono">FREE (S$0)</span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('aitool')}
            className="px-6 py-3 bg-[#630ed4] text-white rounded-full font-bold text-xs shadow-md hover:bg-[#5209b5] transition-all"
          >
            Analyze My Colors Free →
          </button>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-12 px-6 w-full max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-center text-[#111c2d] mb-10">Your Personal Color Journey</h2>

        <div className="grid grid-cols-1 gap-8 relative">
          {/* Step 1 */}
          <div className="flex items-start gap-5 relative z-10">
            <div className="w-14 h-14 rounded-full bg-[#7c3aed] text-white flex items-center justify-center shrink-0 font-bold text-xl shadow-md border-4 border-[#f9f9ff]">
              1
            </div>
            <div className="pt-1">
              <h3 className="font-bold text-base text-[#111c2d] mb-1">Take a Selfie</h3>
              <p className="text-sm text-[#4a4455] leading-relaxed">Upload a clear photo in natural lighting</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-5 relative z-10">
            <div className="w-14 h-14 rounded-full bg-[#e7eeff] text-[#7c3aed] flex items-center justify-center shrink-0 font-bold text-xl shadow-sm border-4 border-[#f9f9ff]">
              2
            </div>
            <div className="pt-1">
              <h3 className="font-bold text-base text-[#111c2d] mb-1">AI Analysis</h3>
              <p className="text-sm text-[#4a4455] leading-relaxed">Our AI identifies your unique color characteristics</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-5 relative z-10">
            <div className="w-14 h-14 rounded-full bg-[#e7eeff] text-[#7c3aed] flex items-center justify-center shrink-0 font-bold text-xl shadow-sm border-4 border-[#f9f9ff]">
              3
            </div>
            <div className="pt-1">
              <h3 className="font-bold text-base text-[#111c2d] mb-1">Get Your Palette</h3>
              <p className="text-sm text-[#4a4455] leading-relaxed">Receive your seasonal color type and custom palettes</p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex items-start gap-5 relative z-10">
            <div className="w-14 h-14 rounded-full bg-[#e7eeff] text-[#7c3aed] flex items-center justify-center shrink-0 font-bold text-xl shadow-sm border-4 border-[#f9f9ff]">
              4
            </div>
            <div className="pt-1">
              <h3 className="font-bold text-base text-[#111c2d] mb-1">Shop Confidently</h3>
              <p className="text-sm text-[#4a4455] leading-relaxed">Use your palette to make perfect color choices</p>
            </div>
          </div>
        </div>
      </section>

      {/* App Promo Section */}
      <section className="py-12 px-6 w-full bg-[#f0f3ff] rounded-t-[2.5rem] mt-8">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 bg-[#DB2777]/10 text-[#DB2777] font-bold text-xs rounded-full mb-3">
              New!
            </span>
            <h2 className="text-2xl font-bold text-[#111c2d] mb-3">Get the HueAI App</h2>
            <p className="text-sm text-[#4a4455] leading-relaxed">
              Transform your style journey with our powerful mobile app. Get instant color analysis anywhere, anytime.
            </p>
          </div>

          <div className="space-y-3.5 mb-8">
            <div className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm border border-[#e7eeff]">
              <div className="w-11 h-11 rounded-full bg-[#7c3aed]/10 text-[#7c3aed] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">checkroom</span>
              </div>
              <span className="text-sm text-[#111c2d] font-semibold">Browse season-matched outfit ideas</span>
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <button
              onClick={onOpenIosModal}
              className="h-14 px-8 bg-[#111c2d] text-white rounded-full font-bold flex items-center gap-3 shadow-lg hover:shadow-xl hover:bg-[#1a293f] transition-all"
            >
              <span className="material-symbols-outlined text-[24px]">file_download</span>
              <div className="flex flex-col items-start text-left">
                <span className="text-[10px] uppercase tracking-wider opacity-80 leading-none">Download on the</span>
                <span className="text-sm font-bold leading-tight mt-0.5">App Store</span>
              </div>
            </button>
          </div>

          <p className="text-center text-xs text-[#4a4455]/80 font-medium">
            Requires iOS 17.5 or later • Free download with optional Pro features
          </p>
        </div>
      </section>
    </div>
  );
};
