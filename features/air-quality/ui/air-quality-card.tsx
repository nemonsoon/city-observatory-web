import {
  ObservationCell,
  ObservationCellSkeleton,
} from "@/components/ui/observation-cell";
import { getAirQualityLabelText } from "@/lib/domain/air-quality-label";
import { pm25Level } from "@/lib/domain/observation-level";

type AirQualityCardProps = {
  pm25: number;
  isLoading?: boolean;
};

export function AirQualityCard({
  pm25,
  isLoading = false,
}: AirQualityCardProps) {
  if (isLoading) return <ObservationCellSkeleton />;

  return (
    <ObservationCell
      label="PM2.5"
      value={pm25.toFixed(1)}
      unit="µg/m³"
      level={pm25Level(pm25)}
      levelLabel={getAirQualityLabelText(pm25)}
    />
  );
}
