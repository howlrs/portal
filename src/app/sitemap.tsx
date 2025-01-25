import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

const blogDirectory = path.join(process.cwd(), 'articles');
// ブログ記事のURLを生成する関数
async function getBlogPostsUrls() {
    const fileNames = fs.readdirSync(blogDirectory);
    const urls: MetadataRoute.Sitemap = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        return {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/articles/${slug}`,
            lastModified: new Date().toISOString(),
            priority: 0.6,
            changeFrequency: 'monthly',
        };
    });
    return urls;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const blogPostsUrls = await getBlogPostsUrls();

    const sitemapItems: MetadataRoute.Sitemap = [
        {
            url: process.env.NEXT_PUBLIC_BASE_URL as string,
            changeFrequency: 'monthly',
            priority: 1.0,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/products`,
            changeFrequency: 'monthly',
            priority: 0.8,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/policy`,
            changeFrequency: 'monthly',
            priority: 0.2,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/contact`,
            changeFrequency: 'monthly',
            priority: 0.2,
            lastModified: new Date().toISOString(),
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/articles`,
            changeFrequency: 'monthly',
            priority: 0.8,
            lastModified: new Date().toISOString(),
        },
        ...blogPostsUrls
    ]

    return sitemapItems;
}