"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const options = [
  { value: "light", label: "明るい配色", Icon: Sun },
  { value: "dark", label: "暗い配色", Icon: Moon },
  { value: "system", label: "端末の設定に合わせる", Icon: Monitor },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // サーバー側では選択中の配色が分からないため、確定するまで印を出さない
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  return (
    <div className="flex border border-border" role="group" aria-label="配色">
      {options.map(({ value, label, Icon }) => {
        const isActive = mounted && theme === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => setTheme(value)}
            aria-label={label}
            aria-pressed={isActive}
            className={cn(
              "flex size-7 items-center justify-center border-l border-border transition-colors first:border-l-0",
              isActive
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon className="size-3.5" />
          </button>
        );
      })}
    </div>
  );
}
