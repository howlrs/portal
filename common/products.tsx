'use client';

import { Avatar, Button, Card, Col, Flex, Row } from 'antd';
import { HomeTwoTone, RightOutlined } from '@ant-design/icons';
import Link from 'next/link';
const { Meta } = Card;

export interface Item {
    name: string;
    url: string;
    image_url: string;
    icon_url: string;
    description: string;
};

export const Products = ({ items }: { items: Item[] }) => {
    return (
        <Row gutter={[16, 16]} wrap>
            {items.map((item: Item, i: number) => (
                <Col span={8} xs={24} sm={12} md={12} lg={8}>
                    <Card
                        key={i}
                        style={{ width: '20wv' }}
                        cover={
                            <img
                                alt={item.name}
                                src={item.image_url}
                            />
                        }
                        actions={[
                            <Link href={item.url} key={i} style={{ textAlign: 'right' }}>
                                <Button type="link">
                                    Go to App <RightOutlined />
                                </Button>
                            </Link>
                        ]}
                    >
                        <Meta
                            avatar={<Avatar src={item.icon_url} />}
                            title={item.name}
                            description={item.description}
                        />
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

{/* <Flex justify='space-between' align='center' wrap></Flex> */ }