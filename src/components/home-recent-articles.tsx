import Link from 'next/link';
import { getAllPosts } from '../../common/articles';
import styles from './home-recent-articles.module.css';

export default function HomeRecentArticles() {
    const posts = getAllPosts().slice(0, 4);

    return (
        <section className={styles.section}>
            <header className={styles.header}>
                <h2 className={styles.heading}>Latest Articles</h2>
                <Link href="/articles" className={styles.moreLink}>
                    すべて見る →
                </Link>
            </header>
            <ul className={styles.list}>
                {posts.map((post) => (
                    <li key={post.slug} className={styles.item}>
                        <Link href={`/articles/${post.slug}`} className={styles.link}>
                            <time dateTime={post.date} className={styles.date}>
                                {post.date}
                            </time>
                            <h3 className={styles.title}>{post.title}</h3>
                            <p className={styles.excerpt}>{post.description}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}
