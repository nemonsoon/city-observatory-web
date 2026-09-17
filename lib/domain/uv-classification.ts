import type { ObservationLevel } from "@/lib/domain/observation-level";

export type UVLevel = "low" | "moderate" | "high" | "very-high" | "extreme";

export type UVClassification = {
  level: UVLevel;
  label: string;
  severity: ObservationLevel;
};

const uvLabels: Record<UVLevel, string> = {
  low: "低い",
  moderate: "中程度",
  high: "高い",
  "very-high": "非常に高い",
  extreme: "極端に高い",
};

const uvSeverities: Record<UVLevel, ObservationLevel> = {
  low: 1,
  moderate: 3,
  high: 4,
  "very-high": 5,
  extreme: 5,
};

export function classifyUVIndex(index: number): UVLevel {
  // 国際的に一般的なUV Indexの区分（0-2/3-5/6-7/8-10/11+）
  if (index <= 2) return "low";
  if (index <= 5) return "moderate";
  if (index <= 7) return "high";
  if (index <= 10) return "very-high";
  return "extreme";
}

export function getUVClassification(index: number): UVClassification {
  const level = classifyUVIndex(index);
  return {
    level,
    label: uvLabels[level],
    severity: uvSeverities[level],
  };
}

export function getUVLabel(index: number): string {
  return uvLabels[classifyUVIndex(index)];
}
