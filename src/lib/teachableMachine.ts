import * as tmImage from '@teachablemachine/image';

export interface TeachablePrediction {
  className: string;
  probability: number;
}

export const DEFAULT_TEACHABLE_MODEL_URL = 'https://teachablemachine.withgoogle.com/models/OMNGo38it/';

const labelMapping: Record<string, string> = {
  'Bright Winter': 'Clear Winter',
  'Dark Winter': 'Deep Winter',
  'Dark Autumn': 'Deep Autumn',
  'Bright Spring': 'Clear Spring',
};

export async function predictSeasonalColor(
  imageUrl: string,
  modelBaseUrl: string = DEFAULT_TEACHABLE_MODEL_URL
): Promise<{ predictedSeason: string; confidence: number; predictions: TeachablePrediction[] }> {
  const baseUrl = modelBaseUrl.trim().endsWith('/') ? modelBaseUrl.trim() : `${modelBaseUrl.trim()}/`;
  const modelURL = `${baseUrl}model.json`;
  const metadataURL = `${baseUrl}metadata.json`;

  const model = await tmImage.load(modelURL, metadataURL);

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = async () => {
      try {
        const rawPredictions = await model.predict(img);
        const sorted = rawPredictions.sort((a, b) => b.probability - a.probability);
        const top = sorted[0];

        const mappedSeason = labelMapping[top.className] || top.className;

        resolve({
          predictedSeason: mappedSeason,
          confidence: top.probability,
          predictions: sorted.map((p) => ({
            className: labelMapping[p.className] || p.className,
            probability: p.probability,
          })),
        });
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = () => {
      // If CORS or image load error, create a canvas to draw image without crossOrigin restrictions if data URL or handle
      reject(new Error('Unable to load photo into Teachable Machine classifier.'));
    };
    img.src = imageUrl;
  });
}
