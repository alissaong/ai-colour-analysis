export type TabType = 'home' | 'aitool' | 'results';

export interface ColorSwatch {
  name: string;
  hex: string;
  description?: string;
}

export interface AvoidColor {
  name: string;
  hex: string;
  reason?: string;
}

export interface MakeupRecommendation {
  category: 'Lipstick' | 'Blush' | 'Eyeshadow' | 'Bronzer' | 'Eyeliner';
  shadeName: string;
  hex: string;
  notes: string;
}

export interface OutfitIdea {
  style: string;
  colors: string[];
  tip: string;
}

export interface AnalysisResult {
  season: string;
  headline: string;
  description: string;
  undertone: 'Warm' | 'Cool' | 'Neutral' | 'Olive' | 'Warm-Neutral' | 'Cool-Neutral' | string;
  contrast: 'High' | 'Medium' | 'Low' | 'Medium-Low' | 'Low-Medium' | string;
  bestColors: ColorSwatch[];
  avoidColors: AvoidColor[];
  makeupRecommendations?: MakeupRecommendation[];
  outfitIdeas?: OutfitIdea[];
  celebrityMatches?: string[];
  photoUrl?: string;
  modelUsed?: string;
  confidence?: number;
  topPredictions?: { className: string; probability: number }[];
}

export interface SamplePhoto {
  id: string;
  name: string;
  url: string;
  season: string;
  skinHex: string;
  hairHex: string;
  eyeHex: string;
}
