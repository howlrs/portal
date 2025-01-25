import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { Flex, Space, Typography } from 'antd';

const blogDirectory = path.join(process.cwd(), 'articles');

// ブログ記事のメタデータ型を定義
type PostMeta = {
    title: string;
    date: string;
};

// ブログ記事のProps型を定義
type BlogPostProps = {
    slug: string;
    title: string;
    date: string;
    contentHtml: string;
};

// Next.js の getStaticPaths で利用する params の型を定義
type BlogParams = {
    slug: string;
}


export async function generateStaticParams() {
    console.log(blogDirectory);

    const fileNames = fs.readdirSync(blogDirectory);



    return fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        return { slug };
    });
};


const BlogPost = async ({ params }: { params: { slug: string } }) => {
    const { slug } = await params;
    const filePath = path.join(blogDirectory, `${slug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const matterResult = matter(fileContent);
    const postMeta = matterResult.data as PostMeta;


    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();



    return (
        <Flex justify='space-between' align='flex-start' vertical>
            <h1>{postMeta.title}</h1>
            <small>公開日: {postMeta.date}</small>
            <Typography style={{ padding: '2rem 0' }}>
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </Typography>
        </Flex>
    );
};

export default BlogPost;