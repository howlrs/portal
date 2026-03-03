# my-portal

terashima@howlrs.net のプロダクト紹介ポートフォリオサイト。

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **UI:** Ant Design 5
- **Markdown:** remark + rehype パイプライン
- **Deploy:** Vercel

## Project Structure

```
articles/          # Markdown記事 (frontmatter: title, date)
common/            # 共有ユーティリティ・データ定義
  products.tsx     # プロダクト一覧データ & 型定義
  strconv.tsx      # 文字列ユーティリティ
src/
  app/             # Next.js App Router ページ
    page.tsx       # トップページ (プロダクト一覧)
    products/      # プロダクト紹介ページ
    articles/      # 記事一覧 & [slug] 詳細ページ
    contact/       # お問い合わせフォーム
    policy/        # 特定商取引法 & プライバシーポリシー
    sitemap.tsx    # XML サイトマップ生成
  components/      # React コンポーネント
    header-nav.tsx # ナビゲーションヘッダー
    footer-nav.tsx # フッター
    contact.tsx    # お問い合わせフォーム
    products.tsx   # プロダクトカード表示
public/images/     # 画像アセット
```

## Commands

```bash
npm run dev        # 開発サーバー起動
npm run build      # プロダクションビルド
npm run start      # プロダクションサーバー起動
npm run lint       # ESLint 実行
```

## Conventions

- 言語: 日本語 (lang="ja")
- パスエイリアス: `@/*` → `./src/*`
- 環境変数: `NEXT_PUBLIC_` プレフィックスで公開設定を管理
- 記事追加: `articles/` に Markdown ファイルを配置 (frontmatter: title, date)
- プロダクト追加: `common/products.tsx` の配列に追加
- コンポーネントスタイル: Ant Design コンポーネント + CSS Modules
