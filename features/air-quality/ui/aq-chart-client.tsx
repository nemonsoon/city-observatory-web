"use client";

import { useMemo } from "react";
import {
  ObservationChart,
  type ObservationPoint,
} from "@/components/ui/observation-chart";
import type { AirQualityHourly } from "@/lib/types/air-quality";
import { toUtcDateFromLocalTime } from "@/lib/utils/timezone";

type AQKey = "pm2_5" | "pm10" | "nitrogen_dioxide" | "ozone";

type AQChartProps = {
  data: AirQualityHourly;
  dataKey: AQKey;
  range: "24h" | "5d";
  title?: string;
  timeZone?: string;
  utcOffsetSeconds?: number;
  onRangeChange?: (range: "24h" | "5d") => void;
};

function formatTimeLabel(
  value: string,
  range: "24h" | "5d",
  timeZone?: string,
  utcOffsetSeconds?: number,
) {
  const date = toUtcDateFromLocalTime(value, utcOffsetSeconds);
  if (!date || Number.isNaN(date.getTime())) return value;

  const options: Intl.DateTimeFormatOptions =
    range === "24h"
      ? { hour: "2-digit", minute: "2-digit" }
      : { month: "numeric", day: "numeric" };

  return new Intl.DateTimeFormat("ja-JP", {
    timeZone,
    ...options,
  }).format(date);
}

export function AQChart({
  data,
  dataKey,
  range,
  title,
  timeZone,
  utcOffsetSeconds,
  onRangeChange,
}: AQChartProps) {
  const chartData = useMemo<ObservationPoint[]>(() => {
    const values = data[dataKey];
    return data.time.map((time, index) => ({
      time: formatTimeLabel(time, range, timeZone, utcOffsetSeconds),
      value: values[index] ?? 0,
    }));
  }, [data, dataKey, range, timeZone, utcOffsetSeconds]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-grid">
        <h3 className="font-display text-eyebrow uppercase text-muted-foreground">
          {title ?? "PM2.5"}
        </h3>
        {onRangeChange ? (
          <div className="flex border border-border">
            {(["24h", "5d"] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => onRangeChange(value)}
                aria-pressed={range === value}
                className={
                  range === value
                    ? "border-l border-border bg-foreground px-2 py-0.5 text-note text-background first:border-l-0"
                    : "border-l border-border px-2 py-0.5 text-note text-muted-foreground transition-colors first:border-l-0 hover:text-foreground"
                }
              >
                {value}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <ObservationChart data={chartData} series="chart-3" valueLabel="PM2.5" />
    </div>
  );
}
