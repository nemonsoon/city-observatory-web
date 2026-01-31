type UVCardProps = {
  uvIndex: number;
  uvIndexMax?: number;
  label: string;
  color: string;
  isLoading?: boolean;
};

export function UVCard({
  uvIndex,
  uvIndexMax,
  label,
  color,
  isLoading = false,
}: UVCardProps) {
  if (isLoading) {
    return (
      <div>
        <div className="h-6 w-24 animate-pulse rounded-md bg-muted/50" />
        <div className="mt-4 h-12 w-24 animate-pulse rounded-md bg-muted/50" />
        <div className="mt-6 h-5 w-32 animate-pulse rounded-md bg-muted/50" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>UV指数</span>
        <span className="rounded-full bg-foreground/10 px-2 py-0.5 text-xs text-foreground">
          {label}
        </span>
      </div>
      <div className="mt-3 flex items-end gap-2">
        <span className="text-5xl font-bold tracking-tight">
          {uvIndex.toFixed(1)}
        </span>
        <span className="text-sm text-muted-foreground">/ 11+</span>
      </div>
      <div className="mt-6">
        <div className="h-2 w-full rounded-full bg-muted/40">
          <div
            className="h-2 rounded-full transition-all duration-700"
            style={{
              width: `${Math.min((uvIndex / 11) * 100, 100)}%`,
              backgroundColor: color,
            }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>低い</span>
          {uvIndexMax !== undefined ? (
            <span>最大 {uvIndexMax.toFixed(1)}</span>
          ) : (
            <span>極端</span>
          )}
        </div>
      </div>
    </div>
  );
}
