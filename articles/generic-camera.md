---
title: 'Generic Camera — カメラで撮るだけで「何か」を判定する汎用 PWA'
date: '2026-04-27'
description: '魚種・果実成熟度・汎用識別など、ドメインを切り替えるだけで現場の判定業務に投入できる Rust + Next.js のカメラ PWA。Gemini をバックエンドに、営業デモから現場運用までを 1 つの URL で完結させます。'
---

## Generic Camera とは

漁港、農園、検品ラインといった「目で見て判定する」業務には共通の課題があります。 **カメラで対象を撮影し、その場で AI に判定させ、結果を即座に返す** — このフローを最短経路で実装した汎用 PWA が **Generic Camera** です。

ドメイン (判定対象の領域) を YAML で定義するだけで、UI もスキーマもそのまま流用できます。リリース時点では「汎用判定」「魚種判定」「みかん成熟度判定」の 3 ドメインを同梱しており、画面上のタブを切り替えるだけで判定対象を切り替えられます。

ソフトウェアエンジニアの寺島和宏 (howlrs) が、現場の判定業務を「スマホ 1 台 + ブラウザ」で立ち上げられるようにするために設計しました。

![Generic Camera のメイン画面。ヘッダーに「Generic Camera (デモモード)」と 3 つのドメイン切替タブ、中央に大きな「カメラを起動」ボタン。](/images/blog/generic-camera/main-domain-tabs.png)

## 何を解決するのか

現場の判定業務をデジタル化しようとすると、たいてい次のような壁にぶつかります。

- ドメインごとに専用アプリを作ると保守コストが膨らむ
- ネイティブアプリにすると配布・端末管理・OS 追従が重い
- 営業デモ用と本番運用用でコードベースが分かれてしまう

Generic Camera は「カメラ + 判定」という共通の骨格を 1 つの PWA に固定し、**判定ロジックの差分を YAML 1 ファイルで吸収する** 設計にしました。新しい判定対象が必要になったら、ドメイン定義を 1 枚追加してデプロイするだけで済みます。

## アクセスコード方式で営業デモに直行する

最初の画面はアクセスコード入力です。`?code=XXXX` のクエリで起動するか、画面上のフォームに入力すれば、その値が `localStorage` に保存されて以降は省略されます。

![アクセスコード入力画面。「アクセスコードを入力」のラベルと placeholder に "DEMO2026" の入力欄、暗紺色の「開始」ボタン。](/images/blog/generic-camera/access-gate.png)

このアクセスコードは Next.js Route Handler 側で API キーにマップされ、ブラウザ側にはマップ後の本物の API キーは絶対に降りない構造になっています。営業先には QR コード経由でコード付き URL を渡すだけで、その商談中だけ有効なデモが立ち上がります。

商談が終わってアクセスコードを失効させたければ、サーバ側のシークレットを書き換えるだけ。ブラウザに残ったコード自体は鍵としての効力を失うので、端末回収不要で「貸出デモ」を回せます。

## 確信度は星 5 段階で出す

判定結果は LLM の生確率や `confidence` 数値ではなく、**星 5 段階** で表示します。「0.83」と「0.84」を比べる時間は現場には無いので、人間が瞬時に直感できる粒度に丸めるのが正解、という設計判断です。

確信度の生数値は折り畳み JSON ビューに格納してあります。営業先から「これ、内部的にはどんなパラメータで判定してるの?」と問われた瞬間に展開して見せるためです。説明責任は果たしつつ、メイン UI は誤解されにくいレベルに整えています。

## モバイル前提でレイアウトする

PWA として実機に入れて使う想定なので、すべての UI は最初からモバイル幅で組まれています。`max-w-md mx-auto` でレイアウトを固定し、デスクトップで開いても崩れません。

![iPhone 14 サイズで撮影したメイン画面。ヘッダーが画面幅いっぱいに広がり、ドメインタブとカメラ起動ボタンが指で押しやすい大きさで縦に並んでいる。](/images/blog/generic-camera/mobile.png)

カメラ起動時には `getUserMedia({ facingMode: "environment" })` で背面カメラを優先し、撮影画像は **長辺 1024px / JPEG q=0.85** にリサイズしてから API に送ります。回線が細い現場でもタイムアウトしにくいよう、ローディングメッセージは 10 秒・30 秒・60 秒で段階的に表現を切り替え、利用者を不安にさせません。

## バックエンドは Rust + axum + Gemini

API 側 (`apps/api/`) は Rust + axum で書かれており、エンドポイントは `/v1/recognize` / `/v1/domains` / `/health` の 3 本だけ。受け取った画像を Gemini API (`gemini-3.1-flash-lite-preview`) に流し、ドメイン定義 YAML に紐付いた JSON Schema で結果を再検証してから返します。

