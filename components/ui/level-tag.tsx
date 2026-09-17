import {
  levelBackgroundClass,
  levelTextClass,
  type ObservationLevel,
} from "@/lib/domain/observation-level";
import { cn } from "@/lib/utils";

type LevelTagProps = {
  level: ObservationLevel;
  label: string;
  className?: string;
};

/**
 * 段階を示す印と文字ラベルの組。
 * DESIGN.md § 1 の「色だけで情報を伝えない」を守るため、印は必ずラベルと並べる。
 */
export function LevelTag({ level, label, className }: LevelTagProps) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span
        aria-hidden
        className={cn("size-1.5 shrink-0", levelBackgroundClass[level])}
      />
      <span className={cn("text-note", levelTextClass[level])}>{label}</span>
    </span>
  );
}
