import type { ObservationLevel } from "@/lib/domain/observation-level";

export type WeatherCondition =
  | "clear"
  | "mostly-clear"
  | "partly-cloudy"
  | "overcast"
  | "fog"
  | "drizzle"
  | "rain"
  | "snow"
  | "rain-showers"
  | "snow-showers"
  | "thunderstorm"
  | "unknown";

export type WeatherIconKey =
  | "sun"
  | "cloud-sun"
  | "cloud"
  | "cloud-fog"
  | "cloud-drizzle"
  | "cloud-rain"
  | "cloud-snow"
  | "cloud-lightning"
  | "cloud-alert";

type WeatherClassification = {
  condition: WeatherCondition;
  label: string;
  iconKey: WeatherIconKey;
  severity: ObservationLevel;
};

const weatherLabels: Record<WeatherCondition, string> = {
  clear: "快晴",
  "mostly-clear": "晴れ",
  "partly-cloudy": "薄曇り",
  overcast: "曇り",
  fog: "霧",
  drizzle: "霧雨",
  rain: "雨",
  snow: "雪",
  "rain-showers": "にわか雨",
  "snow-showers": "にわか雪",
  thunderstorm: "雷雨",
  unknown: "不明",
};

const weatherIcons: Record<WeatherCondition, WeatherIconKey> = {
  clear: "sun",
  "mostly-clear": "sun",
  "partly-cloudy": "cloud-sun",
  overcast: "cloud",
  fog: "cloud-fog",
  drizzle: "cloud-drizzle",
  rain: "cloud-rain",
  snow: "cloud-snow",
  "rain-showers": "cloud-rain",
  "snow-showers": "cloud-snow",
  thunderstorm: "cloud-lightning",
  unknown: "cloud-alert",
};

// 天気の深刻度。DESIGN.md § 2 Level Scale に対応する
const weatherSeverities: Record<WeatherCondition, ObservationLevel> = {
  clear: 1,
  "mostly-clear": 1,
  "partly-cloudy": 2,
  overcast: 2,
  fog: 3,
  drizzle: 2,
  rain: 3,
  snow: 3,
  "rain-showers": 4,
  "snow-showers": 4,
  thunderstorm: 5,
  unknown: 2,
};

export function getWeatherCondition(code: number): WeatherCondition {
  // Open-Meteoのweathercode定義に合わせた分類
  if (code === 0) return "clear";
  if (code === 1) return "mostly-clear";
  if (code === 2) return "partly-cloudy";
  if (code === 3) return "overcast";
  if (code === 45 || code === 48) return "fog";
  if (code >= 51 && code <= 55) return "drizzle";
  if (code >= 61 && code <= 65) return "rain";
  if (code >= 71 && code <= 75) return "snow";
  if (code >= 80 && code <= 82) return "rain-showers";
  if (code >= 85 && code <= 86) return "snow-showers";
  if (code >= 95 && code <= 99) return "thunderstorm";
  return "unknown";
}

export function getWeatherClassification(code: number): WeatherClassification {
  const condition = getWeatherCondition(code);
  return {
    condition,
    label: weatherLabels[condition],
    iconKey: weatherIcons[condition],
    severity: weatherSeverities[condition],
  };
}

export function getWeatherLabel(code: number): string {
  return weatherLabels[getWeatherCondition(code)];
}

export function getWeatherIconKey(code: number): string {
  return weatherIcons[getWeatherCondition(code)];
}
