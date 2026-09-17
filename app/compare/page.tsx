"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { WeatherChart } from "@/features/weather/ui/weather-chart";
import { AQChart } from "@/features/air-quality/ui/aq-chart";
import { MapView } from "@/features/map/ui/map-view";
import { WeatherIcon } from "@/features/weather/ui/weather-icon";
import { GridField } from "@/components/ui/grid-field";
import { LevelTag } from "@/components/ui/level-tag";
import { Panel } from "@/components/ui/panel";
import { Rule } from "@/components/ui/rule";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useCityDashboard } from "@/lib/hooks/use-city-dashboard";
import { getAirQualityLabelText } from "@/lib/domain/air-quality-label";
import {
  comfortLabel,
  comfortLevel,
  pm25Level,
  windLabel,
  windLevel,
  type ObservationLevel,
} from "@/lib/domain/observation-level";
import { cities, type City } from "@/lib/constants/cities";
import { cn } from "@/lib/utils";

type Station = ReturnType<typeof useCityDashboard>;

type ComparisonRow = {
  label: string;
  unit?: string;
  /** 差を出さない指標は undefined を返す */
  value: (station: Station) => number | undefined;
  digits: number;
  tag?: (station: Station) => { level: ObservationLevel; label: string };
};

const rows: ComparisonRow[] = [
  {
    label: "気温",
    unit: "℃",
    value: (s) => s.weatherView?.snapshot.temperature,
    digits: 1,
  },
  {
    label: "体感",
    unit: "℃",
    value: (s) => s.weatherView?.snapshot.apparentTemperature,
    digits: 1,
  },
  {
    label: "湿度",
    unit: "%",
    value: (s) => s.weatherView?.snapshot.humidity,
    digits: 0,
  },
  {
    label: "降水確率",
    unit: "%",
    value: (s) => s.weatherView?.snapshot.precipitationProbability,
    digits: 0,
  },
  {
    label: "風速",
    unit: "m/s",
    value: (s) => s.weatherView?.snapshot.windSpeed,
    digits: 1,
    tag: (s) => {
      const speed = s.weatherView?.snapshot.windSpeed ?? 0;
      return { level: windLevel(speed), label: windLabel(speed) };
    },
  },
  {
    label: "UV 指数",
    value: (s) => s.weatherView?.snapshot.uvIndex,
    digits: 1,
    tag: (s) => ({
      level: s.weatherView?.uvClassification.severity ?? 1,
      label: s.weatherView?.uvClassification.label ?? "不明",
    }),
  },
  {
    label: "PM2.5",
    unit: "µg/m³",
    value: (s) => s.airSnapshot?.pm25,
    digits: 1,
    tag: (s) => {
      const pm25 = s.airSnapshot?.pm25 ?? 0;
      return { level: pm25Level(pm25), label: getAirQualityLabelText(pm25) };
    },
  },
  {
    label: "快適度",
    unit: "/100",
    value: (s) => s.comfortScore,
    digits: 0,
    tag: (s) => ({
      level: comfortLevel(s.comfortScore),
      label: comfortLabel(s.comfortScore),
    }),
  },
];

