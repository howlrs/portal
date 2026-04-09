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
};

export const Products = ({ items }: { items: Item[] }) => {
    return (
        <Row gutter={[16, 16]} wrap>
            {items.map((item: Item, i: number) => (
                <Col key={i} span={8} xs={24} sm={12} md={12} lg={8}>
                    <Card
                        cover={
                            <Image
                                src={item.image}
                                alt={item.name}
                                sizes="(max-width: 576px) 100vw, (max-width: 768px) 50vw, 33vw"
                                placeholder="blur"
                                priority={i < 3}
                                style={{ width: '100%', height: 'auto' }}
                            />
                        }
                        actions={[
                            <Link href={item.url} key={i} style={{ textAlign: 'right' }} aria-label={`${item.name} を開く`}>
                                <Button type="link" aria-label={`${item.name} を開く`}>
                                    Go to App <RightOutlined />
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