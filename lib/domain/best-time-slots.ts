type TimeSlot = {
  startTime: string;
  endTime: string;
  score: number;
};

// 体感スコアの高い時間帯を優先して抽出し、行動候補を少数に絞るための簡易ロジック
export function findBestTimeSlots(
  times: string[],
  scores: number[],
  limit = 3,
): TimeSlot[] {
  const entries = times.map((time, index) => ({
    time,
    score: scores[index] ?? 0,
  }));

  const sorted = [...entries].sort((a, b) => b.score - a.score);
  const result: TimeSlot[] = [];

  for (const entry of sorted) {
    if (result.length >= limit) break;
    const startTime = entry.time;
    // 1時間刻みの予報データを前提に、スロットを1時間幅で扱う
    const endTime = new Date(
      new Date(entry.time).getTime() + 60 * 60 * 1000,
    ).toISOString();
    result.push({ startTime, endTime, score: entry.score });
  }

  return result;
}
