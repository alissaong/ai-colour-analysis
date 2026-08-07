import React, { useState } from 'react';
import { ColorSwatch } from '../types';

interface VirtualTryOnModalProps {
  swatch: ColorSwatch | null;
  onClose: () => void;
  photoUrl?: string;
}

export const VirtualTryOnModal: React.FC<VirtualTryOnModalProps> = ({
  swatch,
  onClose,
  photoUrl = 'https://lh3.googleusercontent.com/aida/AP1WRLu4ORd6iUHGdsea4Cw8pb9YeYXiBHp583asyh_1-OtJnW1xrDwaCNKMyHXfXDgzgqFfV5s4AhQQvnHyht3SjcTkLfx68GjkLu-YVm5mPH5WY-uoavwIQDCCykzuKjXQBIXXpN_-706uaRgpySY7Yt7mo63Kroa8NYQHGHkXfN4hFe0NhxCjNE_KwMbz_RlK-Te9TjortWYqRTr_ZTlxca5ewTpU8UxFEIb0WEdX5b_N3NznzN-SQakCHA',
}) => {
  if (!swatch) return null;

  const [activeCategory, setActiveCategory] = useState<'outfit' | 'lipstick' | 'eyeshadow'>('outfit');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#e7eeff] flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#e7eeff] flex items-center justify-between bg-[#f9f9ff]">
          <div className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded-lg shadow-inner border border-black/10"
              style={{ backgroundColor: swatch.hex }}
            ></div>
            <div>
              <h3 className="font-bold text-base text-[#111c2d]">{swatch.name} Studio</h3>
              <p className="text-xs text-[#7c3aed] font-mono">{swatch.hex}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#e7eeff] transition-colors"
          >
            <span className="material-symbols-outlined text-[#111c2d]">close</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* Virtual Preview Canvas */}
          <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-md bg-[#f0f3ff]">
            <img
              src={photoUrl}
              alt="Model Preview"
              className="w-full h-full object-cover"
            />

            {/* Category Overlay Simulation */}
            {activeCategory === 'outfit' && (
              <div
                className="absolute inset-x-0 bottom-0 h-1/2 opacity-85 transition-all mix-blend-multiply rounded-b-2xl"
                style={{ backgroundColor: swatch.hex }}
              ></div>
            )}

            {activeCategory === 'lipstick' && (
              <div className="absolute top-[52%] left-[46%] w-10 h-4 rounded-full opacity-60 blur-[1px] mix-blend-color transition-all" style={{ backgroundColor: swatch.hex }}></div>
            )}

            {activeCategory === 'eyeshadow' && (
              <div className="absolute top-[41%] left-[32%] w-14 h-4 rounded-full opacity-50 blur-[2px] mix-blend-overlay transition-all" style={{ backgroundColor: swatch.hex }}></div>
            )}

            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#111c2d] shadow-sm">
              ✨ Live Simulation: {activeCategory.toUpperCase()}
            </div>
          </div>

          {/* Mode Selector */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setActiveCategory('outfit')}
              className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeCategory === 'outfit'
                  ? 'bg-[#7c3aed] text-white shadow-sm'
                  : 'bg-[#f0f3ff] text-[#4a4455] hover:bg-[#e7eeff]'
              }`}
            >
              <span className="material-symbols-outlined text-base">checkroom</span>
              Outfit
            </button>

            <button
              onClick={() => setActiveCategory('lipstick')}
              className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeCategory === 'lipstick'
                  ? 'bg-[#7c3aed] text-white shadow-sm'
                  : 'bg-[#f0f3ff] text-[#4a4455] hover:bg-[#e7eeff]'
              }`}
            >
              <span className="material-symbols-outlined text-base">face_retouching_natural</span>
              Lipstick
            </button>

            <button
              onClick={() => setActiveCategory('eyeshadow')}
              className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeCategory === 'eyeshadow'
                  ? 'bg-[#7c3aed] text-white shadow-sm'
                  : 'bg-[#f0f3ff] text-[#4a4455] hover:bg-[#e7eeff]'
              }`}
            >
              <span className="material-symbols-outlined text-base">visibility</span>
              Eyes
            </button>
          </div>

          <div className="p-3 bg-[#f0f3ff] rounded-xl text-xs text-[#4a4455] leading-relaxed">
            💡 <strong>Style Tip:</strong> {swatch.description || `This ${swatch.name} shade brings out golden warmth and enhances facial symmetry.`}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#e7eeff] flex gap-3 bg-[#f9f9ff]">
          <button
            onClick={() => {
              navigator.clipboard.writeText(swatch.hex);
              alert(`Copied ${swatch.hex} to clipboard!`);
            }}
            className="flex-1 py-3 bg-[#f0f3ff] text-[#111c2d] rounded-xl font-bold text-xs hover:bg-[#e7eeff] transition-colors"
          >
            Copy Hex Code
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-3 bg-[#7c3aed] text-white rounded-xl font-bold text-xs hover:bg-[#630ed4] transition-colors shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
