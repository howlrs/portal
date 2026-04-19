'use client';

import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import { emailDisplay } from '../../common/strconv';

export default function FooterUserInfo() {
    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Name',
            children: process.env.NEXT_PUBLIC_USERNAME,
        },
        {
            key: '2',
            label: 'Email',
            children: emailDisplay(process.env.NEXT_PUBLIC_EMAIL ? process.env.NEXT_PUBLIC_EMAIL : ''),
        },
    ];

    return <Descriptions title="User Info" layout="vertical" items={items} />;
}
