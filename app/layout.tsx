import type { Metadata, Viewport } from "next";
import { Archivo, Sometype_Mono, Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ThemeProvider } from "@/components/theme-provider";
import { SITE } from "@/lib/constants/site";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const sometypeMono = Sometype_Mono({
  variable: "--font-sometype-mono",
  subsets: ["latin"],
  display: "swap",
});

// 和文は分割配信されるため preload を切り、表示に必要な範囲だけ取得する
const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  variable: "--font-zen-kaku-gothic-new",
  weight: ["400", "500", "700"],
  preload: false,
  display: "swap",
  fallback: ["Hiragino Kaku Gothic ProN", "Hiragino Sans", "sans-serif"],
});

export const metadata: Metadata = {
  // 相対パスの canonical と OG 画像を絶対URLへ解決するために必須
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "ja_JP",
    url: "/",
    title: SITE.title,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  // DESIGN.md § 2 Foundation の background を sRGB 近似で書いたもの。
  // meta タグは CSS 変数を参照できないため、ここだけ実値を持つ
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#edf0f1" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1a24" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${archivo.variable} ${sometypeMono.variable} ${zenKakuGothicNew.variable} antialiased`}
      >
        <ThemeProvider>
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
