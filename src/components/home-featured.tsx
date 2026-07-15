import Link from 'next/link';
import Image, { type StaticImageData } from 'next/image';
import styles from './home-featured.module.css';
import pixels from '../../public/images/pixels.png';
import hyakuninisshu from '../../public/images/hyakunin-isshu.png';
import orbitbola from '../../public/images/orbit-bola.png';
import antoki from '../../public/images/mbti.png';
import genericcamera from '../../public/images/generic-camera.png';
import synapsegit from '../../public/images/synapsegit.png';

type Featured = {
    name: string;
    tagline: string;
    description: string;
    image: StaticImageData;
    articleSlug: string;
    externalUrl: string;
};

// HOME / products / articles の 3 箇所で同一順 (回遊率向上のため 6 件を上部に固定)
export const FEATURED_PRODUCTS: Featured[] = [
    {
        name: 'SynapseGit',
        tagline: 'AIと人間の共創で「なぜこの形になったか」を残す',
        description:
            '完成物だけでは失われる意図、証拠、AI の提案、人間の判断を分けて保存する Git-like Core。次の担当者や未来の自分が、創作の背景から引き継げるようにします。',
        image: synapsegit,
        articleSlug: 'synapsegit',
        externalUrl: 'https://github.com/howlrs/synapsegit',
    },
    {
        name: 'ピクセルズ',
        tagline: 'Web ノノグラム / ピクチャーロジック',
        description:
            '5×5〜25×25 の 21 パズルすべてが「論理だけで解ける + 一意解」を CI で強制保証。Undo/Redo、ズーム+パン、WebAudio 自前合成 BGM、PWA でオフライン対応。広告・課金・登録ゼロ。',
        image: pixels,
        articleSlug: 'pixels',
        externalUrl: 'https://pixels.howlrs.net/',
    },
    {
        name: '百人一首暗記',
        tagline: '情景を味わいながら 100 首を覚える',
        description:
            '百人一首 100 首を読み物として味わいながら覚える Web アプリ。Gemini で生成した各句固有の情景イラスト、4 軸 (作者・テーマ・決まり字・時代) の関連リンク、ランダム 10 問のクイズチャレンジ。',
        image: hyakuninisshu,
        articleSlug: 'hyakunin-isshu',
        externalUrl: 'https://hyakunin.howlrs.net/',
    },
    {
        name: 'Orbit Bola!!',
        tagline: '宇宙状況認識 (SSA) API',
        description:
            '衛星オペレーター・研究者向けの宇宙状況認識プラットフォーム。TLE/OMM 軌道データ正規化、AI 衝突警告トリアージ、宇宙保険リスク評価を REST API で提供します。',
        image: orbitbola,
        articleSlug: 'orbit-bola',
        externalUrl: 'https://orbit-bola.com/',
    },
    {
        name: 'ANTOKI',
        tagline: 'MBTI × 地域マッチング掲示板',
        description:
            'MBTI 性格診断をベースに、地元で気の合う人とつながれる匿名マッチング掲示板。性格タイプの相性から自然な会話のきっかけを生みます。',
        image: antoki,
        articleSlug: 'antoki',
        externalUrl: 'https://mbti.antoki.net/',
    },
    {
        name: 'Generic Camera',
        tagline: 'カメラで撮るだけの汎用判定 PWA',
        description:
            'カメラで撮影した画像を Gemini に流し、ドメイン定義 YAML 1 枚で判定対象を切り替えられる汎用 PWA。汎用判定・魚種判定・みかん成熟度判定の 3 ドメインを同梱、アクセスコード方式で営業デモから現場運用まで完結します。',
        image: genericcamera,
        articleSlug: 'generic-camera',
        externalUrl:
            'https://generic-camera-pwa-staging-giyklvtu5q-an.a.run.app/?code=DEMO2026&demo=true',
    },
];

export default function HomeFeatured() {
    return (
        <section className={styles.section}>
            <header className={styles.header}>
                <h2 className={styles.heading}>Featured Products</h2>
                <Link href="/products" className={styles.moreLink}>
                    すべて見る →
                </Link>
            </header>
            <div className={styles.grid}>
                {FEATURED_PRODUCTS.map((item) => (
                    <article key={item.name} className={styles.card}>
                        <Link href={`/articles/${item.articleSlug}`} className={styles.cover} aria-label={`${item.name} の紹介記事へ`}>
                            <Image
                                src={item.image}
                                alt={item.name}
                                sizes="(max-width: 768px) 100vw, 33vw"
                                placeholder="blur"
                            />
                        </Link>
                        <div className={styles.body}>
                            <p className={styles.tagline}>{item.tagline}</p>
                            <h3 className={styles.name}>
                                <Link href={`/articles/${item.articleSlug}`}>{item.name}</Link>
                            </h3>
                            <p className={styles.desc}>{item.description}</p>
                            <div className={styles.actions}>
                                <Link href={`/articles/${item.articleSlug}`} className={styles.readMore}>
                                    紹介記事を読む
                                </Link>
                                <a
                                    href={item.externalUrl}
                                    className={styles.openApp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${item.name} を別タブで開く`}
                                >
                                    アプリを開く ↗
                                </a>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
