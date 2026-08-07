import React from 'react';

interface IosAppModalProps {
  onClose: () => void;
}

export const IosAppModal: React.FC<IosAppModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl border border-[#e7eeff] p-6 text-center relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#f0f3ff] transition-colors"
        >
          <span className="material-symbols-outlined text-[#111c2d]">close</span>
        </button>

        <div className="w-16 h-16 rounded-2xl bg-[#7c3aed] text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#7c3aed]/25">
          <span className="material-symbols-outlined text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            flare
          </span>
        </div>

        <span className="inline-block px-3 py-1 bg-[#DB2777]/10 text-[#DB2777] font-bold text-xs rounded-full mb-2">
          iOS App Store
        </span>

        <h3 className="text-xl font-bold text-[#111c2d] mb-2">HueAI</h3>
        <p className="text-xs text-[#4a4455] mb-6 leading-relaxed">
          Scan the QR code or tap below to install the official iOS app with live AR camera palette overlays.
        </p>

        {/* Simulated QR Code */}
        <div className="w-40 h-40 bg-[#f0f3ff] rounded-2xl p-3 mx-auto mb-6 flex flex-col items-center justify-center border-2 border-dashed border-[#7c3aed]/30 shadow-inner">
          <span className="material-symbols-outlined text-[64px] text-[#7c3aed]">qr_code_2</span>
          <span className="text-[10px] font-bold text-[#4a4455] mt-1">Scan to Download</span>
        </div>

        <a
          href="https://apple.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-12 bg-[#111c2d] text-white font-bold text-sm rounded-full flex items-center justify-center gap-2 shadow-md hover:bg-[#1a293f] transition-all"
        >
          <span className="material-symbols-outlined">phone_iphone</span>
          Open in App Store
        </a>

        <p className="text-[10px] text-[#7b7487] mt-3">
          Requires iOS 17.5 or later • Free with optional Pro features
        </p>
      </div>
    </div>
  );
};
