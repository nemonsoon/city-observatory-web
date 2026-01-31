export type AirQualityLabel = "good" | "moderate" | "unhealthy" | "hazardous";

// PM2.5 の24時間平均における一般的なブレークポイントを目安にした簡易区分
export function classifyAirQualityLabel(pm25: number): AirQualityLabel {
  if (pm25 <= 12) return "good";
  if (pm25 <= 35.4) return "moderate";
  if (pm25 <= 55.4) return "unhealthy";
  return "hazardous";
}
