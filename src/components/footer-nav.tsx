import Link from 'next/link';
import FooterUserInfo from './footer-user-info';
import { productLinks } from '../../common/product-article-map';
import styles from './footer-nav.module.css';

const SITE_OWNER = process.env.NEXT_PUBLIC_USERNAME || '寺島和宏 (howlrs)';
const SITE_LAUNCH_YEAR = 2024;

export default function FooterNav() {
    const currentYear = new Date().getFullYear();
    const yearRange =
        currentYear > SITE_LAUNCH_YEAR
            ? `${SITE_LAUNCH_YEAR}–${currentYear}`
            : `${SITE_LAUNCH_YEAR}`;

    return (
        <div className={styles.container}>
            <nav className={styles.products} aria-label="プロダクトリンク">
                <h2 className={styles.heading}>Products</h2>
                <ul className={styles.list}>
                    {productLinks.map((p) => (
                        <li key={p.articleSlug} className={styles.item}>
                            {p.archived ? (
                                <span
                                    className={styles.archivedName}
                                    title="現在は提供を終了しています"
                                >
                                    {p.productName}
                                </span>
                            ) : (
                                <a
                                    href={p.externalUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.extLink}
                                >
                                    {p.productName}
                                </a>
                            )}
                            <span className={styles.sep}>·</span>
                            <Link href={`/articles/${p.articleSlug}`} className={styles.articleLink}>
                                紹介記事
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <FooterUserInfo />
            <nav className={styles.legalNav} aria-label="サイト情報">
                <ul className={styles.legalList}>
                    <li>
                        <Link href="/policy" className={styles.legalLink}>
                            Privacy &amp; Policy
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact" className={styles.legalLink}>
                            Contact
                        </Link>
                    </li>
                    <li>
                        <Link href="/articles" className={styles.legalLink}>
                            Articles
                        </Link>
                    </li>
                    <li>
                        <a
                            href="https://github.com/howlrs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.legalLink}
                        >
                            GitHub
                        </a>
                    </li>
                </ul>
            </nav>
            <div className={styles.copyright}>
                <small>
                    © {yearRange} {SITE_OWNER}. All rights reserved.
                </small>
            </div>
        </div>
    );
}
