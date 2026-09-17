"use client";

import { useMemo } from "react";
import {
  ObservationChart,
  type ObservationPoint,
} from "@/components/ui/observation-chart";
import type { WeatherDaily, WeatherHourly } from "@/lib/types/weather";
import { toUtcDateFromLocalTime } from "@/lib/utils/timezone";

type HourlyKey =
  | "temperature_2m"
  | "precipitation_probability"
  | "wind_speed_10m"
  | "apparent_temperature";

type DailyKey =
  | "temperature_2m_max"
  | "temperature_2m_min"
  | "precipitation_sum"
  | "precipitation_probability_max";

type BaseChartProps = {
  title?: string;
  timeZone?: string;
  utcOffsetSeconds?: number;
  onRangeChange?: (range: "24h" | "7d") => void;
};

export type WeatherChartProps =
  | (BaseChartProps & {
      range: "24h";
      data: WeatherHourly;
      dataKey: HourlyKey;
    })
  | (BaseChartProps & {
      range: "7d";
      data: WeatherDaily;
      dataKey: DailyKey;
    });

function formatTimeLabel(
  value: string,
  range: "24h" | "7d",
  timeZone?: string,
  utcOffsetSeconds?: number,
) {
  const date = toUtcDateFromLocalTime(value, utcOffsetSeconds);
  if (!date) return value;
  if (Number.isNaN(date.getTime())) return value;

  const options: Intl.DateTimeFormatOptions =
    range === "24h"
      ? { hour: "2-digit", minute: "2-digit" }
      : { month: "numeric", day: "numeric" };

  return new Intl.DateTimeFormat("ja-JP", {
    timeZone,
    ...options,
  }).format(date);
}

export function WeatherChart({
  data,
  range,
  dataKey,
  title,
  timeZone,
  utcOffsetSeconds,
  onRangeChange,
}: WeatherChartProps) {
  const chartData = useMemo<ObservationPoint[]>(() => {
    const times = data.time;
    const values =
      range === "24h"
        ? (data as WeatherHourly)[dataKey as HourlyKey]
        : (data as WeatherDaily)[dataKey as DailyKey];

    return times.map((time, index) => ({
      time: formatTimeLabel(time, range, timeZone, utcOffsetSeconds),
      value: values[index] ?? 0,
    }));
  }, [data, dataKey, range, timeZone, utcOffsetSeconds]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-grid">
        <h3 className="font-display text-eyebrow uppercase text-muted-foreground">
          {title ?? "気温"}
        </h3>
        {onRangeChange ? (
          <div className="flex border border-border">
            {(["24h", "7d"] as const).map((value) => (
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
      <ObservationChart data={chartData} series="chart-1" valueLabel="気温" />
    </div>
  );
}
