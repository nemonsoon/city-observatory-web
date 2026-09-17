"use client";

import { cn } from "@/lib/utils";

type OverlayValue = "none" | "precipitation";

type MapOverlayToggleProps = {
  value: OverlayValue;
  onChange: (value: OverlayValue) => void;
};

const options: Array<{ value: OverlayValue; label: string }> = [
  { value: "none", label: "地図のみ" },
  { value: "precipitation", label: "降水を重ねる" },
];

export function MapOverlayToggle({ value, onChange }: MapOverlayToggleProps) {
  return (
    <div
      className="flex border border-border"
      role="group"
      aria-label="重ねる層"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          aria-pressed={value === option.value}
          className={cn(
            "border-l border-border px-2 py-0.5 text-note transition-colors first:border-l-0",
            value === option.value
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
