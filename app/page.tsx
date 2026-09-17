"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MapView } from "@/features/map/ui/map-view";
import { MapOverlayToggle } from "@/features/map/ui/map-overlay-toggle";
import { UVCard } from "@/features/weather/ui/uv-card";
import { WindCard } from "@/features/weather/ui/wind-card";
import { SunPathBand } from "@/features/weather/ui/sun-path-band";
import { AirQualityCard } from "@/features/air-quality/ui/air-quality-card";
import { ComfortSummaryCard } from "@/features/derived-metrics/ui/comfort-summary-card";
import { OutdoorRiskCard } from "@/features/derived-metrics/ui/outdoor-risk-card";
import { GridField } from "@/components/ui/grid-field";
import { Panel } from "@/components/ui/panel";
import { Rule } from "@/components/ui/rule";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { HeroSection } from "@/components/layout/hero-section";
import { ChartTabs } from "@/components/layout/chart-tabs";
import { SiteFooter } from "@/components/layout/site-footer";
import { useCityDashboard } from "@/lib/hooks/use-city-dashboard";
import { cities } from "@/lib/constants/cities";
import { cn } from "@/lib/utils";

const defaultCityId = cities[0].id;

export default function Home() {
  const [selectedCityId, setSelectedCityId] = useState<number>(defaultCityId);
  const [mapOverlay, setMapOverlay] = useState<"none" | "precipitation">(
    "none",
  );

  const activeCity =
    cities.find((city) => city.id === selectedCityId) ?? cities[0];

  const {
    weatherQuery,
    airQuery,
    weatherView,
    airSnapshot,
    comfortScore,
    outdoorRiskLevel,
    airSeries,
  } = useCityDashboard(activeCity);

  const isWeatherLoading = weatherQuery.isLoading;
  const isAirLoading = airQuery.isLoading;

  return (
    <div className="relative min-h-screen">
      <GridField />

      <div className="mx-auto flex min-h-screen w-full max-w-sheet flex-col px-grid py-grid md:px-9 lg:px-12">
        <header className="flex flex-col gap-grid pb-grid md:flex-row md:items-center md:justify-between">
          <p className="font-display text-eyebrow uppercase">
            City Observatory
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <nav
              className="flex flex-wrap border border-border"
              aria-label="観測地点"
            >
              {cities.map((city) => (
                <button
                  key={city.id}
                  type="button"
                  onClick={() => setSelectedCityId(city.id)}
                  aria-pressed={selectedCityId === city.id}
                  className={cn(
                    "border-l border-border px-3 py-1.5 text-note transition-colors first:border-l-0",
                    selectedCityId === city.id
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {city.label}
                </button>
              ))}
            </nav>

            <Link
              href="/compare"
              className="flex items-center gap-1.5 border border-border px-3 py-1.5 text-note text-muted-foreground transition-colors hover:text-foreground"
            >
              2都市を比べる
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>

            <ThemeToggle />
          </div>
        </header>

        <Rule weight="heavy" />

        <section className="py-grid">
          <HeroSection
            station={activeCity}
            snapshot={{
              temperature: weatherView?.snapshot.temperature ?? 0,
              apparentTemperature:
                weatherView?.snapshot.apparentTemperature ?? 0,
              humidity: weatherView?.snapshot.humidity ?? 0,
              windSpeed: weatherView?.snapshot.windSpeed ?? 0,
              precipitationProbability:
                weatherView?.snapshot.precipitationProbability ?? 0,
            }}
            weatherClassification={weatherView?.weatherClassification}
            timeZone={activeCity.timezone}
            isLoading={isWeatherLoading}
          />
        </section>

        <Rule className="stagger-3" />

        <section className="animate-reading-in stagger-4 grid grid-cols-2 divide-x divide-y divide-border sm:grid-cols-3 lg:grid-cols-5 lg:divide-y-0">
          <UVCard
            uvIndex={weatherView?.snapshot.uvIndex ?? 0}
            label={weatherView?.uvClassification.label ?? "不明"}
            severity={weatherView?.uvClassification.severity ?? 1}
            isLoading={isWeatherLoading}
          />
          <ComfortSummaryCard
            comfortScore={comfortScore}
            isLoading={isWeatherLoading || isAirLoading}
          />
          <OutdoorRiskCard
            risk={outdoorRiskLevel}
            isLoading={isWeatherLoading || isAirLoading}
          />
          <WindCard
            windSpeed={weatherView?.snapshot.windSpeed ?? 0}
            windDirection={weatherView?.windDirectionRotation ?? 0}
            directionLabel={weatherView?.windDirectionLabel ?? "不明"}
            isLoading={isWeatherLoading}
          />
          <AirQualityCard
            pm25={airSnapshot?.pm25 ?? 0}
            isLoading={isAirLoading}
          />
        </section>

        <Rule className="stagger-5" />

        {weatherView?.sunriseAt && weatherView.sunsetAt ? (
          <>
            <section className="animate-reading-in stagger-5 py-grid">
              <SunPathBand
                sunrise={weatherView.sunriseAt.toLocaleTimeString("ja-JP", {
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZone: weatherView.timeZone,
                })}
                sunset={weatherView.sunsetAt.toLocaleTimeString("ja-JP", {
                  hour: "2-digit",
                  minute: "2-digit",
                  timeZone: weatherView.timeZone,
                })}
                progress={weatherView.sunProgress}
                phaseLabel={weatherView.sunPhaseLabel}
              />
            </section>
            <Rule className="stagger-6" />
          </>
        ) : null}

        <section className="animate-reading-in stagger-6 grid gap-grid py-grid lg:grid-cols-2">
          <Panel label="24時間の推移">
            <ChartTabs
              weatherHourly={weatherQuery.data?.hourly}
              weatherTimeZone={
                weatherQuery.data?.timezone ?? activeCity.timezone
              }
              weatherUtcOffset={weatherQuery.data?.utc_offset_seconds}
              airSeries={airSeries}
              airTimeZone={airQuery.data?.timezone ?? activeCity.timezone}
              airUtcOffset={airQuery.data?.utc_offset_seconds}
              isAirFetching={airQuery.isFetching}
            />
          </Panel>

          <Panel
            label="観測地点"
            bodyClassName="p-0"
            action={
              <MapOverlayToggle value={mapOverlay} onChange={setMapOverlay} />
            }
          >
            <div className="h-full min-h-90">
              <MapView
                center={[activeCity.lon, activeCity.lat]}
                zoom={10}
                markers={[
                  {
                    lng: activeCity.lon,
                    lat: activeCity.lat,
                    label: activeCity.label,
                  },
                ]}
                overlay={mapOverlay}
              />
            </div>
          </Panel>
        </section>

        <SiteFooter />
      </div>
    </div>
  );
}
