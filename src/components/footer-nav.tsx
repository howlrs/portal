import Link from 'next/link';
import FooterUserInfo from './footer-user-info';
import { productLinks } from '../../common/product-article-map';
import styles from './footer-nav.module.css';

export default function FooterNav() {
    return (
        <div className={styles.container}>
            <nav className={styles.products} aria-label="プロダクトリンク">
                <h2 className={styles.heading}>Products</h2>
                <ul className={styles.list}>
                    {productLinks.map((p) => (
                        <li key={p.articleSlug} className={styles.item}>
                            <a
                                href={p.externalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.extLink}
                            >
                                {p.productName}
                            </a>
                            <span className={styles.sep}>·</span>
                            <Link href={`/articles/${p.articleSlug}`} className={styles.articleLink}>
                                紹介記事
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <FooterUserInfo />
        </div>
    );
}
