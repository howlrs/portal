'use client';

import type { MenuProps } from 'antd';
import { Menu } from 'antd';

import { HomeOutlined, AppstoreOutlined, MailOutlined, SolutionOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function HeaderNav() {
    const pathname = usePathname();
    const router = useRouter();

    type MenuItem = Required<MenuProps>['items'][number];
    const items: MenuItem[] = [
        {
            label: 'Home',
            key: '',
            icon: <HomeOutlined />,
        },
        {
            label: 'Products',
            key: 'products',
            icon: <AppstoreOutlined />,
        },
        {
            label: 'Privacy&Policy',
            key: 'policy',
            icon: <SolutionOutlined />,
        },
        {
            label: 'Contact',
            key: 'contact',
            icon: <MailOutlined />,
        },
    ];

    const [current, setCurrent] = useState('home');
    const handle: MenuProps['onClick'] = (e) => {
        const path = e.key ? e.key.toString() : '';
        setCurrent(path);
        // nextjs の Link でページ遷移
        router.push(`/${path}`);
    };

    // パスが変更されたときに現在のキーを更新
    useEffect(() => {
        const path = pathname?.split('/')[1] || '';
        setCurrent(path);
    }, [pathname]);


    return (
        <>
            <Menu onClick={handle} selectedKeys={[current]} mode="horizontal" items={items} />
        </>
    );
}