import type { Metadata } from "next";
import Link from 'next/link';
import { Flex } from 'antd';
import { getAllPosts } from '../../../common/articles';
import { BreadcrumbJsonLd } from "@/components/json-ld";
import styles from './page.module.css';

export const metadata: Metadata = {
    title: "ブログ記事一覧",
    description:
        "ソフトウェアエンジニア 寺島和宏 (howlrs) の開発ブログ記事一覧。ANTOKI、Orbit Bola!!、QRで管理、JLPT学習アプリなどのプロダクト紹介、技術解説、開発背景を掲載しています。",
    alternates: { canonical: "/articles" },
};

export default async function BlogIndexPage() {
    const posts = getAllPosts();

    return (
        <Flex justify='space-between' align='flex-start' vertical>
            <BreadcrumbJsonLd items={[{ name: "ブログ記事一覧", href: "/articles" }]} />

            <header className={styles.header}>
                <h1 className={styles.heading}>ブログ記事一覧</h1>
                <p className={styles.subtitle}>
                    ソフトウェアエンジニア 寺島和宏 (howlrs) が開発したプロダクトの紹介と、開発の背景・技術解説を掲載しています。
                </p>
            </header>

            <ul className={styles.list}>
                {posts.map((post) => (
                    <li key={post.slug} className={styles.item}>
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
                ))}
            </ul>
        </Flex>
    );
}
