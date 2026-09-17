export type AirQualityLabel = "good" | "moderate" | "unhealthy" | "hazardous";

// 環境省の環境基準（年平均 15・日平均 35）と注意喚起の暫定指針値（日平均 70 超）を境界に使う。
// 日本には多段階の公的な区分がないため、公的な数値3つを4段階に割り当てた簡易区分
export function classifyAirQualityLabel(pm25: number): AirQualityLabel {
  if (pm25 <= 15) return "good";
  if (pm25 <= 35) return "moderate";
  if (pm25 <= 70) return "unhealthy";
  return "hazardous";
}

const airQualityLabelText: Record<AirQualityLabel, string> = {
  good: "良好",
  moderate: "普通",
  unhealthy: "悪い",
  hazardous: "危険",
};

export function getAirQualityLabelText(pm25: number): string {
  return airQualityLabelText[classifyAirQualityLabel(pm25)];
}
