import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogDirectory = path.join(process.cwd(), 'articles');

export type PostMeta = {
    slug: string;
    title: string;
    date: string;
    description: string;
};

function extractExcerpt(content: string, maxLength = 150): string {
    const plain = content
        .replace(/^---[\s\S]*?---/m, '')
        .replace(/```[\s\S]*?```/g, '')
        .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .replace(/[#>*`_~]/g, '')
        .replace(/\s+/g, ' ')
        .trim();

    if (plain.length <= maxLength) return plain;
    return plain.slice(0, maxLength) + '…';
}

export function getAllPosts(): PostMeta[] {
    const fileNames = fs.readdirSync(blogDirectory);
    const posts = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const filePath = path.join(blogDirectory, fileName);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const matterResult = matter(fileContent);
        const data = matterResult.data as { title: string; date: string; description?: string };
        const description = data.description?.trim() || extractExcerpt(matterResult.content);
        return {
            slug,
            title: data.title,
            date: data.date,
            description,
        };
    });

    posts.sort((a, b) => (a.date < b.date ? 1 : -1));
    return posts;
}

export function getPost(slug: string): { meta: PostMeta; content: string } {
    const filePath = path.join(blogDirectory, `${slug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const matterResult = matter(fileContent);
    const data = matterResult.data as { title: string; date: string; description?: string };
    const description = data.description?.trim() || extractExcerpt(matterResult.content);
    return {
        meta: {
            slug,
            title: data.title,
            date: data.date,
            description,
        },
        content: matterResult.content,
    };
}
