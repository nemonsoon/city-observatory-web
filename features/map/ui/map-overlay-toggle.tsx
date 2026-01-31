"use client";

type MapOverlayToggleProps = {
  value: "none" | "precipitation";
  onChange: (value: "none" | "precipitation") => void;
};

export function MapOverlayToggle({ value, onChange }: MapOverlayToggleProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 p-1 text-xs shadow-sm">
      <button
        type="button"
        onClick={() => onChange("none")}
        className={`rounded-full px-3 py-1 font-medium transition ${
          value === "none"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground"
        }`}
      >
        なし
      </button>
      <button
        type="button"
        onClick={() => onChange("precipitation")}
        className={`rounded-full px-3 py-1 font-medium transition ${
          value === "precipitation"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground"
        }`}
      >
        降水
      </button>
    </div>
  );
}
