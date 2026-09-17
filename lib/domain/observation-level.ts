/**
 * 観測値の段階。1が良好、5が危険。
 * DESIGN.md § 2 Level Scale のトークンと1対1で対応する。
 */
export type ObservationLevel = 1 | 2 | 3 | 4 | 5;

/**
 * Tailwind はクラス名を静的に走査するため、動的に組み立てず完全な文字列で持つ。
 */
export const levelTextClass: Record<ObservationLevel, string> = {
  1: "text-level-1",
  2: "text-level-2",
  3: "text-level-3",
  4: "text-level-4",
  5: "text-level-5",
};

export const levelBackgroundClass: Record<ObservationLevel, string> = {
  1: "bg-level-1",
  2: "bg-level-2",
  3: "bg-level-3",
  4: "bg-level-4",
  5: "bg-level-5",
};

/** UV 指数。国際的な区分（0-2 / 3-5 / 6-7 / 8-10 / 11+）に合わせる */
export function uvLevel(index: number): ObservationLevel {
  if (index <= 2) return 1;
  if (index <= 5) return 3;
  if (index <= 7) return 4;
  return 5;
}

/** PM2.5。米国環境保護庁の AQI 区分の境界値に合わせる */
export function pm25Level(pm25: number): ObservationLevel {
  if (pm25 <= 12) return 1;
  if (pm25 <= 35.4) return 3;
  if (pm25 <= 55.4) return 4;
  return 5;
}

/** 快適度スコア。100 に近いほど良好 */
export function comfortLevel(score: number): ObservationLevel {
  if (score >= 80) return 1;
  if (score >= 60) return 2;
  if (score >= 40) return 3;
  if (score >= 20) return 4;
  return 5;
}

/** 風速 m/s。ビューフォート風力階級のうち体感が変わる境界を使う */
export function windLevel(speed: number): ObservationLevel {
  if (speed < 3) return 1;
  if (speed < 8) return 2;
  if (speed < 15) return 3;
  if (speed < 25) return 4;
  return 5;
}

export function outdoorRiskLevel(
  risk: "low" | "medium" | "high",
): ObservationLevel {
  if (risk === "low") return 1;
  if (risk === "medium") return 3;
  return 5;
}

export function comfortLabel(score: number): string {
  if (score >= 80) return "良好";
  if (score >= 60) return "おおむね良好";
  if (score >= 40) return "普通";
  if (score >= 20) return "やや不快";
  return "不快";
}

export function windLabel(speed: number): string {
  if (speed < 3) return "穏やか";
  if (speed < 8) return "やや強い";
  if (speed < 15) return "強い";
  if (speed < 25) return "非常に強い";
  return "暴風";
}
