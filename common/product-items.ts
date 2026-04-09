import { Item } from './products';

/**
 * Product items data (without image, which depends on static imports).
 * Used by server components for JSON-LD structured data.
 * The ProductsList component overrides image with static imports.
 */
export const productItems: Omit<Item, 'image'>[] = [
    {
        name: 'Orbit Bola!! | 宇宙状況認識API',
        url: 'https://orbit-bola.com/',
        icon_url: '/icons/orbit-bola.ico',
        description: '衛星オペレーター・研究者向けの宇宙状況認識(SSA)プラットフォームです。TLE/OMM軌道データの正規化、AI衝突警告トリアージ、宇宙保険リスク評価などをREST APIで提供します。',
        featureList: ['TLE/OMM軌道データ正規化', 'AI衝突警告トリアージ', '宇宙保険リスク評価', 'REST API'],
    },
    {
        name: 'ANTOKI | MBTI地域マッチング掲示板',
        url: 'https://mbti.antoki.net/',
        icon_url: '/icons/antoki.ico',
        description: 'MBTI性格診断をベースにした地域掲示板マッチングサービスです。匿名で利用でき、性格タイプの相性から純粋なつながりを生み出します。',
        featureList: ['MBTI性格診断', '地域マッチング', '匿名掲示板', '相性分析'],
    },
    {
        name: 'QRで管理 | 店舗管理QRソリューション',
        url: 'https://stores-qr.howlrs.net/',
        icon_url: '/icons/stores-qr.ico',
        description: 'QRコードを活用した店舗管理ソリューションです。商品管理（複数バリエーション・在庫・価格設定）、注文管理（試着・購入リクエスト）、QRコード経由のモバイル商品閲覧など、店舗運営を効率化します。',
        featureList: ['QRコード商品管理', '在庫管理', '注文管理', 'モバイル商品閲覧'],
    },
    {
        name: 'Lottery | 抽選ルーレットシステム',
        url: 'https://lottery.howlrs.net/',
        icon_url: '/icons/lottery.svg',
        description: 'ルーレットアニメーション付きのWeb抽選システムです。イベント作成・景品管理・抽選実行をブラウザ上で完結でき、キャンペーンやイベントでの景品抽選に活用できます。',
        featureList: ['ルーレットアニメーション', 'イベント作成', '景品管理', '抽選実行'],
    },
    {
        name: 'N Delete｜エヌデリ',
        url: 'https://github.com/howlrs/ndelete_rs',
        icon_url: '/icons/ndelete.png',
        description: '対象ファイルを入力するとファイル複数回上書きし削除するデスクトップアプリです。複数回は設定可能で、デフォルトは3回です。削除に成功すると削除証明書として削除ファイル名と削除内容を記載したテキストファイルを出力します。',
        featureList: ['複数回上書き削除', '削除証明書出力', '回数設定可能'],
    },
    {
        name: 'TODOアプリ AI Task Factorizer | タスク分解AI',
        url: 'https://github.com/howlrs/ai_task_factorizer',
        icon_url: '/icons/factorizer.png',
        description: '現状を表すリソースを渡すとTodoを立ち上げ、各イシューに分類します。 現状を表すリソースは先方からのメールやドキュメント、問題提起文などを想定しています。',
        featureList: ['AI自動タスク分解', 'メール・ドキュメント解析', 'イシュー自動分類'],
    },
    {
        name: 'JLPT [非公式] 日本語能力試験対策学習アプリ',
        url: 'https://jlpt.howlrs.net/',
        icon_url: '/icons/jlpt.ico',
        description: 'JLPT [非公式] 日本語能力試験対策学習アプリは、日本語能力試験対策学習アプリです。20000問以上の問題を収録しており、日本語能力試験対策に最適です。',
        featureList: ['20000問以上収録', 'N1-N5全レベル対応', '日本語能力試験対策'],
    },
    {
        name: '自動字幕・音声・動画生成デスクトップアプリ DEGUCHIKAI',
        url: 'https://github.com/howlrs/deguchikai',
        icon_url: '/icons/deguchikai.png',
        description: 'スライド（画像とテキスト）から音声を合成し、動画を自動生成するデスクトップアプリです。従来のコマンド型アプリよりより直感的なインターフェースを実装しました。',
        featureList: ['自動字幕生成', '音声合成', 'スライドから動画生成', 'GUIインターフェース'],
    },
    {
        name: 'Rust x Voicevoxブログラマブル動画生成',
        url: 'https://github.com/howlrs/slide_with_voice',
        icon_url: '/icons/voicevox.png',
        description: 'テキストファイルから動画を生成します。プログラマブルなテンプレートライクな動画をすばやく生成できます。特にプレゼンテーションやサービス紹介などに有用です。',
        featureList: ['テキストから動画生成', 'Voicevox音声合成', 'テンプレート動画', 'Rust実装'],
    },
    {
        name: '2ch/5ch/other View and saver',
        url: 'https://github.com/howlrs/view5ch',
        icon_url: '/icons/view5ch.png',
        description: '対象ウェブサイト・ページ情報を簡単に取得し、必要に応じて任意対象項目をリストアップし、保存するためのOSクロスプラットフォーム用デスクトップアプリです。',
        featureList: ['Webスクレイピング', 'データ保存', 'クロスプラットフォーム対応'],
    },
    {
        name: 'レンコンシェフ/Lotus root Chef',
        url: 'https://github.com/howlrs/lotus-root-chef',
        icon_url: '/icons/lotus.png',
        description: 'レンコンシェフは、指定価格帯の指定枚数の板に対して、追従しながら指値を行います。',
        featureList: ['自動指値', '価格追従', '板監視'],
    },
    {
        name: '[GeminiAI生成] 講義と漫才で学ぶ算数数学',
        url: 'https://prime.howlrs.net/',
        icon_url: '/icons/prime.png',
        description: '講義と漫才で学ぶ算数数学です。Google Gemini AIが各数学公式を講義、漫才形式で出力しました。自分にあった出力を選択し算数や数学を学ぶことができます。',
        featureList: ['Gemini AI生成コンテンツ', '講義形式', '漫才形式', '算数・数学学習'],
    },
    {
        name: 'X LONG POST AUTO WITH SCHEDULER',
        url: 'https://xauto.howlrs.net/',
        icon_url: '/icons/xauto.svg',
        description: 'X LONG POST AUTO WITH SCHEDULER: Twitter/X 自動投稿マネージャーはTwitter/Xの自動投稿サービスを提供しております。',
        featureList: ['X/Twitter自動投稿', 'スケジュール投稿', '長文投稿対応'],
    },
    {
        name: 'PDF READER',
        url: 'https://github.com/howlrs/pdf-reader/releases',
        icon_url: '/icons/pdf-reader.png',
        description: 'PDFファイルから構造化したCSVデータを生成し、結果をディレクトリ内に保存します。',
        featureList: ['PDF解析', 'CSV変換', '構造化データ出力'],
    },
    {
        name: 'Generate README with GEMINI AI',
        url: 'https://github.com/howlrs/gen-readme/releases',
        icon_url: '/icons/gen-readme.png',
        description: 'ディレクトリパスを渡すとディレクトリ内以下ファイルを走査し、リスト化、GEMINI AIにドキュメント化を依頼し、結果をディレクトリ内に保存します。',
        featureList: ['ディレクトリ走査', 'Gemini AIドキュメント生成', 'README自動作成'],
    },
    {
        name: 'Excel to CSV',
        url: 'https://github.com/howlrs/excel-to-csv/releases',
        icon_url: '/icons/excel-to-csv.png',
        description: 'Excelファイルを解析してCSV形式のデータに変換するツールを提供することを目的としています。具体的には、ユーザーがExcelファイルをアプリケーションにドロップすることで、その内容を解析し、CSV形式のテキストデータとして取得できるようにします。',
        featureList: ['Excel解析', 'CSV変換', 'ドラッグ&ドロップ対応'],
    },
];
