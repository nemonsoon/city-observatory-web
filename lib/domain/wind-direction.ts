const windDirectionLabels = [
  "北",
  "北北東",
  "北東",
  "東北東",
  "東",
  "東南東",
  "南東",
  "南南東",
  "南",
  "南南西",
  "南西",
  "西南西",
  "西",
  "西北西",
  "北西",
  "北北西",
];

function normalizeDegree(degree: number): number {
  const normalized = degree % 360;
  return normalized < 0 ? normalized + 360 : normalized;
}

function getWindDirectionIndex(degree: number): number {
  const normalized = normalizeDegree(degree);
  // 16方位（360/16=22.5°）の中心に合わせるため11.25°オフセット
  return Math.floor((normalized + 11.25) / 22.5) % 16;
}

export function getWindDirectionLabel(degree: number): string {
  return windDirectionLabels[getWindDirectionIndex(degree)];
}

export function getWindDirectionRotation(degree: number): number {
  return normalizeDegree(degree);
}
