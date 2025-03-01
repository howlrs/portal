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