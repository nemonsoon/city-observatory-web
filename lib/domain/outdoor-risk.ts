type OutdoorRiskInput = {
  precipitationProbability: number;
  windSpeed: number;
  pm25: number;
};

// 外出リスクを大まかに3段階で示すための簡易スコア
export function calculateOutdoorRisk(
  input: OutdoorRiskInput,
): "low" | "medium" | "high" {
  // 雨を最重視しつつ、風とPM2.5を補助的に効かせる配分
  const score =
    input.precipitationProbability * 0.6 +
    input.windSpeed * 5 +
    input.pm25 * 0.4;

  // UI上の低/中/高を分けるための経験的な区切り
  if (score < 35) return "low";
  if (score < 70) return "medium";
  return "high";
}
