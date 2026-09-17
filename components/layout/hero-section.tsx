import { WeatherIcon } from "@/features/weather/ui/weather-icon";
import { RealtimeClock } from "@/components/ui/realtime-clock";
import { Rule } from "@/components/ui/rule";
import type { WeatherIconKey } from "@/lib/domain/weather-classification";

type WeatherSnapshot = {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  precipitationProbability: number;
};

type WeatherClassification = {
  iconKey: WeatherIconKey;
  label: string;
};

type Station = {
  label: string;
  lat: number;
  lon: number;
};

type HeroSectionProps = {
  station: Station;
  snapshot: WeatherSnapshot;
  weatherClassification?: WeatherClassification;
  timeZone: string;
  isLoading: boolean;
};

function formatCoordinate(value: number, positive: string, negative: string) {
  const hemisphere = value >= 0 ? positive : negative;
  return `${Math.abs(value).toFixed(2)}°${hemisphere}`;
}

export function HeroSection({
  station,
  snapshot,
  weatherClassification,
  timeZone,
  isLoading,
}: HeroSectionProps) {
  return (
    <div className="flex flex-col gap-grid">
      <div className="flex flex-wrap items-baseline justify-between gap-x-grid gap-y-2">
        <div className="flex items-baseline gap-3">
          <h1 className="text-heading font-medium">{station.label}</h1>
          <span className="font-mono text-eyebrow text-muted-foreground">
            {formatCoordinate(station.lat, "N", "S")}{" "}
            {formatCoordinate(station.lon, "E", "W")}
          </span>
        </div>
        <RealtimeClock timeZone={timeZone} />
      </div>

      <Rule />

      {isLoading ? (
        <div className="flex flex-col gap-3">
          <div className="h-16 w-48 animate-pulse bg-muted" />
          <div className="h-4 w-64 animate-pulse bg-muted" />
        </div>
      ) : (
        <div className="animate-reading-in stagger-2 flex flex-wrap items-end justify-between gap-x-grid gap-y-grid">
          <div className="flex items-end gap-grid">
            <p className="flex items-baseline font-mono text-observation font-medium">
              {Math.round(snapshot.temperature)}
              <span className="ml-1 font-display text-reading text-muted-foreground">
                ℃
              </span>
            </p>
            {weatherClassification ? (
              <p className="flex items-center gap-2 pb-2">
                <WeatherIcon
                  iconKey={weatherClassification.iconKey}
                  label={weatherClassification.label}
                  className="size-5 text-muted-foreground"
                />
                <span className="text-heading">
                  {weatherClassification.label}
                </span>
              </p>
            ) : null}
          </div>

          <dl className="flex flex-wrap items-end gap-x-grid gap-y-2">
            <SecondaryReading label="体感">
              {Math.round(snapshot.apparentTemperature)}
              <Unit>℃</Unit>
            </SecondaryReading>
            <SecondaryReading label="湿度">
              {Math.round(snapshot.humidity)}
              <Unit>%</Unit>
            </SecondaryReading>
            <SecondaryReading label="降水確率">
              {Math.round(snapshot.precipitationProbability)}
              <Unit>%</Unit>
            </SecondaryReading>
          </dl>
        </div>
      )}
    </div>
  );
}

function SecondaryReading({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="font-display text-eyebrow uppercase text-muted-foreground">
        {label}
      </dt>
      <dd className="flex items-baseline font-mono text-heading">{children}</dd>
    </div>
  );
}

function Unit({ children }: { children: React.ReactNode }) {
  return (
    <span className="ml-0.5 font-display text-eyebrow text-muted-foreground">
      {children}
    </span>
  );
}
