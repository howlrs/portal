# Development Guide

## セットアップ

```bash
# 依存パッケージのインストール
npm install

# 環境変数の設定
cp .env.example .env.local  # .env.example がある場合
# または手動で .env.local を作成

# 開発サーバー起動
npm run dev
```

開発サーバーは http://localhost:3000 で起動します。

## コマンド

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバー起動 (ホットリロード) |
| `npm run build` | プロダクションビルド |
| `npm run start` | プロダクションサーバー起動 |
| `npm run lint` | ESLint による静的解析 |

## 記事の追加

1. `articles/` ディレクトリに Markdown ファイルを作成

2. frontmatter を記述:

```markdown
---
title: "記事タイトル"
date: "2024-01-01"
---

記事本文...
```

3. YouTube 埋め込みは `remark-youtube` プラグインで対応:

```markdown
https://www.youtube.com/watch?v=VIDEO_ID
```

4. 画像は `public/images/article/` に配置し、相対パスで参照

## ディレクトリ規約

- **ページ追加:** `src/app/{route}/page.tsx` を作成
- **コンポーネント追加:** `src/components/` に配置
- **共有データ・ユーティリティ:** `common/` に配置
- **静的アセット:** `public/` に配置

## デプロイ

Vercel へのデプロイが推奨されています。
`master` ブランチへの push で自動デプロイが設定されている想定です。

```bash
# ビルド確認
npm run build

# リントチェック
npm run lint
```
