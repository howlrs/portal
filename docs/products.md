# Products

terashima@howlrs.net が開発・公開しているプロダクト一覧です。

## プロダクト一覧

| # | 名前 | 説明 | カテゴリ |
|---|------|------|---------|
| 1 | **Orbit Bola!!** | 宇宙状況認識(SSA) APIプラットフォーム | SaaS/API |
| 2 | **ANTOKI** | MBTI性格タイプ地域マッチング掲示板 | Webサービス |
| 3 | **N Delete** | ファイル削除ユーティリティ | ツール |
| 4 | **AI Task Factorizer** | AI搭載TODOアプリ | 生産性 |
| 5 | **JLPT Learning App** | 日本語能力試験学習アプリ | 教育 |
| 6 | **DEGUCHIKAI** | スライドから動画生成 | メディア |
| 7 | **Rust x Voicevox** | プログラマティック動画生成 | メディア |
| 8 | **2ch/5ch Viewer** | Webスクレイピングビューア | ツール |
| 9 | **Lotus Root Chef** | トレーディング自動化 | 金融 |
| 10 | **Prime** | AI搭載数学学習アプリ | 教育 |
| 11 | **X Auto** | Twitter/X 自動投稿管理 | SNS |
| 12 | **PDF Reader** | PDF→CSV変換ツール | ツール |
| 13 | **Generate README** | AI搭載README生成 | 開発 |
| 14 | **Excel to CSV** | Excel→CSV変換ツール | ツール |

## プロダクトの追加方法

1. `common/products.tsx` の `products` 配列に新しいエントリを追加:

```typescript
{
  name: "プロダクト名",
  description: "説明文",
  image: "/images/product-image.png",
  url: "https://example.com",
  icon: <SomeIcon />,
}
```

2. プロダクト画像を `public/images/` に配置 (推奨サイズ: カードに収まるサイズ)

3. 必要に応じて `articles/` に紹介記事を追加
