"use client";

import { useState } from "react";
import { WeatherChart } from "@/features/weather/ui/weather-chart";
import { AQChart } from "@/features/air-quality/ui/aq-chart";
import { cn } from "@/lib/utils";
import type { WeatherHourly } from "@/lib/types/weather";
import type { AirQualityHourly } from "@/lib/types/air-quality";

type ChartTabsProps = {
  weatherHourly?: WeatherHourly;
  weatherTimeZone: string;
  weatherUtcOffset?: number;
  airSeries?: AirQualityHourly;
  airTimeZone: string;
  airUtcOffset?: number;
  isAirFetching: boolean;
};

const tabs = [
  { key: "temp", label: "気温" },
  { key: "pm25", label: "PM2.5" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

export function ChartTabs({
  weatherHourly,
  weatherTimeZone,
  weatherUtcOffset,
  airSeries,
  airTimeZone,
  airUtcOffset,
  isAirFetching,
}: ChartTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("temp");

  return (
    <div>
      <div
        className="mb-grid flex w-fit border border-border"
        role="tablist"
        aria-label="表示する観測値"
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "border-l border-border px-3 py-1 text-note transition-colors first:border-l-0",
              activeTab === tab.key
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {activeTab === "temp" ? (
        weatherHourly ? (
          <WeatherChart
            range="24h"
            data={weatherHourly}
            dataKey="temperature_2m"
            timeZone={weatherTimeZone}
            utcOffsetSeconds={weatherUtcOffset}
          />
        ) : (
          <div className="h-65 w-full animate-pulse bg-muted" />
        )
      ) : airSeries && !isAirFetching ? (
        <AQChart
          data={airSeries}
          dataKey="pm2_5"
          range="24h"
          timeZone={airTimeZone}
          utcOffsetSeconds={airUtcOffset}
        />
      ) : (
        <div className="h-65 w-full animate-pulse bg-muted" />
      )}
    </div>
  );
}
