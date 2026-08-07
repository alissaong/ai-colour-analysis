import React, { useState } from 'react';
import { AnalysisResult, ColorSwatch, TabType } from '../types';
import { SEASONAL_PALETTES, SEASON_GROUPS } from '../data/seasonalPalettes';
import jsPDF from 'jspdf';

interface ResultsScreenProps {
  analysis: AnalysisResult;
  onOpenVirtualTryOn: (color: ColorSwatch) => void;
  setActiveTab: (tab: TabType) => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  analysis,
  onOpenVirtualTryOn,
  setActiveTab,
}) => {
  const [currentSeasonKey, setCurrentSeasonKey] = useState<string>(
    SEASONAL_PALETTES[analysis.season] ? analysis.season : 'Warm Autumn'
  );

  const activeData: AnalysisResult =
    SEASONAL_PALETTES[currentSeasonKey] || analysis;

  const photoUrl =
    analysis.photoUrl ||
    'https://lh3.googleusercontent.com/aida/AP1WRLu4ORd6iUHGdsea4Cw8pb9YeYXiBHp583asyh_1-OtJnW1xrDwaCNKMyHXfXDgzgqFfV5s4AhQQvnHyht3SjcTkLfx68GjkLu-YVm5mPH5WY-uoavwIQDCCykzuKjXQBIXXpN_-706uaRgpySY7Yt7mo63Kroa8NYQHGHkXfN4hFe0NhxCjNE_KwMbz_RlK-Te9TjortWYqRTr_ZTlxca5ewTpU8UxFEIb0WEdX5b_N3NznzN-SQakCHA';

  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const handleSharePdfResults = () => {
    const doc = new jsPDF();

    const primaryColor = [99, 14, 212];
    const darkTextColor = [17, 28, 45];
    const grayTextColor = [74, 68, 85];

    // Header Banner
    doc.setFillColor(99, 14, 212);
    doc.rect(0, 0, 210, 28, 'F');

    // Brand Name
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('HueAI | Personal Color Analysis Report', 14, 18);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(
      `Generated on ${new Date().toLocaleDateString('en-SG', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })}`,
      196,
      18,
      { align: 'right' }
    );

    let y = 40;
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(`Seasonal Type: ${activeData.season}`, 14, y);

    y += 8;
    doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(
      `Undertone: ${activeData.undertone || 'Warm Golden'}   |   Contrast: ${
        activeData.contrast || 'Medium'
      }${activeData.modelUsed ? `   |   Model: ${activeData.modelUsed}` : ''}`,
      14,
      y
    );

    y += 8;
    doc.setTextColor(grayTextColor[0], grayTextColor[1], grayTextColor[2]);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    const splitDesc = doc.splitTextToSize(activeData.description, 180);
    doc.text(splitDesc, 14, y);
    y += splitDesc.length * 5 + 6;

    // Best Colors Section
    doc.setFillColor(240, 243, 255);
    doc.rect(14, y, 182, 7, 'F');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(`BEST COLOR PALETTE (${activeData.bestColors.length} Colors)`, 18, y + 5);
    y += 12;

    const swatchesPerRow = 4;
    const colWidth = 43;
    let startX = 14;

    activeData.bestColors.forEach((swatch, idx) => {
      const col = idx % swatchesPerRow;
      const row = Math.floor(idx / swatchesPerRow);
      const currX = startX + col * (colWidth + 2);
      const currY = y + row * 15;

      const hex = swatch.hex.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16) || 120;
      const g = parseInt(hex.substring(2, 4), 16) || 120;
      const b = parseInt(hex.substring(4, 6), 16) || 120;

      doc.setFillColor(r, g, b);
      doc.rect(currX, currY, 11, 11, 'F');

      doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.text(swatch.name, currX + 13, currY + 5);
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text(swatch.hex.toUpperCase(), currX + 13, currY + 9);
    });

    const totalBestRows = Math.ceil(activeData.bestColors.length / swatchesPerRow);
    y += totalBestRows * 15 + 8;

    // Avoid Colors Section
    doc.setFillColor(255, 240, 240);
    doc.rect(14, y, 182, 7, 'F');
    doc.setTextColor(186, 26, 26);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('COLORS TO AVOID', 18, y + 5);
    y += 12;

    activeData.avoidColors.forEach((avoid, idx) => {
      const col = idx % swatchesPerRow;
      const row = Math.floor(idx / swatchesPerRow);
      const currX = startX + col * (colWidth + 2);
      const currY = y + row * 15;

      const hex = avoid.hex.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16) || 120;
      const g = parseInt(hex.substring(2, 4), 16) || 120;
      const b = parseInt(hex.substring(4, 6), 16) || 120;

      doc.setFillColor(r, g, b);
      doc.rect(currX, currY, 11, 11, 'F');

      doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.text(avoid.name, currX + 13, currY + 5);
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text(avoid.hex.toUpperCase(), currX + 13, currY + 9);
    });

    const totalAvoidRows = Math.ceil(activeData.avoidColors.length / swatchesPerRow);
    y += totalAvoidRows * 15 + 10;

    // Makeup section
    if (activeData.makeupRecommendations && activeData.makeupRecommendations.length > 0) {
      if (y > 230) {
        doc.addPage();
        y = 20;
      }

      doc.setFillColor(245, 240, 255);
      doc.rect(14, y, 182, 7, 'F');
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('PERSONALIZED MAKEUP MATCHES', 18, y + 5);
      y += 12;

      activeData.makeupRecommendations.forEach((rec) => {
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(darkTextColor[0], darkTextColor[1], darkTextColor[2]);
        doc.text(`${rec.category}: ${rec.shadeName}`, 18, y);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(grayTextColor[0], grayTextColor[1], grayTextColor[2]);
        doc.text(`- ${rec.notes}`, 18, y + 4);
        y += 9;
      });
    }

    const pageHeight = doc.internal.pageSize.height;
    doc.setFillColor(249, 249, 255);
    doc.rect(0, pageHeight - 12, 210, 12, 'F');
    doc.setTextColor(99, 14, 212);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('HueAI Color Analysis System — Singapore #1 AI Personal Stylist', 105, pageHeight - 4, {
      align: 'center',
    });

    const fileName = `HueAI_${activeData.season.replace(/\s+/g, '_')}_Report.pdf`;
    doc.save(fileName);
  };

  return (
    <main className="max-w-[1200px] mx-auto px-6 pt-6 md:pt-10 pb-28 md:pb-16 font-body">
      {/* Header */}
      <header className="mb-8 text-center max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
          <div className="inline-block px-3.5 py-1 rounded-full bg-[#ede0ff] text-[#7c3aed] font-bold text-xs uppercase tracking-wider">
            12-Season Color Analysis Complete
          </div>
          {activeData.modelUsed && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>{activeData.modelUsed}</span>
              {activeData.confidence !== undefined && (
                <span className="bg-emerald-200/60 px-1.5 py-0.5 rounded text-[10px]">
                  {(activeData.confidence * 100).toFixed(1)}% Match
                </span>
              )}
            </div>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-[#630ed4] mb-3 leading-tight">
          {activeData.headline || `Your Season: ${activeData.season}`}
        </h1>
        <p className="text-base sm:text-lg text-[#4a4455] max-w-xl mx-auto leading-relaxed mb-6">
          {activeData.description}
        </p>

        {/* Top Predictions Bar if available */}
        {activeData.topPredictions && activeData.topPredictions.length > 0 && (
          <div className="mb-6 bg-white p-3 rounded-xl border border-[#ede0ff] max-w-lg mx-auto shadow-2xs">
            <div className="text-[11px] font-bold text-[#630ed4] uppercase tracking-wider mb-2 text-left">
              Teachable Machine Class Probabilities
            </div>
            <div className="space-y-1.5">
              {activeData.topPredictions.slice(0, 3).map((pred, idx) => (
                <div key={pred.className} className="flex items-center gap-2 text-xs">
                  <span className="w-24 text-left font-bold text-[#111c2d] truncate">
                    {pred.className}
                  </span>
                  <div className="flex-1 bg-[#f0f3ff] h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        idx === 0 ? 'bg-[#7c3aed]' : 'bg-[#a78bfa]'
                      }`}
                      style={{ width: `${Math.max(pred.probability * 100, 2)}%` }}
                    ></div>
                  </div>
                  <span className="w-12 text-right font-mono text-[11px] text-[#666]">
                    {(pred.probability * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 12 Seasonal Preset Comparator */}
        <div className="bg-[#f8f6ff] p-4 rounded-2xl border border-[#ede0ff] shadow-sm text-left">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-extrabold text-[#630ed4] uppercase tracking-wider">
              Explore All 12 Color Palettes
            </span>
            <span className="text-[11px] text-[#7a7485] font-medium">
              Click any season to compare
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {SEASON_GROUPS.map((group) => (
              <div
                key={group.name}
                className="bg-white p-2.5 rounded-xl border border-black/5 shadow-2xs"
              >
                <div className="flex items-center gap-1.5 mb-2 px-1">
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block"
                    style={{ backgroundColor: group.color }}
                  ></span>
                  <span className="text-xs font-bold text-[#111c2d]">
                    {group.name}
                  </span>
                  <span className="text-[10px] text-[#888] font-medium">
                    ({group.description})
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  {group.seasons.map((seasonName) => {
                    const isSelected = currentSeasonKey === seasonName;
                    return (
                      <button
                        key={seasonName}
                        onClick={() => setCurrentSeasonKey(seasonName)}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#7c3aed] text-white shadow-xs font-bold'
                            : 'bg-[#f8f9fc] text-[#4a4455] hover:bg-[#ede0ff] hover:text-[#630ed4]'
                        }`}
                      >
                        <span>{seasonName}</span>
                        {isSelected && <span className="text-[10px]">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Main Image & Vertical Palette Sidebar */}
      <section className="flex flex-col md:flex-row gap-4 md:gap-6 mb-12 max-w-4xl mx-auto items-stretch">
        {/* Palette Sidebar */}
        <div
          className="flex-none flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 hide-scrollbar"
          style={{ scrollbarWidth: 'none' }}
        >
          {activeData.bestColors.map((swatch) => (
            <div
              key={swatch.name}
              onClick={() => onOpenVirtualTryOn(swatch)}
              className="w-14 h-14 md:w-16 md:h-16 rounded-xl flex-shrink-0 cursor-pointer shadow-sm hover:scale-105 transition-transform border border-black/5 relative group"
              style={{ backgroundColor: swatch.hex }}
              title={`${swatch.name} (${swatch.hex})`}
            >
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity flex items-center justify-center text-white text-[10px] font-bold">
                Try
              </div>
            </div>
          ))}
        </div>

        {/* Analyzed Photo */}
        <div className="flex-grow rounded-2xl overflow-hidden shadow-md bg-white relative min-h-[360px] md:min-h-[460px] aspect-[3/4] md:aspect-auto">
          <img
            src={photoUrl}
            alt="Analyzed Portrait"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

          {/* Badge Overlay */}
          <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3.5 rounded-xl shadow-lg border border-white/40 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#4a4455] font-semibold">Primary Undertone</p>
              <p className="text-sm font-bold text-[#111c2d]">{activeData.undertone || 'Warm Golden'}</p>
            </div>
            <div>
              <p className="text-xs text-[#4a4455] font-semibold">Contrast Level</p>
              <p className="text-sm font-bold text-[#7c3aed]">{activeData.contrast || 'Medium'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Best Colors Grid */}
      <section className="mb-12 max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <span className="material-symbols-outlined text-[#7c3aed] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            palette
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-[#111c2d]">
            Best colors for {activeData.season.toLowerCase()}
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4">
          {activeData.bestColors.map((swatch) => (
            <div
              key={swatch.name}
              onClick={() => onOpenVirtualTryOn(swatch)}
              className="bg-white rounded-2xl p-3 shadow-sm border border-[#e7eeff] hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group text-center"
            >
              <div
                className="w-full aspect-square rounded-xl mb-2.5 shadow-inner border border-black/5"
                style={{ backgroundColor: swatch.hex }}
              ></div>
              <p className="font-bold text-xs text-[#111c2d] uppercase tracking-wider group-hover:text-[#7c3aed] transition-colors truncate">
                {swatch.name}
              </p>
              <p className="text-[10px] text-[#4a4455] font-mono mt-0.5 opacity-80">
                {swatch.hex}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Colors to Avoid */}
      <section className="mb-12 max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-4 text-center">
          <span className="material-symbols-outlined text-[#ba1a1a] text-2xl">
            block
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-[#111c2d]">To avoid:</h2>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#ffdad6]">
          <p className="text-sm text-[#4a4455] text-center mb-6 max-w-xl mx-auto leading-relaxed">
            These high-contrast, cool, or neon colors can overpower your natural warmth and make your skin look washed out.
          </p>

          <div className="flex flex-wrap justify-center gap-0 rounded-xl overflow-hidden max-w-3xl mx-auto shadow-inner border border-[#e7eeff]">
            {activeData.avoidColors.map((avoid) => (
              <div
                key={avoid.name}
                className="h-16 flex-grow basis-1/6 relative group cursor-pointer"
                style={{ backgroundColor: avoid.hex }}
                title={`${avoid.name}: ${avoid.reason || 'Not recommended'}`}
              >
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold p-1 text-center">
                  {avoid.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Makeup & Outfit Styling Section */}
      {activeData.makeupRecommendations && activeData.makeupRecommendations.length > 0 && (
        <section className="mb-12 max-w-4xl mx-auto">
          <div className="bg-[#f0f3ff] rounded-3xl p-6 sm:p-8 border border-[#d8e3fb]">
            <h3 className="text-xl font-bold text-[#111c2d] mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#7c3aed]">face_retouching_natural</span>
              Personalized Makeup &amp; Outfit Matches
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeData.makeupRecommendations.map((rec) => (
                <div key={rec.category} className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex-shrink-0 shadow-sm border border-black/5"
                    style={{ backgroundColor: rec.hex }}
                  ></div>
                  <div>
                    <span className="text-[11px] font-bold uppercase text-[#7c3aed]">{rec.category}</span>
                    <h4 className="font-bold text-sm text-[#111c2d]">{rec.shadeName}</h4>
                    <p className="text-xs text-[#4a4455]">{rec.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Share Results Button */}
      <section className="text-center max-w-md mx-auto">
        <button
          onClick={handleSharePdfResults}
          className="w-full py-4 bg-[#630ed4] text-white rounded-full font-bold text-base shadow-lg hover:bg-[#5209b5] transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">share</span>
          Share Results (PDF)
        </button>
      </section>
    </main>
  );
};
