import type { Metadata } from "next";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkYoutube from 'remark-youtube';
import { Flex, Typography } from 'antd';
import { BreadcrumbJsonLd, JsonLd } from "@/components/json-ld";

const blogDirectory = path.join(process.cwd(), 'articles');

// ブログ記事のメタデータ型を定義
type PostMeta = {
    title: string;
    date: string;
};

export async function generateStaticParams() {
    console.log(blogDirectory);

    const fileNames = fs.readdirSync(blogDirectory);

    return fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        return {
            params: {
                slug: slug,
            }
        };
    });
};

type Props = Promise<{ slug: string; }>

export async function generateMetadata({ params }: { params: Props }): Promise<Metadata> {
    const { slug } = await params;
    const filePath = path.join(blogDirectory, `${slug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const matterResult = matter(fileContent);
    const postMeta = matterResult.data as PostMeta;
    return {
        title: postMeta.title,
        description: `${postMeta.title} - ${postMeta.date}公開の記事`,
        alternates: { canonical: `/articles/${slug}` },
    };
}

const BASE_URL =
    process.env.NEXT_PUBLIC_BASE_URL || "https://product.howlrs.net";

const BlogPost = async ({ params }: { params: Props }) => {
    const { slug } = await params;
    const filePath = path.join(blogDirectory, `${slug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const matterResult = matter(fileContent);
    const postMeta = matterResult.data as PostMeta;


    const processedContent = await remark()
        .use(html)
        .use(remarkParse)
        .use(remarkYoutube)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: postMeta.title,
        datePublished: postMeta.date,
        dateModified: postMeta.date,
        url: `${BASE_URL}/articles/${slug}`,
        inLanguage: "ja",
        author: {
            "@type": "Organization",
            name: "howlrs.net",
            url: "https://howlrs.net",
        },
        publisher: {
            "@type": "Organization",
            name: "howlrs.net",
            url: "https://howlrs.net",
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
                    { name: postMeta.title, href: `/articles/${slug}` },
                ]}
            />
            <JsonLd data={articleJsonLd} />
            <h1>{postMeta.title}</h1>
            <small>公開日: {postMeta.date}</small>
            <Typography style={{ padding: '2rem 0' }}>
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </Typography>
        </Flex>
    );
};

export default BlogPost;