import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type PanelProps = Omit<ComponentProps<"section">, "title"> & {
  label: string;
  action?: ReactNode;
  bodyClassName?: string;
};

/**
 * 枠を持つ観測欄。DESIGN.md § 5 Rules により、
 * 中に別の座標系を持つもの（グラフ、地図）だけがこの枠を使う。
 */
export function Panel({
  label,
  action,
  className,
  bodyClassName,
  children,
  ...props
}: PanelProps) {
  return (
    <section
      className={cn("flex flex-col border border-border bg-card", className)}
      {...props}
    >
      <header className="flex items-center justify-between gap-4 border-b border-border px-grid py-2">
        <h2 className="font-display text-eyebrow uppercase text-muted-foreground">
          {label}
        </h2>
        {action}
      </header>
      <div className={cn("flex-1 p-grid", bodyClassName)}>{children}</div>
    </section>
  );
}
