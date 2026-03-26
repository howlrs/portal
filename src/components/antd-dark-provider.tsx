'use client';

import { ConfigProvider, theme } from 'antd';
import { useEffect, useState } from 'react';

export default function AntdDarkProvider({ children }: { children: React.ReactNode }) {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDark(mq.matches);
        const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    return (
        <ConfigProvider
            theme={{
                algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
                cssVar: {},
                token: {
                    ...(isDark ? {
                        colorTextSecondary: 'rgba(255, 255, 255, 0.75)',
                        colorTextTertiary: 'rgba(255, 255, 255, 0.55)',
                        colorTextQuaternary: 'rgba(255, 255, 255, 0.45)',
                    } : {}),
                },
            }}
            wave={{ disabled: true }}
        >
            {children}
        </ConfigProvider>
    );
}
