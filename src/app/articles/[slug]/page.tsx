import type { Metadata } from "next";
import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkYoutube from 'remark-youtube';
import { Flex, Typography } from 'antd';
import { BreadcrumbJsonLd, JsonLd } from "@/components/json-ld";
import ArticleCta from "@/components/article-cta";
import { getPost } from "../../../../common/articles";
import { getProductByArticleSlug } from "../../../../common/product-article-map";
import styles from "./article.module.css";

const blogDirectory = path.join(process.cwd(), 'articles');

export async function generateStaticParams() {
    const fileNames = fs.readdirSync(blogDirectory);
    return fileNames.map((fileName) => ({
        slug: fileName.replace(/\.md$/, ''),
    }));
};

type Props = Promise<{ slug: string; }>

export async function generateMetadata({ params }: { params: Props }): Promise<Metadata> {
    const { slug } = await params;
    const { meta } = getPost(slug);
    return {
        title: meta.title,
        description: meta.description,
        alternates: { canonical: `/articles/${slug}` },
        openGraph: {
            type: "article",
            title: meta.title,
            description: meta.description,
            publishedTime: meta.date,
        },
    };
}

const BASE_URL =
    process.env.NEXT_PUBLIC_BASE_URL || "https://product.howlrs.net";

const BlogPost = async ({ params }: { params: Props }) => {
    const { slug } = await params;
    const { meta, content } = getPost(slug);

    const processedContent = await remark()
        .use(html)
        .use(remarkParse)
        .use(remarkYoutube)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(content);
    const contentHtml = processedContent.toString();

    const product = getProductByArticleSlug(slug);

    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: meta.title,
        description: meta.description,
        datePublished: meta.date,
        dateModified: meta.date,
        url: `${BASE_URL}/articles/${slug}`,
        inLanguage: "ja",
        author: {
            "@type": "Person",
            name: "寺島和宏",
            alternateName: ["terashima kazuhiro", "howlrs"],
            url: BASE_URL,
        },
        publisher: {
            "@type": "Person",
            name: "寺島和宏",
            alternateName: ["terashima kazuhiro", "howlrs"],
            url: BASE_URL,
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${BASE_URL}/articles/${slug}`,
        },
    };

    return (
        <Flex justify='space-between' align='flex-start' vertical>
            <BreadcrumbJsonLd
                items={[
                    { name: "ブログ記事一覧", href: "/articles" },
                    { name: meta.title, href: `/articles/${slug}` },
                ]}
            />
            <JsonLd data={articleJsonLd} />
            <article className={styles.article}>
                <h1>{meta.title}</h1>
                <time dateTime={meta.date}>公開日: {meta.date}</time>
                <Typography style={{ padding: '2rem 0' }}>
                    <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
                </Typography>
                {product && <ArticleCta product={product} />}
            </article>
        </Flex>
    );
};

export default BlogPost;
