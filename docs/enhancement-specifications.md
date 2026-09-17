# City Observatory - 拡張機能仕様書

[← README に戻る](../README.md)

Open-Meteo のパラメータを足すだけで実現できる表示機能について、実装済みのものと今後の候補。

外部 API のエンドポイントとパラメータの全量は [API 仕様書](api-specifications.md) にある。

## 1. 方針

- 新しい API キーやエンドポイントを増やさない。既存 API のパラメータ追加だけで実現する
- リクエスト数を増やさず、無料枠に収める
- 一目で状況が伝わる見せ方を優先する

使用するパラメータはすべて Open-Meteo の無料プランで利用でき、天気コードは WMO の標準に準拠している。

## 2. 実装済み

### E1. 風向きと風速

| 項目           | 内容                                                              |
| -------------- | ----------------------------------------------------------------- |
| ドメイン       | `lib/domain/wind-direction.ts`, `lib/domain/observation-level.ts` |
| UI             | `features/weather/ui/wind-card.tsx`                               |
| API パラメータ | `wind_direction_10m`（hourly）                                    |

方位の目盛りを刻んだ円盤に針を立て、風向きに合わせて回す。風速は5段階に分け、段階の色と文字ラベルを添える。

### E2. 天気コードによるアイコンとラベル

| 項目           | 内容                                   |
| -------------- | -------------------------------------- |
| ドメイン       | `lib/domain/weather-classification.ts` |
| UI             | `features/weather/ui/weather-icon.tsx` |
| API パラメータ | `weathercode`（hourly）                |

WMO の天気コードを日本語のラベルと lucide-react のアイコンに対応させる。

| コード | 内容          | 日本語表示 |
| ------ | ------------- | ---------- |
| 0      | Clear sky     | 快晴       |
| 1      | Mainly clear  | 晴れ       |
| 2      | Partly cloudy | 薄曇り     |
| 3      | Overcast      | 曇り       |
| 45, 48 | Fog           | 霧         |
| 51–55  | Drizzle       | 霧雨       |
| 61–65  | Rain          | 雨         |
| 71–75  | Snowfall      | 雪         |
| 80–82  | Rain showers  | にわか雨   |
| 85–86  | Snow showers  | にわか雪   |
| 95–99  | Thunderstorm  | 雷雨       |

### E3. 日の出から日の入りまでの経過

| 項目           | 内容                                    |
| -------------- | --------------------------------------- |
| ドメイン       | `lib/domain/sun-path.ts`                |
| UI             | `features/weather/ui/sun-path-band.tsx` |
| API パラメータ | `sunrise`, `sunset`（daily）            |

日の出と日の入りを両端に置いた目盛り上で、現在時刻の位置を印で示す。経過の割合と時間帯のラベルを添える。

### E4. UV 指数

| 項目           | 内容                              |
| -------------- | --------------------------------- |
| ドメイン       | `lib/domain/uv-classification.ts` |
| UI             | `features/weather/ui/uv-card.tsx` |
| API パラメータ | `uv_index`（hourly）              |

国際的な区分に合わせて5つのラベルに分け、[デザインシステム](../DESIGN.md) の Level Scale に対応させる。

| UV 指数 | ラベル     | 段階 |
| ------- | ---------- | ---- |
| 0–2     | 低い       | 1    |
| 3–5     | 中程度     | 3    |
| 6–7     | 高い       | 4    |
| 8–10    | 非常に高い | 5    |
| 11 以上 | 極端に高い | 5    |

## 3. 未実装の拡張候補

### 優先度: 中

#### E5. 降水量の実測値

`precipitation`（hourly）を追加する。降水確率に加えて実際の降水量を出し、24時間の累積をグラフにする。

#### E6. 気圧の推移

`pressure_msl`（hourly）を追加する。気圧の上昇と下降の傾向を折れ線で示す。

### 優先度: 低

#### E7. 視程

`visibility` を追加する。霧の濃さを数値で示す。

#### E8. 降雪量

`snowfall` を追加する。札幌の冬季に意味を持つ。

## 4. 部品はあるが画面に出ていないもの

コードは存在するが、どの画面からも呼ばれていない。実装を進めるか、削除するかの判断が要る。

| 対象                     | 場所                                           | 状況                                                                 |
| ------------------------ | ---------------------------------------------- | -------------------------------------------------------------------- |
| 都市検索                 | `features/city-search/`                        | Geocoding API を叩くフックと入力欄があるが、画面に組み込まれていない |
| ベストタイムスロット     | `lib/domain/best-time-slots.ts`                | 型 `lib/types/derived-metrics.ts` に枠はあるが、呼び出しがない       |
| 7日間予報                | `features/weather/ui/weather-chart-client.tsx` | `range="7d"` を受け取れるが、画面からは 24 時間しか渡していない      |
| PM10・二酸化窒素・オゾン | `lib/types/air-quality.ts`                     | API から取得しているが、画面に出していない                           |
| URL への状態保持         | `nuqs`（`package.json`）                       | 依存に入っているが、コード中の使用箇所がない                         |

## 5. 制約

- 新しい外部 API を追加しない。Open-Meteo のパラメータ追加だけにとどめる
- 3D 表現のライブラリを使わない
- リアルタイム更新を行わない。キャッシュの間隔は [技術仕様書](technical-specifications.md#24-キャッシュ戦略) に従う
