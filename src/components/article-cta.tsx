import type { ProductLink } from '../../common/product-article-map';
import styles from './article-cta.module.css';

export default function ArticleCta({ product }: { product: ProductLink }) {
    return (
        <aside className={styles.cta} aria-label="関連プロダクト">
            <div className={styles.inner}>
                <p className={styles.eyebrow}>
                    {product.archived ? 'Archived product' : 'Try the product'}
                </p>
                <h3 className={styles.title}>{product.productName}</h3>
                <p className={styles.tagline}>{product.tagline}</p>
                {product.archived ? (
                    <span className={styles.archivedNotice} role="note">
                        現在は提供を終了しています
                    </span>
                ) : (
                    <a
                        href={product.externalUrl}
                        className={styles.button}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${product.productName} を別タブで開く`}
                    >
                        アプリを開く ↗
                    </a>
                )}
            </div>
        </aside>
    );
}
