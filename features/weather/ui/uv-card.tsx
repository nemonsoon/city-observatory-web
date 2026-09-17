import {
  ObservationCell,
  ObservationCellSkeleton,
} from "@/components/ui/observation-cell";
import type { ObservationLevel } from "@/lib/domain/observation-level";

type UVCardProps = {
  uvIndex: number;
  label: string;
  severity: ObservationLevel;
  isLoading?: boolean;
};

export function UVCard({
  uvIndex,
  label,
  severity,
  isLoading = false,
}: UVCardProps) {
  if (isLoading) return <ObservationCellSkeleton />;

  return (
    <ObservationCell
      label="UV 指数"
      value={uvIndex.toFixed(1)}
      level={severity}
      levelLabel={label}
    />
  );
}
