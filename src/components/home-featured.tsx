import Link from 'next/link';
import Image, { type StaticImageData } from 'next/image';
import styles from './home-featured.module.css';
import orbitbola from '../../public/images/orbit-bola.png';
import antoki from '../../public/images/mbti.png';
import storesqr from '../../public/images/stores-qr.png';

type Featured = {
    name: string;
    tagline: string;
    description: string;
    image: StaticImageData;
    articleSlug: string;
    externalUrl: string;
};

const featured: Featured[] = [
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
        name: 'QRで管理',
        tagline: '店舗管理 QR ソリューション',
        description:
            'QR コードで商品・在庫・注文を一元管理できる店舗向け Web サービス。複数バリエーション管理、試着リクエスト、モバイル商品閲覧に対応しています。',
        image: storesqr,
        articleSlug: 'stores-qr',
        externalUrl: 'https://stores-qr.howlrs.net/',
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
                {featured.map((item) => (
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
