import { cn } from "@/lib/utils";

type RuleProps = {
  className?: string;
  weight?: "hairline" | "heavy";
};

/**
 * 欄を区切る罫線。読み込み時に左から引かれる。
 * DESIGN.md § 7 Motion の rule-draw。
 */
export function Rule({ className, weight = "hairline" }: RuleProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "w-full origin-left animate-rule-draw",
        weight === "heavy" ? "h-0.5 bg-foreground" : "h-px bg-border",
        className,
      )}
    />
  );
}