function CitySelect({
  label,
  selectedId,
  onSelect,
}: {
  label: string;
  selectedId: number;
  onSelect: (id: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-display text-eyebrow uppercase text-muted-foreground">
        {label}
      </span>
      <nav className="flex flex-wrap border border-border" aria-label={label}>
        {cities.map((city) => (
          <button
            key={city.id}
            type="button"
            onClick={() => onSelect(city.id)}
            aria-pressed={selectedId === city.id}
            className={cn(
              "border-l border-border px-3 py-1.5 text-note transition-colors first:border-l-0",
              selectedId === city.id
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {city.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

function StationHeading({ city, station }: { city: City; station: Station }) {
  const classification = station.weatherView?.weatherClassification;
  return (
    <div className="flex items-center gap-2">
      {classification ? (
        <WeatherIcon
          iconKey={classification.iconKey}
          label={classification.label}
          className="size-4 text-muted-foreground"
        />
      ) : null}
      <span className="text-heading font-medium">{city.label}</span>
      {classification ? (
        <span className="text-note text-muted-foreground">
          {classification.label}
        </span>
      ) : null}
    </div>
  );
}

function Reading({
  value,
  unit,
  digits,
}: {
  value: number | undefined;
  unit?: string;
  digits: number;
}) {
  if (value === undefined) {
    return <span className="font-mono text-muted-foreground">—</span>;
  }
  return (
    <span className="flex items-baseline justify-end font-mono">
      {value.toFixed(digits)}
      {unit ? (
        <span className="ml-1 font-display text-eyebrow text-muted-foreground">
          {unit}
        </span>
      ) : null}
    </span>
  );
}

export default function ComparePage() {
  const [leftCityId, setLeftCityId] = useState<number>(cities[0].id);
  const [rightCityId, setRightCityId] = useState<number>(cities[1].id);

  const leftCity = cities.find((city) => city.id === leftCityId) ?? cities[0];
  const rightCity = cities.find((city) => city.id === rightCityId) ?? cities[1];

  const left = useCityDashboard(leftCity);
  const right = useCityDashboard(rightCity);

  return (
    <div className="relative min-h-screen">
      <GridField />

      <div className="mx-auto flex min-h-screen w-full max-w-sheet flex-col px-grid py-grid md:px-9 lg:px-12">
        <header className="flex flex-col gap-grid pb-grid md:flex-row md:items-center md:justify-between">
          <p className="font-display text-eyebrow uppercase">
            City Observatory
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-1.5 border border-border px-3 py-1.5 text-note text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" aria-hidden />
              1都市を詳しく見る
            </Link>
            <ThemeToggle />
          </div>
        </header>

        <Rule weight="heavy" />

        <section className="grid gap-grid py-grid md:grid-cols-2">
          <CitySelect
            label="左の観測地点"
            selectedId={leftCityId}
            onSelect={setLeftCityId}
          />
          <CitySelect
            label="右の観測地点"
            selectedId={rightCityId}
            onSelect={setRightCityId}
          />
        </section>

        <Rule className="stagger-2" />

        <section className="animate-reading-in stagger-3 py-grid">
          <table className="w-full border-collapse">
            <caption className="sr-only">
              {leftCity.label}と{rightCity.label}の観測値
            </caption>
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="w-1/4 py-2 text-left">
                  <span className="font-display text-eyebrow uppercase text-muted-foreground">
                    観測値
                  </span>
                </th>
                <th scope="col" className="py-2 text-right">
                  <StationHeading city={leftCity} station={left} />
                </th>
                <th scope="col" className="py-2 text-right">
                  <StationHeading city={rightCity} station={right} />
                </th>
                <th scope="col" className="w-1/6 py-2 text-right">
                  <span className="font-display text-eyebrow uppercase text-muted-foreground">
                    差
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const leftValue = row.value(left);
                const rightValue = row.value(right);
                const difference =
                  leftValue !== undefined && rightValue !== undefined
                    ? rightValue - leftValue
                    : undefined;

                return (
                  <tr key={row.label} className="border-b border-border">
                    <th scope="row" className="py-2.5 text-left">
                      <span className="text-note text-muted-foreground">
                        {row.label}
                      </span>
                    </th>
                    <td className="py-2.5 text-right">
                      <Reading
                        value={leftValue}
                        unit={row.unit}
                        digits={row.digits}
                      />
                      {row.tag ? (
                        <LevelTag
                          className="mt-1 justify-end"
                          {...row.tag(left)}
                        />
                      ) : null}
                    </td>
                    <td className="py-2.5 text-right">
                      <Reading
                        value={rightValue}
                        unit={row.unit}
                        digits={row.digits}
                      />
                      {row.tag ? (
                        <LevelTag
                          className="mt-1 justify-end"
                          {...row.tag(right)}
                        />
                      ) : null}
                    </td>
                    <td className="py-2.5 text-right font-mono text-note text-muted-foreground">
                      {difference === undefined
                        ? "—"
                        : `${difference > 0 ? "+" : ""}${difference.toFixed(row.digits)}`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        <section className="animate-reading-in stagger-4 grid gap-grid py-grid lg:grid-cols-2">
          <Panel label={`気温の推移 — ${leftCity.label}`}>
            {left.weatherQuery.data?.hourly ? (
              <WeatherChart
                range="24h"
                data={left.weatherQuery.data.hourly}
                dataKey="temperature_2m"
                timeZone={left.weatherQuery.data.timezone ?? leftCity.timezone}
                utcOffsetSeconds={left.weatherQuery.data.utc_offset_seconds}
              />
            ) : (
              <div className="h-65 w-full animate-pulse bg-muted" />
            )}
          </Panel>

          <Panel label={`気温の推移 — ${rightCity.label}`}>
            {right.weatherQuery.data?.hourly ? (
              <WeatherChart
                range="24h"
                data={right.weatherQuery.data.hourly}
                dataKey="temperature_2m"
                timeZone={
                  right.weatherQuery.data.timezone ?? rightCity.timezone
                }
                utcOffsetSeconds={right.weatherQuery.data.utc_offset_seconds}
              />
            ) : (
              <div className="h-65 w-full animate-pulse bg-muted" />
            )}
          </Panel>

          <Panel label={`PM2.5 の推移 — ${leftCity.label}`}>
            {left.airSeries ? (
              <AQChart
                data={left.airSeries}
                dataKey="pm2_5"
                range="24h"
                timeZone={left.airQuery.data?.timezone ?? leftCity.timezone}
                utcOffsetSeconds={left.airQuery.data?.utc_offset_seconds}
              />
            ) : (
              <div className="h-65 w-full animate-pulse bg-muted" />
            )}
          </Panel>

          <Panel label={`PM2.5 の推移 — ${rightCity.label}`}>
            {right.airSeries ? (
              <AQChart
                data={right.airSeries}
                dataKey="pm2_5"
                range="24h"
                timeZone={right.airQuery.data?.timezone ?? rightCity.timezone}
                utcOffsetSeconds={right.airQuery.data?.utc_offset_seconds}
              />
            ) : (
              <div className="h-65 w-full animate-pulse bg-muted" />
            )}
          </Panel>
        </section>

        <section className="animate-reading-in stagger-5 pb-grid">
          <Panel label="位置関係" bodyClassName="p-0">
            <div className="h-100">
              <MapView
                center={[
                  (leftCity.lon + rightCity.lon) / 2,
                  (leftCity.lat + rightCity.lat) / 2,
                ]}
                zoom={4}
                markers={[
                  {
                    lng: leftCity.lon,
                    lat: leftCity.lat,
                    label: leftCity.label,
                  },
                  {
                    lng: rightCity.lon,
                    lat: rightCity.lat,
                    label: rightCity.label,
                  },
                ]}
                overlay="none"
              />
            </div>
          </Panel>
        </section>
      </div>
    </div>
  );
}