Gemini が出力スキーマを破ったときは、 **`label="parse_error"` で必ず生存** します。「現場でアプリが落ちる」を最も避けたい挙動として、部分パースを許容する設計にしました。営業デモ中に LLM がコケても画面は動き続けます。

レート制限は API キー単位で `governor` クレートを使って `RATE_LIMIT_PER_MIN=30` に。撮影画像は base64 でサーバを 1 度通過するだけで、永続化は一切しません。

## デプロイは GitHub Actions → Cloud Run

インフラは Cloud Run (asia-northeast1) に統一しています。`api/pwa × prod/staging` の 4 サービスがあり、

- `api-deploy.yml` / `pwa-deploy.yml` で main push → staging へ自動反映
- `api-promote.yml` / `pwa-promote.yml` の `workflow_dispatch` で staging のリビジョンを prod に昇格

という二段ロケットになっています。「動作確認できた staging revision をそのまま prod に貼る」運用なので、prod のリスクが最小です。

Secret Manager で API キーやアクセスコードを管理し、Cloud Run にはランタイムで注入。Service Account `github-actions-deployer` には必要最低限の 7 ロールしか持たせていません。

ビルドイメージにもこだわりがあり、 **API 側の distroless イメージは sha256 digest pin** で再現性を確保しつつ、Bookworm ベースの builder と glibc を揃えています (Trixie ベースの `rust:slim` を使うと distroless cc-debian12 で `GLIBC_2.38 not found` で落ちる罠を踏み抜きました)。

## デモモードという保険

`?demo=true` を付けて起動すると、API を一切呼ばずにフィクスチャを返します。電波が無い現場、Gemini API がダウンしている瞬間、API キーが期限切れになった瞬間でも、 **デモが「画面が動く」最低保証を提供** します。

```
https://generic-camera-pwa-staging-giyklvtu5q-an.a.run.app/?code=DEMO2026&demo=true
```

商談で「とりあえず触ってみたい」と言われたときに、確実に動く URL を 1 本持っておけるのは精神衛生上も大きいです。

## QR で今すぐ試す

スマホのカメラで以下の QR を読み取れば、アクセスコード `DEMO2026` 入りのデモ URL に直行します。背面カメラと中央ガイド枠が立ち上がるので、手元にあるものを撮影してそのまま判定の手触りを確認してみてください。

![Generic Camera デモ URL の QR コード。https://generic-camera-pwa-staging-giyklvtu5q-an.a.run.app/?code=DEMO2026&demo=true をエンコード。](/images/blog/generic-camera/demo-qr.png)

QR が読めない環境では、上記の URL を直接ブラウザに貼り付けても同じ画面に到達できます。デモモード (`demo=true`) で起動するため、判定結果は固定 fixture が返ります。実 API による判定を試したい場合は、別途 staging の有効なアクセスコードを発行しますのでお問い合わせください。

## 設計上のこだわり

### 12 専門家ペルソナ × Gemini Pro レビュー

設計仕様 (`docs/superpowers/specs/2026-04-27-generic-camera-design.md`) は 12 専門家ペルソナの議論と Gemini Pro による deep レビューを経て確定しました。MVP に何を残し、何を Plan 2 / Plan 3 に送るかを 1 件ずつ判断し、carry-forward 注記まで仕様書に残してあります。

### Plan 1 → Plan 2 / Plan 3 の差分管理

最初の Plan 1 は「Hello from API / PWA を Cloud Run に乗せる」ところまで。ここで許容した妥協 (例: digest pin なし、graceful shutdown なし、`USER root`、`package-lock.json` 未コミット) は、すべて Plan 2 / Plan 3 の plan markdown に carry-forward 項目として転記してあります。「あとで直す」が泡のように消えない仕組みです。

### iOS Safari ダークモードの罠を踏み抜く

`color-scheme: light dark` を入れた状態で値の `<span>` に明示的な text-color を付けないと、iOS Safari がダークモード時に UA 既定で白文字にしてしまい、`bg-white` のカード上で値が完全に消えるという地雷を発見しました。修正は `color-scheme: light` 固定 + 値側にも明示的な色クラス。同じ罠を踏まないように設計知見として残しています。

## 既知の制約

- アクセスコードは平文 `localStorage` 保存です。営業デモ用途で割り切っており、ローテーション前提で運用しています
- Gemini Free tier ではレートが不足するため、有償 API キー前提です
- 撮影画像は base64 で 1 度だけサーバを通過し、永続化はしません

## まとめ

「カメラで撮るだけで何かを判定する」という、現場でよく出てくる業務パターンを、 **ドメイン定義を差し替えるだけで再利用できる形** に切り出した PWA です。営業デモから本番運用までを 1 つの URL で完結させ、Cloud Run の安いランタイムでスマホ 1 台から始められます。

- staging: [generic-camera-pwa-staging](https://generic-camera-pwa-staging-giyklvtu5q-an.a.run.app)
- 作者: 寺島和宏 (howlrs)
