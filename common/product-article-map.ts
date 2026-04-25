/**
 * Maps article slugs to their corresponding product's external URL.
 * Used to surface explicit "try the product" CTAs on article pages
 * and to build the product links list in the footer (crawl-boost purposes).
 */
export type ProductLink = {
    articleSlug: string;
    productName: string;
    tagline: string;
    externalUrl: string;
    /**
     * 提供終了したプロダクト。true の場合 CTA ボタンや footer の外部リンクは
     * 無効化され、紹介記事への内部リンクのみ残す。
     */
    archived?: boolean;
};

export const productLinks: ProductLink[] = [
    {
        articleSlug: 'orbit-bola',
        productName: 'Orbit Bola!!',
        tagline: '宇宙状況認識 (SSA) API',
        externalUrl: 'https://orbit-bola.com/',
    },
    {
        articleSlug: 'antoki',
        productName: 'ANTOKI',
        tagline: 'MBTI 地域マッチング掲示板',
        externalUrl: 'https://mbti.antoki.net/',
    },
    {
        articleSlug: 'stores-qr',
        productName: 'QRで管理',
        tagline: '店舗管理 QR ソリューション',
        externalUrl: 'https://stores-qr.howlrs.net/',
    },
    {
        articleSlug: 'lottery',
        productName: 'Lottery',
        tagline: '抽選ルーレットシステム',
        externalUrl: 'https://lottery.howlrs.net/',
    },
    {
        articleSlug: 'jlpt',
        productName: 'JLPT 学習アプリ',
        tagline: '日本語能力試験対策 (非公式)',
        externalUrl: 'https://jlpt.howlrs.net/',
    },
    {
        articleSlug: 'prime-math',
        productName: '講義と漫才で学ぶ算数数学',
        tagline: 'Gemini AI 生成の学習コンテンツ',
        externalUrl: 'https://prime.howlrs.net/',
    },
    {
        articleSlug: 'xauto-launch',
        productName: 'X LONG POST AUTO [提供終了]',
        tagline: 'X/Twitter 自動投稿マネージャー (アーカイブ)',
        externalUrl: '/articles/xauto-launch',
        archived: true,
    },
    {
        articleSlug: 'ndelete',
        productName: 'N Delete',
        tagline: 'ファイル多重上書き削除デスクトップアプリ',
        externalUrl: 'https://github.com/howlrs/ndelete_rs',
    },
    {
        articleSlug: 'ai-task-factorizer',
        productName: 'AI Task Factorizer',
        tagline: 'AI タスク分解 TODO アプリ',
        externalUrl: 'https://github.com/howlrs/ai_task_factorizer',
    },
    {
        articleSlug: 'deguchikai',
        productName: 'DEGUCHIKAI',
        tagline: '字幕・音声・動画生成デスクトップアプリ',
        externalUrl: 'https://github.com/howlrs/deguchikai',
    },
    {
        articleSlug: 'slide-voice',
        productName: 'Slide with Voice',
        tagline: 'Rust × Voicevox プログラマブル動画生成',
        externalUrl: 'https://github.com/howlrs/slide_with_voice',
    },
    {
        articleSlug: 'view5ch',
        productName: '2ch/5ch View and Saver',
        tagline: 'Web スクレイピングデスクトップアプリ',
        externalUrl: 'https://github.com/howlrs/view5ch',
    },
    {
        articleSlug: 'lotus-root-chef',
        productName: 'Lotus Root Chef',
        tagline: '指値自動追従ツール',
        externalUrl: 'https://github.com/howlrs/lotus-root-chef',
    },
    {
        articleSlug: 'pdf-reader',
        productName: 'PDF Reader',
        tagline: 'PDF 構造化 CSV 変換',
        externalUrl: 'https://github.com/howlrs/pdf-reader/releases',
    },
    {
        articleSlug: 'gen-readme',
        productName: 'Generate README with Gemini AI',
        tagline: 'ディレクトリ走査 AI ドキュメント生成',
        externalUrl: 'https://github.com/howlrs/gen-readme/releases',
    },
    {
        articleSlug: 'excel-to-csv',
        productName: 'Excel to CSV',
        tagline: 'Excel 解析 CSV 変換ツール',
        externalUrl: 'https://github.com/howlrs/excel-to-csv/releases',
    },
    {
        articleSlug: 'claude-checker',
        productName: 'Claude Checker',
        tagline: 'Claude Code セッションかんばん監視ツール',
        externalUrl: 'https://github.com/howlrs/claude-checker',
    },
];

export function getProductByArticleSlug(slug: string): ProductLink | undefined {
    return productLinks.find((p) => p.articleSlug === slug);
}
