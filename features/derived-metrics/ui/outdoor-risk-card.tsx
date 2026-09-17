import {
  ObservationCell,
  ObservationCellSkeleton,
} from "@/components/ui/observation-cell";
import { outdoorRiskLevel } from "@/lib/domain/observation-level";

type OutdoorRisk = "low" | "medium" | "high";

type OutdoorRiskCardProps = {
  risk: OutdoorRisk;
  isLoading?: boolean;
};

const riskValues: Record<OutdoorRisk, string> = {
  low: "低",
  medium: "中",
  high: "高",
};

const riskNotes: Record<OutdoorRisk, string> = {
  low: "外出に支障なし",
  medium: "装備の確認を",
  high: "外出を控える",
};

export function OutdoorRiskCard({
  risk,
  isLoading = false,
}: OutdoorRiskCardProps) {
  if (isLoading) return <ObservationCellSkeleton />;

  return (
    <ObservationCell
      label="外出リスク"
      value={riskValues[risk]}
      level={outdoorRiskLevel(risk)}
      levelLabel={riskNotes[risk]}
    />
  );
}
