import { ImageResponse } from 'next/og';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const runtime = 'nodejs';
export const alt = 'howlrs.net Article';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const blogDirectory = path.join(process.cwd(), 'articles');

type Props = {
    params: Promise<{ slug: string }>;
};

export default async function Image({ params }: Props) {
    const { slug } = await params;
    const filePath = path.join(blogDirectory, `${slug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const matterResult = matter(fileContent);
    const title = matterResult.data.title as string;
    const date = matterResult.data.date as string;

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f0f23 100%)',
                    fontFamily: 'sans-serif',
                    padding: '60px 80px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '24px',
                        maxWidth: '100%',
                    }}
                >
                    <div
                        style={{
                            fontSize: 28,
                            color: '#8080a0',
                            letterSpacing: '4px',
                        }}
                    >
                        ARTICLE
                    </div>
                    <div
                        style={{
                            width: 120,
                            height: 2,
                            background: 'linear-gradient(90deg, transparent, #6366f1, transparent)',
                        }}
                    />
                    <div
                        style={{
                            fontSize: title.length > 30 ? 40 : 52,
                            fontWeight: 700,
                            color: '#ffffff',
                            textAlign: 'center',
                            lineHeight: 1.4,
                            maxWidth: '100%',
                            overflow: 'hidden',
                        }}
                    >
                        {title}
                    </div>
                    <div
                        style={{
                            fontSize: 24,
                            color: '#a0a0c0',
                            marginTop: 8,
                        }}
                    >
                        {date}
                    </div>
                    <div
                        style={{
                            width: 120,
                            height: 2,
                            background: 'linear-gradient(90deg, transparent, #6366f1, transparent)',
                            marginTop: 16,
                        }}
                    />
                    <div
                        style={{
                            fontSize: 24,
                            fontWeight: 700,
                            color: '#8080a0',
                            marginTop: 8,
                        }}
                    >
                        howlrs.net
                    </div>
                </div>
            </div>
        ),
        { ...size }
    );
}
