# Architecture

## 概要

my-portal は Next.js 15 App Router ベースのポートフォリオサイトです。
terashima@howlrs.net が開発したプロダクト群を紹介し、技術記事を公開しています。

## 技術スタック

| カテゴリ | 技術 | バージョン |
|---------|------|-----------|
| Framework | Next.js | 15.1.6 |
| UI Library | React | 19.0.0 |
| Component Library | Ant Design | 5.23.2 |
| Language | TypeScript | 5.x (strict) |
| Markdown | remark + rehype | 15.x / 10.x |
| HTTP Client | axios | 1.7.9 |
| Deploy | Vercel | - |

## ルーティング

| パス | ファイル | 説明 | レンダリング |
|-----|---------|------|-------------|
| `/` | `src/app/page.tsx` | トップページ | Static |
| `/products` | `src/app/products/page.tsx` | プロダクト一覧 | Static |
| `/articles` | `src/app/articles/page.tsx` | 記事一覧 | Dynamic |
| `/articles/[slug]` | `src/app/articles/[slug]/page.tsx` | 記事詳細 | SSG (`generateStaticParams`) |
| `/contact` | `src/app/contact/page.tsx` | お問い合わせ | Client-side |
| `/policy` | `src/app/policy/page.tsx` | 法的情報 | Static |
| `/sitemap.xml` | `src/app/sitemap.tsx` | サイトマップ | Dynamic |

## データフロー

```
articles/*.md ──(gray-matter)──> frontmatter + content
                ──(remark/rehype)──> HTML
                ──> /articles/[slug] ページ

common/products.tsx ──> src/components/products.tsx ──> カード表示

Contact Form ──(axios POST)──> NEXT_PUBLIC_API_DOMAIN 外部API
```

## コンポーネント構成

```
layout.tsx
├── HeaderNav (クライアントコンポーネント)
│   └── Ant Design Menu
├── {children} (各ページ)
│   ├── page.tsx → Products コンポーネント
│   ├── products/page.tsx → Products コンポーネント
│   ├── articles/page.tsx → 記事一覧
│   ├── articles/[slug]/page.tsx → Markdown HTML
│   ├── contact/page.tsx → Contact コンポーネント
│   └── policy/page.tsx → Tabs (特商法/プライバシー)
└── FooterNav
    └── Ant Design Descriptions
```

## 環境変数

### 必須

| 変数名 | 用途 |
|--------|------|
| `NEXT_PUBLIC_SITE_TITLE` | サイトタイトル |
| `NEXT_PUBLIC_BASE_URL` | ベースURL (サイトマップ用) |
| `NEXT_PUBLIC_USERNAME` | 表示名 |
| `NEXT_PUBLIC_EMAIL` | メールアドレス |
| `NEXT_PUBLIC_API_DOMAIN` | お問い合わせAPI |

### 法的情報 (policy ページ)

| 変数名 | 用途 |
|--------|------|
| `NEXT_PUBLIC_ADDRESS` | 住所 |
| `NEXT_PUBLIC_TEL` | 電話番号 |
| `NEXT_PUBLIC_JUSTICE` | 管轄裁判所 |
| `NEXT_PUBLIC_START` | サービス開始日 |

### プロダクト設定 (xauto)

`NEXT_PUBLIC_XAUTO_URL`, `NEXT_PUBLIC_XAUTO_TITLE`, `NEXT_PUBLIC_XAUTO_DESCRIPTION`,
`NEXT_PUBLIC_XAUTO_LOWPRICE`, `NEXT_PUBLIC_XAUTO_HIGHPRICE`, `NEXT_PUBLIC_XAUTO_ADDITIONAL`,
`NEXT_PUBLIC_XAUTO_PAYMENT_METHOD`, `NEXT_PUBLIC_XAUTO_PAYMENT_PERIOD`,
`NEXT_PUBLIC_XAUTO_DELIVERY_METHOD`, `NEXT_PUBLIC_XAUTO_RETURN_METHOD`,
`NEXT_PUBLIC_XAUTO_SPECIAL_TERM`

## スタイリング

- **グローバル:** `src/app/globals.css` (CSS変数によるライト/ダークモード対応)
- **コンポーネント:** CSS Modules (`*.module.css`)
- **UI:** Ant Design テーマ統合
- **レスポンシブ:** Ant Design Grid (Col span) による3段階レスポンシブ

## SEO

- `sitemap.tsx` による動的サイトマップ生成
- `layout.tsx` でのメタデータ設定
- 記事ページの SSG による静的生成
