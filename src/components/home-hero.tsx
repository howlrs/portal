import Link from 'next/link';
import styles from './home-hero.module.css';

export default function HomeHero() {
    return (
        <section className={styles.hero}>
            <p className={styles.eyebrow}>HOWLRS — Software Engineer Portfolio</p>
            <h1 className={styles.title}>
                寺島和宏 (howlrs) が手がけた<wbr />プロダクトとエンジニアリング
            </h1>
            <p className={styles.lead}>
                howlrs &amp; rejoin LLC. 代表 / ソフトウェアエンジニアの寺島和宏が個人および事業として開発した
                Web アプリ、デスクトップアプリ、API、AI ツールを紹介するポートフォリオサイトです。
                MBTI 地域マッチング <Link href="/articles/antoki">ANTOKI</Link>、
                宇宙状況認識 API <Link href="/articles/orbit-bola">Orbit Bola!!</Link>、
                店舗管理 <Link href="/articles/stores-qr">QRで管理</Link> をはじめ、計 16 のプロダクトを掲載しています。
            </p>
            <div className={styles.ctaRow}>
                <Link href="/products" className={styles.primary} aria-label="プロダクト一覧ページへ">
                    プロダクト一覧を見る
                </Link>
                <Link href="/articles" className={styles.secondary} aria-label="ブログ記事一覧ページへ">
                    記事一覧を読む
                </Link>
            </div>
        </section>
    );
}
