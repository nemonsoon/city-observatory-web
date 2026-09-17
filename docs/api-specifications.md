# City Observatory - API 仕様書

[← README に戻る](../README.md)

外部 API のエンドポイント・パラメータ・レスポンス形式と、失敗時の扱い、クレジット表記の義務。

実装は `lib/api/` と `lib/validators/` にある。層をまたぐ呼び出しの流れは [技術仕様書](technical-specifications.md#23-データの流れ) にある。

API キーの設定は [`.env.example`](../.env.example) が正典。

---

## 1. Open-Meteo Weather Forecast API

- **エンドポイント**: `GET https://api.open-meteo.com/v1/forecast`
- **認証**: 不要（非商用利用、商用は有料）
- **ドキュメント**: https://open-meteo.com/en/docs
- **実装**: `lib/api/weather.ts`

### パラメータ

| パラメータ      | 型     | 必須 | 説明               | デフォルト |
| --------------- | ------ | ---- | ------------------ | ---------- |
| `latitude`      | number | ✓    | 緯度               | -          |
| `longitude`     | number | ✓    | 経度               | -          |
| `hourly`        | string | -    | 時間ごとの気象要素 | -          |
| `daily`         | string | -    | 日ごとの気象要素   | -          |
| `timezone`      | string | -    | タイムゾーン       | `GMT`      |
| `forecast_days` | number | -    | 予報日数（1-16）   | 7          |

### 使用中の Hourly パラメータ

`temperature_2m`, `relative_humidity_2m`, `precipitation_probability`, `wind_speed_10m`, `apparent_temperature`, `weathercode`, `wind_direction_10m`, `uv_index`, `precipitation`

### 使用中の Daily パラメータ

`temperature_2m_max`, `temperature_2m_min`, `precipitation_sum`, `precipitation_probability_max`, `sunrise`, `sunset`, `uv_index_max`

---

## 2. Open-Meteo Air Quality API

- **エンドポイント**: `GET https://air-quality-api.open-meteo.com/v1/air-quality`
- **認証**: 不要
- **ドキュメント**: https://open-meteo.com/en/docs/air-quality-api
- **実装**: `lib/api/air-quality.ts`

### パラメータ

| パラメータ      | 型     | 必須 | 説明                 | デフォルト |
| --------------- | ------ | ---- | -------------------- | ---------- |
| `latitude`      | number | ✓    | 緯度                 | -          |
| `longitude`     | number | ✓    | 経度                 | -          |
| `hourly`        | string | -    | 時間ごとの大気質要素 | -          |
| `timezone`      | string | -    | タイムゾーン         | `GMT`      |
| `forecast_days` | number | -    | 予報日数（1-5）      | 5          |

### 使用中の Hourly パラメータ

`pm10`, `pm2_5`, `nitrogen_dioxide`, `ozone`

### PM2.5 簡易分類（設計判断）

厳密な AQI は採用せず、PM2.5 の値だけで4段階に分ける。利用者が一目で判断できることを優先した。境界値は米国環境保護庁の AQI のブレークポイントに合わせている。

| PM2.5（μg/m³） | 画面の表示 | 段階 |
| -------------- | ---------- | ---- |
| 0 – 12         | 良好       | 1    |
| 12.1 – 35.4    | 普通       | 3    |
| 35.5 – 55.4    | 悪い       | 4    |
| 55.5 以上      | 危険       | 5    |

段階は [デザインシステム](../DESIGN.md) の Level Scale に対応する。実装は `lib/domain/air-quality-label.ts` と `lib/domain/observation-level.ts`。

---

## 3. MapTiler Vector Tiles

- **ベース URL**: `https://api.maptiler.com`
- **認証**: API キー必須（`NEXT_PUBLIC_MAPTILER_KEY`）
- **レート制限**: Free プラン - 100,000 タイル/月
- **ドキュメント**: https://docs.maptiler.com/
- **実装**: `features/map/ui/map-view-client.tsx`

### スタイル URL

配色に追従して切り替える。`dataviz` はデータを重ねる前提で彩度を落としたスタイルで、観測地点の点より地図が目立たない。

| 配色   | URL                                                               |
| ------ | ----------------------------------------------------------------- |
| 明るい | `https://api.maptiler.com/maps/dataviz/style.json?key={KEY}`      |
| 暗い   | `https://api.maptiler.com/maps/dataviz-dark/style.json?key={KEY}` |

どちらも [`.env.example`](../.env.example) の `NEXT_PUBLIC_MAP_STYLE_LIGHT` / `NEXT_PUBLIC_MAP_STYLE_DARK` で差し替えられる。

### API キー保護

MapTiler Dashboard で **Allowed HTTP Origins** を設定:

- DEV: `http://localhost:3000`, `https://*.vercel.app`
- PROD: 本番 URL のみ

---

## 4. OpenWeatherMap Precipitation Tiles

- **タイル URL**: `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid={KEY}`
- **認証**: API キー必須（`NEXT_PUBLIC_OPENWEATHER_KEY`）

---

## 5. エラーハンドリング

失敗はすべて `lib/api/errors.ts` の `APIError` に包んでから TanStack Query へ渡す。`Response` から投げられた場合は HTTP ステータスと `HTTP_<status>` 形式のコードを保持する。

| ステータス | 対応                     |
| ---------- | ------------------------ |
| 200        | 正常処理                 |
| 400        | パラメータエラーを表示   |
| 429        | リトライせず、待機を案内 |
| 500 / 503  | 再試行ボタンを表示       |
| 通信失敗   | 接続の確認を促す表示     |

### リトライ

| 設定               | 値                       | 定義場所            |
| ------------------ | ------------------------ | ------------------- |
| 既定の回数         | 2 回                     | `app/providers.tsx` |
| 天気・大気質の回数 | 2 回。ただし 429 は 0 回 | `features/*/model/` |
| 待ち時間           | 1 秒から倍々。上限 30 秒 | `features/*/model/` |

429 でリトライしないのは、レート制限にかかった状態で再送すると制限の解除がさらに遅れるため。

---

## 6. 利用規約とクレジット表記

各サービスの規約上、次の表記が必須になる。

| サービス      | 表記                                           | 表示位置                         |
| ------------- | ---------------------------------------------- | -------------------------------- |
| OpenStreetMap | `© OpenStreetMap contributors`（リンク付き）   | 地図右下（`attributionControl`） |
| MapTiler      | `© MapTiler`（リンク付き）と Free プランのロゴ | 地図右下とロゴは左下             |
| Open-Meteo    | データ提供元としての明記                       | フッター                         |

その他の制約は次のとおり。

- **Open-Meteo**: 非商用利用のみ。過剰なリクエストを禁止
- **MapTiler**: Allowed HTTP Origins の設定が必須。タイルのプリフェッチを禁止
