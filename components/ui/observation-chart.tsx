"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type ObservationPoint = {
  time: string;
  value: number;
};

export type ChartSeries =
  "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5";

type ObservationChartProps = {
  data: ObservationPoint[];
  series: ChartSeries;
  valueLabel: string;
};

const tickClassName = "fill-muted-foreground font-mono text-eyebrow";

/**
 * 観測値の時系列。DESIGN.md § 9 Charts の指定を1か所に集める。
 * Y 軸は 0 を含む範囲で描き、目盛りの間隔は背景の方眼の太線に合わせる。
 */
export function ObservationChart({
  data,
  series,
  valueLabel,
}: ObservationChartProps) {
  const stroke = `var(--${series})`;

  return (
    <div className="h-65 min-h-60 min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 4, right: 4, bottom: 0, left: 0 }}
        >
          <CartesianGrid
            vertical={false}
            stroke="var(--grid-major)"
            strokeDasharray="0"
          />
          <XAxis
            dataKey="time"
            tickLine={false}
            axisLine={{ stroke: "var(--border)" }}
            minTickGap={24}
            tick={{ className: tickClassName }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            width={36}
            domain={[
              (dataMin: number) => Math.min(0, Math.floor(dataMin)),
              "auto",
            ]}
            tick={{ className: tickClassName }}
          />
          <Tooltip
            cursor={{ stroke: "var(--border)" }}
            contentStyle={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 0,
              fontFamily: "var(--font-sometype-mono)",
            }}
            labelStyle={{ color: "var(--muted-foreground)" }}
            formatter={(value) => [String(value), valueLabel]}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={stroke}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 3, fill: stroke, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
