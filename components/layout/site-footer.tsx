import { ExternalLink } from "@/components/ui/external-link";
import { Rule } from "@/components/ui/rule";

const sources = [
  { label: "気象・大気質データ: Open-Meteo", href: "https://open-meteo.com/" },
  { label: "地図: MapTiler", href: "https://www.maptiler.com/" },
  {
    label: "地図データ: OpenStreetMap",
    href: "https://www.openstreetmap.org/copyright",
  },
  { label: "降水タイル: OpenWeatherMap", href: "https://openweathermap.org/" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto flex flex-col gap-grid pt-grid">
      <Rule />
      <div className="flex flex-col gap-grid pb-grid md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-1">
          <p className="font-display text-eyebrow uppercase">
            City Observatory
          </p>
          <p className="text-note text-muted-foreground">
            日本の主要6都市の気象と大気質を観測する
          </p>
        </div>
        <ul className="flex flex-col gap-1.5">
          {sources.map((source) => (
            <li key={source.href}>
              <ExternalLink href={source.href}>{source.label}</ExternalLink>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
