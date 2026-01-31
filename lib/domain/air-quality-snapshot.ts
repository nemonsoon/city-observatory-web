import type { AirQualityHourly } from "@/lib/types/air-quality";

type AirQualitySnapshot = {
  pm25: number;
  pm10: number;
  nitrogenDioxide: number;
  ozone: number;
};

function findClosestIndex(times: string[], nowMs: number) {
  let bestIndex = 0;
  let bestDiff = Number.POSITIVE_INFINITY;

  times.forEach((time, index) => {
    const value = new Date(time).getTime();
    const diff = Math.abs(value - nowMs);
    if (diff < bestDiff) {
      bestDiff = diff;
      bestIndex = index;
    }
  });

  return bestIndex;
}

export function getAirQualitySnapshot(
  hourly: AirQualityHourly | undefined,
  nowMs = Date.now(),
): AirQualitySnapshot | undefined {
  if (!hourly || hourly.time.length === 0) return undefined;
  const index = findClosestIndex(hourly.time, nowMs);
  return {
    pm25: hourly.pm2_5[index] ?? 0,
    pm10: hourly.pm10[index] ?? 0,
    nitrogenDioxide: hourly.nitrogen_dioxide[index] ?? 0,
    ozone: hourly.ozone[index] ?? 0,
  };
}
