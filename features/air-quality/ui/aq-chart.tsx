import dynamic from "next/dynamic";

export const AQChart = dynamic(
  () => import("./aq-chart-client").then((module) => module.AQChart),
  {
    ssr: false,
    loading: () => (
      <div className="h-[320px] w-full animate-pulse rounded-2xl border bg-muted/30" />
    ),
  },
);
