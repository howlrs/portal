import type { Metadata } from "next";
import Link from 'next/link';
import { Flex } from 'antd';
import { getAllPosts, type PostMeta } from '../../../common/articles';
import { FEATURED_SLUGS_ORDERED } from '../../../common/featured-order';
import { BreadcrumbJsonLd } from "@/components/json-ld";
import styles from './page.module.css';

export const metadata: Metadata = {
    title: "ブログ記事一覧",
    description:
        "ソフトウェアエンジニア 寺島和宏 (howlrs) の開発ブログ記事一覧。ピクセルズ、百人一首暗記、Orbit Bola!!、ANTOKI、Generic Camera を始めとするプロダクト紹介、技術解説、開発背景を掲載しています。",
    alternates: { canonical: "/articles" },
};

function PostListItem({ post, featured = false }: { post: PostMeta; featured?: boolean }) {
    const className = featured ? `${styles.item} ${styles.featuredItem}` : styles.item;
    return (
        <li className={className}>
            <article>
                <Link href={`/articles/${post.slug}`} className={styles.link}>
                    <time dateTime={post.date} className={styles.date}>
                        {post.date}
                    </time>
                    <h2 className={styles.title}>{post.title}</h2>
                    <p className={styles.excerpt}>{post.description}</p>
                </Link>
            </article>
        </li>
    );
}

export default async function BlogIndexPage() {
    const posts = getAllPosts();

    // 5 プロダクト関連記事を Featured 固定順で抽出 (該当記事が無ければ skip)
    const postBySlug = new Map(posts.map((p) => [p.slug, p]));
    const featuredPosts: PostMeta[] = [];
    for (const slug of FEATURED_SLUGS_ORDERED) {
        const p = postBySlug.get(slug);
        if (p) featuredPosts.push(p);
    }
    // 通常一覧 (Featured 含む全件、日付降順) — 重複表示で OK (ユーザーが「最新」「Featured」両方の文脈で発見できるよう)
    // 重複を嫌うなら featured を除外する版も検討可能だが、今回は回遊強化を優先
    return (
        <Flex justify='space-between' align='flex-start' vertical>
            <BreadcrumbJsonLd items={[{ name: "ブログ記事一覧", href: "/articles" }]} />

            <header className={styles.header}>
                <h1 className={styles.heading}>ブログ記事一覧</h1>
                <p className={styles.subtitle}>
                    ソフトウェアエンジニア 寺島和宏 (howlrs) が開発したプロダクトの紹介と、開発の背景・技術解説を掲載しています。
                </p>
            </header>

            {featuredPosts.length > 0 && (
                <section className={styles.featuredSection}>
                    <h2 className={styles.featuredHeading}>Featured Articles</h2>
                    <ul className={styles.list}>
                        {featuredPosts.map((post) => (
                            <PostListItem key={`featured-${post.slug}`} post={post} featured />
                        ))}
                    </ul>
                </section>
            )}

            <hr className={styles.divider} aria-hidden="true" />

            <h2 className={styles.allHeading}>All Articles</h2>
            <ul className={styles.list}>
                {posts.map((post) => (
                    <PostListItem key={post.slug} post={post} />
                ))}
            </ul>
        </Flex>
    );
}
