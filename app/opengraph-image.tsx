import { ImageResponse } from "next/og";
import { SITE } from "@/lib/constants/site";

export const alt = SITE.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// DESIGN.md § 2 の青焼き配色を sRGB 近似で書いたもの。
// ImageResponse は CSS 変数を解釈しないため、ここだけ実値を持つ
const palette = {
  base: "#0c1a24",
  ink: "#dce7ec",
  muted: "#8fa3ad",
  rule: "#2a4655",
};

// 文言を英語にしているのは、ImageResponse の既定フォントが日本語の字形を持たず、
// 日本語を置くと欠字になるため。日本語にするならフォントを同梱する必要がある
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: palette.base,
        color: palette.ink,
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 26,
          letterSpacing: "6px",
          textTransform: "uppercase",
          color: palette.muted,
        }}
      >
        Observation Log
      </div>
      <div
        style={{
          marginTop: 28,
          height: 2,
          width: "100%",
          background: palette.ink,
        }}
      />
      <div
        style={{
          marginTop: 32,
          fontSize: 88,
          fontWeight: 700,
          letterSpacing: "-2px",
        }}
      >
        {SITE.name}
      </div>
      <div style={{ marginTop: 20, fontSize: 38, color: palette.muted }}>
        Weather and air quality across six Japanese cities
      </div>
      <div
        style={{
          marginTop: 40,
          height: 1,
          width: "100%",
          background: palette.rule,
        }}
      />
      <div style={{ marginTop: 24, fontSize: 28, color: palette.muted }}>
        Tokyo · Osaka · Nagoya · Sapporo · Fukuoka · Naha
      </div>
    </div>,
    size,
  );
}
