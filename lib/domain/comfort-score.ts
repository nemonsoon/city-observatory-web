type ComfortScoreInput = {
  temperature: number;
  humidity: number;
  windSpeed: number;
  precipitationProbability: number;
  pm25: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

// 体感の良さを相対的に並べるための簡易スコア（0-100想定）
export function calculateComfortScore(input: ComfortScoreInput) {
  // 22℃/湿度50%を快適中心として扱い、乖離を罰点化する
  const temperaturePenalty = Math.abs(input.temperature - 22) * 2.2;
  const humidityPenalty = Math.abs(input.humidity - 50) * 0.6;
  // 風は体感低下が出始める3m/s以降のみ罰点化
  const windPenalty = Math.max(input.windSpeed - 3, 0) * 4;
  // 降水確率は外出判断への影響が大きいため緩めの重みで反映
  const rainPenalty = input.precipitationProbability * 0.15;
  // PM2.5は一般的な良好域(12)を超えた分のみ罰点化
  const airPenalty = Math.max(input.pm25 - 12, 0) * 0.6;

  const score =
    100 -
    temperaturePenalty -
    humidityPenalty -
    windPenalty -
    rainPenalty -
    airPenalty;

  return clamp(Math.round(score), 0, 100);
}
