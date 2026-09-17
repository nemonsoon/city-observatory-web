import {
  ObservationCell,
  ObservationCellSkeleton,
} from "@/components/ui/observation-cell";
import { comfortLabel, comfortLevel } from "@/lib/domain/observation-level";

type ComfortSummaryCardProps = {
  comfortScore: number;
  isLoading?: boolean;
};

export function ComfortSummaryCard({
  comfortScore,
  isLoading = false,
}: ComfortSummaryCardProps) {
  if (isLoading) return <ObservationCellSkeleton />;

  return (
    <ObservationCell
      label="快適度"
      value={String(comfortScore)}
      unit="/100"
      level={comfortLevel(comfortScore)}
      levelLabel={comfortLabel(comfortScore)}
    />
  );
}
