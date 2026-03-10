import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'howlrs.net Products';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
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
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '24px',
                    }}
                >
                    <div
                        style={{
                            fontSize: 72,
                            fontWeight: 700,
                            color: '#ffffff',
                            letterSpacing: '-2px',
                        }}
                    >
                        howlrs.net
                    </div>
                    <div
                        style={{
                            fontSize: 32,
                            color: '#a0a0c0',
                            letterSpacing: '4px',
                        }}
                    >
                        PRODUCTS
                    </div>
                    <div
                        style={{
                            width: 120,
                            height: 2,
                            background: 'linear-gradient(90deg, transparent, #6366f1, transparent)',
                            marginTop: 8,
                        }}
                    />
                    <div
                        style={{
                            fontSize: 20,
                            color: '#8080a0',
                            marginTop: 8,
                        }}
                    >
                        Web Apps・Desktop Apps・APIs
                    </div>
                </div>
            </div>
        ),
        { ...size }
    );
}
