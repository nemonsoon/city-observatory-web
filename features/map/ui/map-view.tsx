import dynamic from "next/dynamic";

export const MapView = dynamic(
  () => import("./map-view-client").then((module) => module.MapViewClient),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full animate-pulse rounded-2xl border bg-muted/30" />
    ),
  },
);
