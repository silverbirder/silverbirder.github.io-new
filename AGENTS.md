# AGENTS.md

## プロジェクト概要

- Turborepo + pnpm の monorepo。Next.js アプリが `apps/`、共有パッケージが `packages/` にあります。
- 主要アプリ: `apps/user` (公開サイト, static export) と `apps/admin` (管理画面, auth + tRPC)。
- UI コンポーネントは `packages/ui`、Storybook は `packages/storybook`。

## 主要ディレクトリ

- `apps/user`: Next.js (port 3000), next-intl, static export (`output: "export"`)
- `apps/admin`: Next.js (port 3001), next-intl, tRPC, better-auth
- `packages/ui`: 共有 UI コンポーネント (Storybook 連携あり)
- `packages/storybook`: Storybook 設定/テスト
- `packages/*-config`: ESLint / TypeScript / Vitest の共有設定
- `turbo/`: turbo gen のテンプレート

## セットアップ

- 依存関係: `pnpm install`
- Node: `>=24.x` (ルート `package.json` の engines を優先)

## よく使うコマンド

- 開発: `pnpm dev` (全体)
- ビルド: `pnpm build`
- 型チェック: `pnpm check-types`
- Lint: `pnpm lint`
- Lint 修正: `pnpm lint:fix`
- フォーマット: `pnpm format`
- テスト: `pnpm test`
- テスト更新: `pnpm test:fix`

## パッケージ単位の実行

- turbo 経由: `pnpm turbo run <task> --filter <package>`
- 例: `pnpm turbo run test --filter admin`

## Storybook

- 開発: `pnpm --filter @repo/storybook dev`
- テスト: `pnpm --filter @repo/storybook test`

## 環境変数

- `apps/admin/.env.example` を `.env` にコピーして設定。
- `apps/admin/src/env.js` のスキーマに合わせる。
- `SKIP_ENV_VALIDATION=1` で Next.js の env 検証をスキップ可能。
- `apps/user` は `GITHUB_PAGES_BASE_PATH` で `basePath/assetPrefix` を設定。
- 追加/変更する env は `turbo.json` の `globalEnv` も更新する。

## テスト方針

- 変更したパッケージの `test` と `lint` は優先して実行。
- UI コンポーネント変更時は Storybook テストも検討。
- テストガイドラインは「Unit Test Writing Guidelines」を必ず遵守: `https://silverbirder.github.io/blog/contents/unit-test-writing-guidelines/`
- プロダクトコードを追加/変更したら対応する `*.spec.ts(x)` を必ず作成。
- ガイドライン要約:
  - AAA（Arrange→Act→Assert）を徹底。1ケース1サイクルで複数 Act/Assert を混在させない。
  - テストは仕様ドキュメントとして読みやすく。自然文のテスト名/変数名、肯定形を優先。
  - 期待値の算出に本番と同じロジックを使わない。モック値は本番に近い値を使う。
  - describe のネストは浅く（目安2階層）。条件はテスト名に織り込む。
  - 正常→準異常→異常の順で並べる。状態遷移は状態ごとに分割して検証。
  - 境界値/同値分割を網羅し、必要なら parameterized test を使う。
  - アサートは細かく明示（戻り値/DOM/モック呼び出し回数・引数まで）。
  - it.fails / it.todo / it.skip で意図を残す。完了後は除去。警告やフレークは放置しない。

## コードスタイル

- ESLint / Prettier を使用。自動整形は `pnpm format`。
- TypeScript は strict (共有 tsconfig を利用)。

## 追加メモ

- ルートの `pnpm generate:feature` で新規 feature パッケージ生成。
- 汎用的なものは `packages/util` に入れる。

## コンポーネント規約

- props 型は `type Props = { };` で定義し、関数コンポーネントで受け取る。
- 例:
  type Props = { };

  export const Button = ({}: Props) => {
  }

- コンポーネント作成時は Storybook も必ず作成する。
- Story は UI stack ごとに分け、以下の状態を用意する:
  - Ideal State（理想ステート）
  - Empty State（エンプティステート）
  - Error State（エラーステート）
  - Partial State（パーシャルステート）
  - Loading State（ローディングステート）
