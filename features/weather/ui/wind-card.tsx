import {
  ObservationCell,
  ObservationCellSkeleton,
} from "@/components/ui/observation-cell";
import { windLevel } from "@/lib/domain/observation-level";

type WindCardProps = {
  windSpeed: number;
  windDirection: number;
  directionLabel: string;
  isLoading?: boolean;
};

/** 風向を指す針。方位の目盛りは上下左右の4点だけを刻む */
function WindDial({ rotation }: { rotation: number }) {
  return (
    <span
      aria-hidden
      className="relative mb-1 inline-block size-8 shrink-0 border border-border"
    >
      <span className="absolute inset-x-0 top-0 mx-auto h-1 w-px bg-border" />
      <span className="absolute inset-x-0 bottom-0 mx-auto h-1 w-px bg-border" />
      <span className="absolute inset-y-0 left-0 my-auto h-px w-1 bg-border" />
      <span className="absolute inset-y-0 right-0 my-auto h-px w-1 bg-border" />
      <span
        className="absolute inset-0 transition-transform duration-500"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <span className="absolute left-1/2 top-1 h-3 w-px -translate-x-1/2 bg-foreground" />
        <span className="absolute left-1/2 top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 bg-foreground" />
      </span>
    </span>
  );
}

export function WindCard({
  windSpeed,
  windDirection,
  directionLabel,
  isLoading = false,
}: WindCardProps) {
  if (isLoading) return <ObservationCellSkeleton />;

  return (
    <ObservationCell
      label="風速"
      value={windSpeed.toFixed(1)}
      unit="m/s"
      level={windLevel(windSpeed)}
      levelLabel={directionLabel}
      figure={<WindDial rotation={windDirection} />}
    />
  );
}
