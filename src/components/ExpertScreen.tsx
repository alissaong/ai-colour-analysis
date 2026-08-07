import React, { useState } from 'react';

interface ExpertScreenProps {
  onOpenBookingModal: () => void;
}

export const ExpertScreen: React.FC<ExpertScreenProps> = ({ onOpenBookingModal }) => {
  return (
    <main className="max-w-[1200px] mx-auto px-6 py-8 md:py-12 pb-28 md:pb-16">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <div className="inline-block px-3.5 py-1 rounded-full bg-[#ede0ff] text-[#7c3aed] font-bold text-xs uppercase tracking-wider mb-3">
          Certified Human Consultants + AI Precision
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111c2d] mb-4 leading-tight max-w-3xl mx-auto">
          Professional Color Analysis for 10x Less
        </h1>
        <p className="text-base sm:text-lg text-[#4a4455] max-w-2xl mx-auto leading-relaxed">
          Get a detailed color analysis from certified color consultants with personalized recommendations for makeup, wardrobe, and styling.
        </p>
      </section>

      {/* Pricing / Comparison Grid */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16 max-w-5xl mx-auto">
        {/* Left Comparison Card */}
        <div className="md:col-span-5 glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-[#e7eeff]">
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#111c2d] mb-6 leading-snug">
              The average cost of professional color analysis in Singapore is S$350*
            </h3>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl sm:text-5xl font-extrabold text-[#7c3aed]">S$49</span>
              <span className="text-sm font-medium text-[#4a4455]">
                Our expert analysis starts from
              </span>
            </div>
          </div>
          <p className="text-[11px] text-[#7b7487] mt-6 italic">
            *Based on average studio rates for professional color analysis in Singapore
          </p>
        </div>

        {/* Right Professional Plan Card */}
        <div className="md:col-span-7 bg-white rounded-2xl p-6 sm:p-8 glowing-elevation border border-[#7c3aed]/30 relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 bg-[#7c3aed] text-white font-bold text-xs px-4 py-1.5 rounded-bl-xl shadow-sm">
            ⭐ Most Popular Choice
          </div>

          <h2 className="text-2xl font-extrabold text-[#111c2d] mb-1 mt-2">
            Professional
          </h2>
          <p className="text-sm text-[#4a4455] mb-6">
            Perfect for getting started with your color journey
          </p>

          <div className="text-4xl font-extrabold text-[#111c2d] mb-6">S$49</div>

          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3 text-sm text-[#111c2d] font-medium">
              <span className="material-symbols-outlined text-[#7c3aed] text-xl">
                check_circle
              </span>
              Results in 24 hours
            </li>
            <li className="flex items-center gap-3 text-sm text-[#111c2d] font-medium">
              <span className="material-symbols-outlined text-[#7c3aed] text-xl">
                palette
              </span>
              Digital color palette (35 colors)
            </li>
            <li className="flex items-center gap-3 text-sm text-[#111c2d] font-medium">
              <span className="material-symbols-outlined text-[#7c3aed] text-xl">
                face_retouching_natural
              </span>
              Personalized makeup recommendations
            </li>
            <li className="flex items-center gap-3 text-sm text-[#111c2d] font-medium">
              <span className="material-symbols-outlined text-[#7c3aed] text-xl">
                styler
              </span>
              Outfit recommendations from preferred brands
            </li>
          </ul>

          <button
            onClick={onOpenBookingModal}
            className="w-full h-14 bg-[#630ed4] text-white font-bold text-base rounded-xl hover:bg-[#5209b5] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 mt-auto"
          >
            Get Your Colors Now
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>

          <div className="flex justify-center gap-6 mt-4 text-xs font-semibold text-[#4a4455]">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">lock</span> Secure payment
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">verified_user</span> Money-back guarantee
            </span>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-12 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-[#111c2d] mb-8">
          Trusted by Color Experts &amp; Fashion Lovers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="glass-card rounded-2xl p-6 border border-[#e7eeff] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-[#F59E0B] mb-3">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-lg"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="text-sm text-[#111c2d] italic leading-relaxed mb-6">
                "The most accurate color analysis app I've ever used. It's transformed how I shop for clothes!"
              </p>
            </div>
            <div>
              <div className="font-bold text-sm text-[#111c2d]">Anna K.</div>
              <div className="text-xs text-[#4a4455]">Professional Color Consultant</div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-card rounded-2xl p-6 border border-[#e7eeff] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-[#F59E0B] mb-3">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-lg"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="text-sm text-[#111c2d] italic leading-relaxed mb-6">
                "Finally found my true colors! The AI analysis was spot-on and now I feel so much more confident in my clothing choices."
              </p>
            </div>
            <div>
              <div className="font-bold text-sm text-[#111c2d]">Sarah M.</div>
              <div className="text-xs text-[#4a4455]">Fashion Blogger</div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass-card rounded-2xl p-6 border border-[#e7eeff] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-[#F59E0B] mb-3">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-lg"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
              <p className="text-sm text-[#111c2d] italic leading-relaxed mb-6">
                "As a makeup artist, I'm impressed by the accuracy. I recommend this to all my clients for finding their perfect makeup shades."
              </p>
            </div>
            <div>
              <div className="font-bold text-sm text-[#111c2d]">Michelle R.</div>
              <div className="text-xs text-[#4a4455]">Professional Makeup Artist</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
