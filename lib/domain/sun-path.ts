type SunPhase = "night" | "dawn" | "day" | "dusk";

const phases: Array<{
  phase: SunPhase;
  label: string;
  background: string;
}> = [
  {
    phase: "night",
    label: "夜",
    background: "linear-gradient(to bottom, #0f172a, #1e293b)",
  },
  {
    phase: "dawn",
    label: "朝焼け",
    background: "linear-gradient(to bottom, #fca5a5, #fde68a)",
  },
  {
    phase: "day",
    label: "日中",
    background: "linear-gradient(to bottom, #93c5fd, #e0f2fe)",
  },
  {
    phase: "dusk",
    label: "夕焼け",
    background: "linear-gradient(to bottom, #fdba74, #f87171)",
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function getSunProgress(now: Date, sunrise: Date, sunset: Date): number {
  const nowTime = now.getTime();
  const sunriseTime = sunrise.getTime();
  const sunsetTime = sunset.getTime();

  if (nowTime <= sunriseTime) return 0;
  if (nowTime >= sunsetTime) return 1;

  const progress = (nowTime - sunriseTime) / (sunsetTime - sunriseTime);
  return clamp(progress, 0, 1);
}

export function getSunPhase(now: Date, sunrise: Date, sunset: Date): SunPhase {
  const nowTime = now.getTime();
  const sunriseTime = sunrise.getTime();
  const sunsetTime = sunset.getTime();

  if (nowTime < sunriseTime) return "night";
  // 日の出/日の入り前後1時間を朝焼け・夕焼けの演出帯として扱う
  if (nowTime < sunriseTime + 60 * 60 * 1000) return "dawn";
  if (nowTime < sunsetTime - 60 * 60 * 1000) return "day";
  if (nowTime < sunsetTime) return "dusk";
  return "night";
}

export function getSunPhaseLabel(phase: SunPhase): string {
  const found = phases.find((item) => item.phase === phase);
  return found?.label ?? "夜";
}

export function getSunPhaseBackground(phase: SunPhase): string {
  const found = phases.find((item) => item.phase === phase);
  return found?.background ?? phases[0].background;
}
