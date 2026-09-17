# City Observatory - 開発手順

[← README に戻る](../README.md)

このファイルが、日々叩くコマンドと、変更を出すまでの手順の唯一の正典。

clone から起動までの初回セットアップは [README](../README.md#セットアップ) が正典。ここには書き写さない。

## 1. コマンド

```bash
pnpm dev         # 開発サーバーを起動
pnpm build       # プロダクションビルド
pnpm start       # プロダクションサーバーを起動
pnpm test        # Vitest でユニットテストを実行
pnpm test:e2e    # Playwright で画面を確認
pnpm typecheck   # 型チェック
pnpm lint        # ESLint
pnpm lint:fix    # ESLint の自動修正
pnpm format      # Prettier の書式チェック
pnpm format:fix  # Prettier の自動整形
```

`pnpm format` と `pnpm format:fix` は Git が追跡しているファイルだけを対象にする。追跡前の新しいファイルは対象に入らないが、コミット時に `lint-staged` が拾う。

## 2. 開発フロー（Issue駆動）

1. Issue を立てる
2. `main` から `issue-<number>-<slug>` でブランチを切る（例: `issue-10-map-view`）
3. 実装してコミットし、push する
4. PR を出す。タイトルは `Issue #<number>: <短いタイトル>`、本文に `Closes #<number>` を含める
5. マージ後、`main` を更新して次の Issue に移る

PR の本文は [PR テンプレート](../.github/pull_request_template.md)を使う。

```bash
# Issue からブランチを作る
gh issue develop <number> -b issue-<number>-<slug>

# PR を作る
gh pr create -t "Issue #<number>: <title>" -b "Closes #<number>"
```

### 例外

`.gitignore` と `.prettierignore` の変更だけは、Issue と PR を通さず `main` へ直接コミットしてよい。Git が追跡する範囲と整形の対象範囲を変えるだけで、アプリの動作にもドキュメントの内容にも影響しないため。

`.env.example` と `.husky/` 配下はこの例外に含めない。`.env.example` は環境変数の正典として [API 仕様書](api-specifications.md)から参照されるドキュメントであり、`.husky/` 配下はコミットとプッシュのたびに走る処理そのものなので、どちらも Issue 駆動で扱う。

## 3. コミットの粒度

- 1つのコミットは1つの意図にまとめる。コードの変更とドキュメントの追随は分けてよい
- メッセージは Conventional Commits の形式で、命令形の短い要約に続けて「なぜそうしたか」を書く
- 関連する Issue 番号を `Refs #<number>` で末尾に置く
