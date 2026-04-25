'use client';

import { Avatar, Button, Card, Col, Row } from 'antd';
import { AppstoreOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Image, { type StaticImageData } from 'next/image';
const { Meta } = Card;

export interface Item {
    name: string;
    url: string;
    image: StaticImageData;
    icon_url: string;
    description: string;
    featureList?: string[];
    /**
     * 提供終了したプロダクト。true の場合カードを半透明で表示し、
     * "Go to App" CTA を「紹介記事を読む」内部リンクに置き換える。
     */
    archived?: boolean;
};

export const Products = ({ items }: { items: Item[] }) => {
    return (
        <Row gutter={[16, 16]} wrap>
            {items.map((item: Item, i: number) => (
                <Col key={i} span={8} xs={24} sm={12} md={12} lg={8}>
                    <Card
                        style={item.archived ? { opacity: 0.7 } : undefined}
                        cover={
                            <Image
                                src={item.image}
                                alt={item.name}
                                sizes="(max-width: 576px) 100vw, (max-width: 768px) 50vw, 33vw"
                                placeholder="blur"
                                priority={i < 3}
                                style={{ width: '100%', height: 'auto', filter: item.archived ? 'grayscale(0.6)' : undefined }}
                            />
                        }
                        actions={[
                            <Link
                                href={item.url}
                                key={i}
                                style={{ textAlign: 'right' }}
                                aria-label={item.archived ? `${item.name} の紹介記事を読む` : `${item.name} を開く`}
                            >
                                <Button
                                    type="link"
                                    aria-label={item.archived ? `${item.name} の紹介記事を読む` : `${item.name} を開く`}
                                >
                                    {item.archived ? '紹介記事を読む (提供終了)' : 'Go to App'} <RightOutlined />
                                </Button>
                            </Link>
                        ]}
                    >
                        <Meta
                            avatar={<Avatar src={item.icon_url} alt={`${item.name} アイコン`} icon={<AppstoreOutlined />} />}
                            title={item.name}
                            description={item.description}
                        />
                    </Card>
                </Col>
            ))}
        </Row>
    );
};
