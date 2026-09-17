import type { ReactNode } from "react";
import { LevelTag } from "@/components/ui/level-tag";
import type { ObservationLevel } from "@/lib/domain/observation-level";
import { cn } from "@/lib/utils";

type ObservationCellProps = {
  label: string;
  value: string;
  unit?: string;
  level: ObservationLevel;
  levelLabel: string;
  figure?: ReactNode;
  className?: string;
};

/**
 * 観測値1つ分の欄。DESIGN.md § 5 Rules により枠を持たず、
 * 区切りは親が引く罫線に任せる。
 */
export function ObservationCell({
  label,
  value,
  unit,
  level,
  levelLabel,
  figure,
  className,
}: ObservationCellProps) {
  return (
    <div className={cn("flex flex-col gap-2 py-grid", className)}>
      <span className="font-display text-eyebrow uppercase text-muted-foreground">
        {label}
      </span>
      <div className="flex items-end gap-3">
        {figure}
        <p className="flex items-baseline font-mono text-reading font-medium">
          {value}
          {unit ? (
            <span className="ml-1 font-display text-eyebrow text-muted-foreground">
              {unit}
            </span>
          ) : null}
        </p>
      </div>
      <LevelTag level={level} label={levelLabel} />
    </div>
  );
}

export function ObservationCellSkeleton() {
  return (
    <div className="flex flex-col gap-2 py-grid">
      <div className="h-3 w-20 animate-pulse bg-muted" />
      <div className="h-8 w-24 animate-pulse bg-muted" />
      <div className="h-3 w-16 animate-pulse bg-muted" />
    </div>
  );
}
