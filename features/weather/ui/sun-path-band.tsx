import { Sunrise, Sunset } from "lucide-react";

type SunPathBandProps = {
  sunrise: string;
  sunset: string;
  progress: number;
  phaseLabel: string;
};

export function SunPathBand({
  sunrise,
  sunset,
  progress,
  phaseLabel,
}: SunPathBandProps) {
  const pct = Math.min(Math.max(progress * 100, 0), 100);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-grid">
        <span className="font-display text-eyebrow uppercase text-muted-foreground">
          日照
        </span>
        <span className="text-note text-muted-foreground">
          {phaseLabel}・経過{" "}
          <span className="font-mono text-foreground">{Math.round(pct)}%</span>
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="flex shrink-0 items-center gap-1.5 text-muted-foreground">
          <Sunrise className="size-3.5" aria-hidden />
          <span className="font-mono text-note text-foreground">{sunrise}</span>
        </span>

        <div className="relative h-4 flex-1">
          {/* 目盛り線。日の出から日の入りまでを4等分する */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-border" />
          <div className="absolute inset-x-0 bottom-0 flex justify-between">
            {[0, 1, 2, 3, 4].map((tick) => (
              <span key={tick} className="h-1.5 w-px bg-border" />
            ))}
          </div>
          <div
            className="absolute bottom-0 h-px bg-foreground transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
          <div
            className="absolute bottom-0 -translate-x-1/2 transition-all duration-500"
            style={{ left: `${pct}%` }}
          >
            <span className="block size-2 -translate-y-1/2 rotate-45 bg-foreground" />
          </div>
        </div>

        <span className="flex shrink-0 items-center gap-1.5 text-muted-foreground">
          <span className="font-mono text-note text-foreground">{sunset}</span>
          <Sunset className="size-3.5" aria-hidden />
        </span>
      </div>
    </div>
  );
}
