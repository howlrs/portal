import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { Flex, Typography } from 'antd';

// ブログ記事のメタデータ型を定義
type PostMeta = {
    title: string;
    date: string;
};

const blogDirectory = path.join(process.cwd(), 'articles');

async function getPosts() {
    const fileNames = fs.readdirSync(blogDirectory);
    const posts = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const filePath = path.join(blogDirectory, fileName);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const matterResult = matter(fileContent);
        const postMeta = matterResult.data as PostMeta;
        return {
            slug,
            title: postMeta.title,
            date: postMeta.date
        };
    });
    return posts;
}


export default async function BlogIndexPage() {
    const posts = await getPosts()
    return (
        <Flex justify='space-between' align='flex-start' vertical>

            <Typography style={{ padding: '2rem 0' }}>
                <h1>ブログ記事一覧</h1>
                <ul>
                    {posts.map((post) => (
                        <li key={post.slug}>
                            <Link href={`/articles/${post.slug}`}>
                                {post.title.substring(0, 30) + '...'}
                            </Link>
                            <p>{post.date}</p>
                        </li>
                    ))}
                </ul>
            </Typography>
        </Flex>
    );
}