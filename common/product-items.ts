import { Item } from './products';

/**
 * Product items data (without image_url, which depends on static imports).
 * Used by server components for JSON-LD structured data.
 * The ProductsList component overrides image_url with static imports.
 */
export const productItems: Omit<Item, 'image_url'>[] = [
    {
        name: 'Orbit Bola!! | 宇宙状況認識API',
        url: 'https://orbit-bola.com/',
        icon_url: 'https://orbit-bola.com/favicon.ico',
        description: '衛星オペレーター・研究者向けの宇宙状況認識(SSA)プラットフォームです。TLE/OMM軌道データの正規化、AI衝突警告トリアージ、宇宙保険リスク評価などをREST APIで提供します。'
    },
    {
        name: 'ANTOKI | MBTI地域マッチング掲示板',
        url: 'https://mbti.antoki.net/',
        icon_url: 'https://mbti.antoki.net/favicon.ico',
        description: 'MBTI性格診断をベースにした地域掲示板マッチングサービスです。匿名で利用でき、性格タイプの相性から純粋なつながりを生み出します。'
    },
    {
        name: 'QRで管理 | 店舗管理QRソリューション',
        url: 'https://stores-qr.howlrs.net/',
        icon_url: 'https://stores-qr.howlrs.net/favicon.ico',
        description: 'QRコードを活用した店舗管理ソリューションです。商品管理（複数バリエーション・在庫・価格設定）、注文管理（試着・購入リクエスト）、QRコード経由のモバイル商品閲覧など、店舗運営を効率化します。'
    },
    {
        name: 'Lottery | 抽選ルーレットシステム',
        url: 'https://lottery.howlrs.net/',
        icon_url: 'https://lottery.howlrs.net/icon.svg',
        description: 'ルーレットアニメーション付きのWeb抽選システムです。イベント作成・景品管理・抽選実行をブラウザ上で完結でき、キャンペーンやイベントでの景品抽選に活用できます。'
    },
    {
        name: 'N Delete｜エヌデリ',
        url: 'https://github.com/howlrs/ndelete_rs',
        icon_url: 'https://github.com/howlrs/ndelete_rs/blob/master/src-tauri/icons/128x128.png?raw=true',
        description: '対象ファイルを入力するとファイル複数回上書きし削除するデスクトップアプリです。複数回は設定可能で、デフォルトは3回です。削除に成功すると削除証明書として削除ファイル名と削除内容を記載したテキストファイルを出力します。'
    },
    {
        name: 'TODOアプリ AI Task Factorizer | タスク分解AI',
        url: 'https://github.com/howlrs/ai_task_factorizer',
        icon_url: 'https://github.com/howlrs/ai_task_factorizer/blob/master/src-tauri/icons/128x128.png?raw=true',
        description: '現状を表すリソースを渡すとTodoを立ち上げ、各イシューに分類します。 現状を表すリソースは先方からのメールやドキュメント、問題提起文などを想定しています。'
    },
    {
        name: 'JLPT [非公式] 日本語能力試験対策学習アプリ',
        url: 'https://jlpt.howlrs.net/',
        icon_url: 'https://jlpt.howlrs.net/icon.ico',
        description: 'JLPT [非公式] 日本語能力試験対策学習アプリは、日本語能力試験対策学習アプリです。20000問以上の問題を収録しており、日本語能力試験対策に最適です。'
    },
    {
        name: '自動字幕・音声・動画生成デスクトップアプリ DEGUCHIKAI',
        url: 'https://github.com/howlrs/deguchikai',
        icon_url: 'https://github.com/howlrs/deguchikai/blob/master/src-tauri/icons/128x128@2x.png?raw=true',
        description: 'スライド（画像とテキスト）から音声を合成し、動画を自動生成するデスクトップアプリです。従来のコマンド型アプリよりより直感的なインターフェースを実装しました。'
    },
    {
        name: 'Rust x Voicevoxブログラマブル動画生成',
        url: 'https://github.com/howlrs/slide_with_voice',
        icon_url: 'https://github.com/howlrs/slide_with_voice/blob/release/images/icon.png?raw=true',
        description: 'テキストファイルから動画を生成します。プログラマブルなテンプレートライクな動画をすばやく生成できます。特にプレゼンテーションやサービス紹介などに有用です。'
    },
    {
        name: '2ch/5ch/other View and saver',
        url: 'https://github.com/howlrs/view5ch',
        icon_url: 'https://github.com/howlrs/view5ch/blob/master/src-tauri/icons/128x128@2x.png?raw=true',
        description: '対象ウェブサイト・ページ情報を簡単に取得し、必要に応じて任意対象項目をリストアップし、保存するためのOSクロスプラットフォーム用デスクトップアプリです。'
    },
    {
        name: 'レンコンシェフ/Lotus root Chef',
        url: 'https://github.com/howlrs/lotus-root-chef',
        icon_url: 'https://github.com/howlrs/lotus-root-chef/blob/master/src-tauri/icons/128x128@2x.png?raw=true',
        description: 'レンコンシェフは、指定価格帯の指定枚数の板に対して、追従しながら指値を行います。'
    },
    {
        name: '[GeminiAI生成] 講義と漫才で学ぶ算数数学',
        url: 'https://prime.howlrs.net/',
        icon_url: 'https://prime.howlrs.net//icon.png',
        description: '講義と漫才で学ぶ算数数学です。Google Gemini AIが各数学公式を講義、漫才形式で出力しました。自分にあった出力を選択し算数や数学を学ぶことができます。'
    },
    {
        name: 'X LONG POST AUTO WITH SCHEDULER',
        url: 'https://xauto.howlrs.net/',
        icon_url: 'https://xauto.howlrs.net/icon.svg',
        description: 'X LONG POST AUTO WITH SCHEDULER: Twitter/X 自動投稿マネージャーはTwitter/Xの自動投稿サービスを提供しております。'
    },
    {
        name: 'PDF READER',
        url: 'https://github.com/howlrs/pdf-reader/releases',
        icon_url: 'https://github.com/howlrs/pdf-reader/blob/release/src-tauri/icons/128x128.png?raw=true',
        description: 'PDFファイルから構造化したCSVデータを生成し、結果をディレクトリ内に保存します。'
    },
    {
        name: 'Generate README with GEMINI AI',
        url: 'https://github.com/howlrs/gen-readme/releases',
        icon_url: 'https://github.com/howlrs/gen-readme/blob/master/src-tauri/icons/128x128.png?raw=true',
        description: 'ディレクトリパスを渡すとディレクトリ内以下ファイルを走査し、リスト化、GEMINI AIにドキュメント化を依頼し、結果をディレクトリ内に保存します。'
    },
    {
        name: 'Excel to CSV',
        url: 'https://github.com/howlrs/excel-to-csv/releases',
        icon_url: 'https://github.com/howlrs/excel-to-csv/blob/master/src-tauri/icons/128x128.png?raw=true',
        description: 'Excelファイルを解析してCSV形式のデータに変換するツールを提供することを目的としています。具体的には、ユーザーがExcelファイルをアプリケーションにドロップすることで、その内容を解析し、CSV形式のテキストデータとして取得できるようにします。'
    },
];
