import React, { useState } from 'react';

interface BookingModalProps {
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ onClose }) => {
  const [tier, setTier] = useState<'pro' | 'vip'>('pro');
  const [goal, setGoal] = useState<string>('wardrobe');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-[#e7eeff] p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#f0f3ff] transition-colors"
        >
          <span className="material-symbols-outlined text-[#111c2d]">close</span>
        </button>

        {!isSubmitted ? (
          <div>
            <div className="text-center mb-6">
              <span className="inline-block px-3 py-1 bg-[#ede0ff] text-[#7c3aed] font-bold text-xs rounded-full mb-2">
                Certified Color Consultant
              </span>
              <h3 className="text-xl font-bold text-[#111c2d]">Book Expert Analysis</h3>
              <p className="text-xs text-[#4a4455] mt-1">
                A certified master consultant will review your selfies and deliver a custom 35-color dossier in 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Tier Selection */}
              <div>
                <label className="block text-xs font-bold text-[#111c2d] mb-2">Select Service Tier</label>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => setTier('pro')}
                    className={`p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                      tier === 'pro'
                        ? 'border-[#7c3aed] bg-[#f0f3ff]'
                        : 'border-[#e7eeff] bg-white'
                    }`}
                  >
                    <div className="font-bold text-sm text-[#111c2d]">Professional</div>
                    <div className="text-xs text-[#7c3aed] font-bold mt-0.5">S$49</div>
                    <div className="text-[10px] text-[#4a4455] mt-1">24-hour turnaround</div>
                  </div>

                  <div
                    onClick={() => setTier('vip')}
                    className={`p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                      tier === 'vip'
                        ? 'border-[#7c3aed] bg-[#f0f3ff]'
                        : 'border-[#e7eeff] bg-white'
                    }`}
                  >
                    <div className="font-bold text-sm text-[#111c2d]">1-on-1 VIP</div>
                    <div className="text-xs text-[#7c3aed] font-bold mt-0.5">S$98</div>
                    <div className="text-[10px] text-[#4a4455] mt-1">30-min Zoom session</div>
                  </div>
                </div>
              </div>

              {/* Main Goal */}
              <div>
                <label className="block text-xs font-bold text-[#111c2d] mb-2">Primary Focus</label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full h-11 px-3 bg-[#f9f9ff] border border-[#e7eeff] rounded-xl text-xs font-semibold text-[#111c2d] focus:outline-none focus:border-[#7c3aed]"
                >
                  <option value="wardrobe">Capsule Wardrobe &amp; Clothing Colors</option>
                  <option value="makeup">Makeup Shade Matching (Lip, Blush, Eyes)</option>
                  <option value="hair">Hair Dye &amp; Hair Color Transformation</option>
                  <option value="event">Special Event / Wedding Styling</option>
                </select>
              </div>

              {/* User Email */}
              <div>
                <label className="block text-xs font-bold text-[#111c2d] mb-1">Your Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full h-11 px-3 bg-[#f9f9ff] border border-[#e7eeff] rounded-xl text-xs text-[#111c2d] focus:outline-none focus:border-[#7c3aed]"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full h-13 bg-[#630ed4] text-white font-bold text-sm rounded-xl hover:bg-[#5209b5] transition-all shadow-md mt-2 flex items-center justify-center gap-2"
              >
                Proceed to Secure Checkout (S${tier === 'pro' ? '49' : '98'})
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#e7eeff] text-[#7c3aed] flex items-center justify-center mx-auto shadow-inner">
              <span className="material-symbols-outlined text-[36px]">verified</span>
            </div>
            <h3 className="text-2xl font-bold text-[#111c2d]">Order Confirmed!</h3>
            <p className="text-xs text-[#4a4455] max-w-xs mx-auto leading-relaxed">
              Thank you! Your selfie analysis order has been assigned to certified consultant <strong>Anna K.</strong>. You will receive your full 35-color PDF portfolio via email within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="w-full h-12 bg-[#7c3aed] text-white font-bold text-xs rounded-xl shadow-md hover:bg-[#630ed4] transition-colors"
            >
              Back to Application
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
